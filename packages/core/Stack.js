export default class Stack {
  constructor(options) {
    // TODO: label for close all button
    Object.assign(
      this,
      {
        dir1: null,
        dir2: null,
        firstpos1: null,
        firstpos2: null,
        spacing1: 25,
        spacing2: 25,
        push: 'bottom',
        maxOpen: 1,
        maxStrategy: 'wait',
        maxClosureCausesWait: true,
        modal: 'ish',
        modalishFlash: true,
        overlayClose: true,
        overlayClosesPinned: false,
        positioned: true,
        context: (window && document.body) || null
      },
      options
    );

    // Validate the options.
    if (this.modal === 'ish' && this.maxOpen !== 1) {
      throw new Error('A modalish stack must have a maxOpen value of 1.');
    }
    if (this.modal === 'ish' && !this.dir1) {
      throw new Error('A modalish stack must have a direction.');
    }
    if (
      this.push === 'top' &&
      this.modal === 'ish' &&
      this.maxStrategy !== 'close'
    ) {
      throw new Error(
        'A modalish stack that pushes to the top must use the close maxStrategy.'
      );
    }

    // -- Private properties.

    // The head of the notice double linked list.
    this._noticeHead = {
      notice: null,
      prev: null,
      next: null
    };
    // The tail of the notice double linked list.
    this._noticeTail = {
      notice: null,
      prev: this._noticeHead,
      next: null
    };
    this._noticeHead.next = this._noticeTail;
    // The map of notices to nodes.
    this._noticeMap = new WeakMap();
    // The number of notices in the stack.
    this._length = 0;

    // How much space to add along the secondary axis when moving notices to the
    // next column/row.
    this._addpos2 = 0;
    // Whether the stack's notices should animate while moving.
    this._animation = true;
    // A timer to debounce positioning.
    this._posTimer = null;
    // The number of open notices.
    this._openNotices = 0;
    // A listener for positioning events.
    this._listener = null;
    // Whether the overlay is currently open.
    this._overlayOpen = false;
    // Whether the overlay is currently inserted into the DOM.
    this._overlayInserted = false;
    // Whether the modal state is collapsing. (Notices go back to waiting and
    // shouldn't resposition.)
    this._collapsingModalState = false;
    // The leader is the first open notice in a modalish stack.
    this._leader = null;
    this._leaderOff = null;
    // The next waiting notice that is masking.
    this._masking = null;
    this._maskingOff = null;
    // Swapping notices, so don't open a new one. Set to the opening notice on
    // swap.
    this._swapping = false;
    // Event listener callbacks.
    this._callbacks = {};
  }

  get notices() {
    const notices = [];
    this.forEach(notice => notices.push(notice));
    return notices;
  }

  get length() {
    return this._length;
  }

  get leader() {
    return this._leader;
  }

  forEach(
    callback,
    { start = 'oldest', dir = 'newer', skipModuleHandled = false } = {}
  ) {
    let node;
    if (
      start === 'head' ||
      (start === 'newest' && this.push === 'top') ||
      (start === 'oldest' && this.push === 'bottom')
    ) {
      node = this._noticeHead.next;
    } else if (
      start === 'tail' ||
      (start === 'newest' && this.push === 'bottom') ||
      (start === 'oldest' && this.push === 'top')
    ) {
      node = this._noticeTail.prev;
    } else if (this._noticeMap.has(start)) {
      node = this._noticeMap.get(start);
    } else {
      throw new Error('Invalid start param.');
    }
    while (node.notice) {
      const notice = node.notice;
      // Get the next node first.
      if (
        dir === 'prev' ||
        (this.push === 'top' && dir === 'newer') ||
        (this.push === 'bottom' && dir === 'older')
      ) {
        node = node.prev;
      } else if (
        dir === 'next' ||
        (this.push === 'top' && dir === 'older') ||
        (this.push === 'bottom' && dir === 'newer')
      ) {
        node = node.next;
      } else {
        throw new Error('Invalid dir param.');
      }
      // Call the callback last, just in case the callback removes the notice.
      if (
        (!skipModuleHandled || !notice.getModuleHandled()) &&
        callback(notice) === false
      ) {
        break;
      }
    }
  }

  close(immediate) {
    this.forEach(notice => notice.close(immediate, false, false));
  }

  open(immediate) {
    this.forEach(notice => notice.open(immediate));
  }

  openLast() {
    // Look up the last notice, and display it.
    this.forEach(
      notice => {
        if (['opening', 'open', 'waiting'].indexOf(notice.getState()) === -1) {
          notice.open();
          return false;
        }
      },
      { start: 'newest', dir: 'older' }
    );
  }

  swap(one, theOther, immediate = false, waitAfter = false) {
    if (['open', 'opening', 'closing'].indexOf(one.getState()) === -1) {
      // One is closed. Return rejected promise.
      return Promise.reject();
    }
    this._swapping = theOther;
    return one
      .close(immediate, false, waitAfter)
      .then(() => theOther.open(immediate))
      .finally(() => {
        this._swapping = false;
      });
  }

  on(event, callback) {
    if (!(event in this._callbacks)) {
      this._callbacks[event] = [];
    }
    this._callbacks[event].push(callback);
    return () => {
      this._callbacks[event].splice(
        this._callbacks[event].indexOf(callback),
        1
      );
    };
  }

  fire(event, detail = {}) {
    detail.stack = this;
    if (event in this._callbacks) {
      this._callbacks[event].forEach(cb => cb(detail));
    }
  }

  position() {
    // Reset the next position data.
    if (this.positioned && this._length > 0) {
      this.fire('beforePosition');
      this._resetPositionData();
      this.forEach(
        notice => {
          this._positionNotice(notice);
        },
        { start: 'head', dir: 'next', skipModuleHandled: true }
      );
      this.fire('afterPosition');
    } else {
      delete this._nextpos1;
      delete this._nextpos2;
    }
  }

  // Queue the position so it doesn't run repeatedly and use up resources.
  queuePosition(milliseconds = 10) {
    if (this._posTimer) {
      clearTimeout(this._posTimer);
    }
    this._posTimer = setTimeout(() => this.position(), milliseconds);
  }

  _resetPositionData() {
    this._nextpos1 = this.firstpos1;
    this._nextpos2 = this.firstpos2;
    this._addpos2 = 0;
  }

  // Position the notice.
  _positionNotice(notice, masking = notice === this._masking) {
    if (!this.positioned) {
      return;
    }

    // Get the notice's element.
    const elem = notice.refs.elem;
    if (!elem) {
      return;
    }

    // Skip this notice if it's not shown.
    if (
      !elem.classList.contains('pnotify-in') &&
      !elem.classList.contains('pnotify-initial') &&
      !masking
    ) {
      return;
    }

    // Use local variables, since a masking notice position shouldn't update the
    // stack.
    let [firstpos1, firstpos2, _nextpos1, _nextpos2, _addpos2] = [
      this.firstpos1,
      this.firstpos2,
      this._nextpos1,
      this._nextpos2,
      this._addpos2
    ];

    // Read from the DOM to cause refresh.
    elem.getBoundingClientRect();

    if (this._animation && !masking && !this._collapsingModalState) {
      // Add animate class.
      notice._setMoveClass('pnotify-move');
    } else {
      notice._setMoveClass('');
    }

    const spaceY =
      this.context === document.body
        ? window.innerHeight
        : this.context.scrollHeight;
    const spaceX =
      this.context === document.body
        ? window.innerWidth
        : this.context.scrollWidth;

    let csspos1;

    if (this.dir1) {
      csspos1 = {
        down: 'top',
        up: 'bottom',
        left: 'right',
        right: 'left'
      }[this.dir1];

      // Calculate the current pos1 value.
      let curpos1;
      switch (this.dir1) {
        case 'down':
          curpos1 = elem.offsetTop;
          break;
        case 'up':
          curpos1 = spaceY - elem.scrollHeight - elem.offsetTop;
          break;
        case 'left':
          curpos1 = spaceX - elem.scrollWidth - elem.offsetLeft;
          break;
        case 'right':
          curpos1 = elem.offsetLeft;
          break;
      }
      // Remember the first pos1, so the first notice goes there.
      if (firstpos1 == null) {
        firstpos1 = curpos1;
        _nextpos1 = firstpos1;
      }
    }

    if (this.dir1 && this.dir2) {
      const csspos2 = {
        down: 'top',
        up: 'bottom',
        left: 'right',
        right: 'left'
      }[this.dir2];

      // Calculate the current pos2 value.
      let curpos2;
      switch (this.dir2) {
        case 'down':
          curpos2 = elem.offsetTop;
          break;
        case 'up':
          curpos2 = spaceY - elem.scrollHeight - elem.offsetTop;
          break;
        case 'left':
          curpos2 = spaceX - elem.scrollWidth - elem.offsetLeft;
          break;
        case 'right':
          curpos2 = elem.offsetLeft;
          break;
      }
      // Remember the first pos2, so the first notice goes there.
      if (firstpos2 == null) {
        firstpos2 = curpos2;
        _nextpos2 = firstpos2;
      }

      // Don't move masking notices along dir2. They should always be beside the
      // leader along dir1.
      if (!masking) {
        // Check that it's not beyond the viewport edge.
        const endY = _nextpos1 + elem.offsetHeight + this.spacing1;
        const endX = _nextpos1 + elem.offsetWidth + this.spacing1;
        if (
          ((this.dir1 === 'down' || this.dir1 === 'up') && endY > spaceY) ||
          ((this.dir1 === 'left' || this.dir1 === 'right') && endX > spaceX)
        ) {
          // If it is, it needs to go back to the first pos1, and over on pos2.
          _nextpos1 = firstpos1;
          _nextpos2 += _addpos2 + this.spacing2;
          _addpos2 = 0;
        }
      }

      // Move the notice on dir2.
      if (_nextpos2 != null) {
        elem.style[csspos2] = `${_nextpos2}px`;
        if (!this._animation) {
          elem.style[csspos2]; // Read from the DOM for update.
        }
      }

      // Keep track of the widest/tallest notice in the column/row, so we can push the next column/row.
      switch (this.dir2) {
        case 'down':
        case 'up':
          if (
            elem.offsetHeight +
              (parseFloat(elem.style.marginTop, 10) || 0) +
              (parseFloat(elem.style.marginBottom, 10) || 0) >
            _addpos2
          ) {
            _addpos2 = elem.offsetHeight;
          }
          break;
        case 'left':
        case 'right':
          if (
            elem.offsetWidth +
              (parseFloat(elem.style.marginLeft, 10) || 0) +
              (parseFloat(elem.style.marginRight, 10) || 0) >
            _addpos2
          ) {
            _addpos2 = elem.offsetWidth;
          }
          break;
      }
    } else if (this.dir1) {
      // Center the notice along dir1 axis, because the stack has no dir2.
      let cssMiddle, cssposCross;
      switch (this.dir1) {
        case 'down':
        case 'up':
          cssposCross = ['left', 'right'];
          cssMiddle = this.context.scrollWidth / 2 - elem.offsetWidth / 2;
          break;
        case 'left':
        case 'right':
          cssposCross = ['top', 'bottom'];
          cssMiddle = spaceY / 2 - elem.offsetHeight / 2;
          break;
      }
      elem.style[cssposCross[0]] = `${cssMiddle}px`;
      elem.style[cssposCross[1]] = 'auto';
      if (!this._animation) {
        elem.style[cssposCross[0]]; // Read from the DOM for update.
      }
    }

    if (this.dir1) {
      // Move the notice on dir1.
      if (_nextpos1 != null) {
        elem.style[csspos1] = `${_nextpos1}px`;
        if (!this._animation) {
          elem.style[csspos1]; // Read from the DOM for update.
        }
      }

      // Calculate the next dir1 position.
      switch (this.dir1) {
        case 'down':
        case 'up':
          _nextpos1 += elem.offsetHeight + this.spacing1;
          break;
        case 'left':
        case 'right':
          _nextpos1 += elem.offsetWidth + this.spacing1;
          break;
      }
    } else {
      // Center the notice on the screen, because the stack has no dir1.
      const cssMiddleLeft = spaceX / 2 - elem.offsetWidth / 2;
      const cssMiddleTop = spaceY / 2 - elem.offsetHeight / 2;
      elem.style.left = `${cssMiddleLeft}px`;
      elem.style.top = `${cssMiddleTop}px`;
      if (!this._animation) {
        elem.style.left; // Read from the DOM for update.
      }
    }

    // If we're not positioning the masking notice, update the stack properties.
    if (!masking) {
      this.firstpos1 = firstpos1;
      this.firstpos2 = firstpos2;
      this._nextpos1 = _nextpos1;
      this._nextpos2 = _nextpos2;
      this._addpos2 = _addpos2;
    }
  }

  _addNotice(notice) {
    this.fire('beforeAddNotice', { notice });

    const handleNoticeOpen = () => {
      this.fire('beforeOpenNotice', { notice });

      if (notice.getModuleHandled()) {
        // We don't deal with notices that are handled by a module.
        this.fire('afterOpenNotice', { notice });
        return;
      }

      this._openNotices++;

      // Check the max in stack.
      if (
        !(this.modal === 'ish' && this._overlayOpen) &&
        this.maxOpen !== Infinity &&
        this._openNotices > this.maxOpen &&
        this.maxStrategy === 'close'
      ) {
        let toClose = this._openNotices - this.maxOpen;
        this.forEach(notice => {
          if (['opening', 'open'].indexOf(notice.getState()) !== -1) {
            // Close oldest notices, leaving only stack.maxOpen from the stack.
            notice.close(false, false, this.maxClosureCausesWait);
            if (notice === this._leader) {
              this._setLeader(null);
            }
            toClose--;
            return !!toClose;
          }
        });
      }

      if (this.modal === true) {
        this._insertOverlay();
      }

      if (
        this.modal === 'ish' &&
        (!this._leader ||
          ['opening', 'open', 'closing'].indexOf(this._leader.getState()) ===
            -1)
      ) {
        this._setLeader(notice);
      }

      if (this.modal === 'ish' && this._overlayOpen) {
        notice._preventTimerClose(true);
      }

      // this.queuePosition(0);

      this.fire('afterOpenNotice', { notice });
    };

    const handleNoticeClosed = () => {
      this.fire('beforeCloseNotice', { notice });

      if (notice.getModuleHandled()) {
        // We don't deal with notices that are handled by a module.
        this.fire('afterCloseNotice', { notice });
        return;
      }

      this._openNotices--;

      if (this.modal === 'ish' && notice === this._leader) {
        this._setLeader(null);
        if (this._masking) {
          this._setMasking(null);
        }
      }

      if (
        !this._swapping &&
        this.maxOpen !== Infinity &&
        this._openNotices < this.maxOpen
      ) {
        let done = false;
        const open = contender => {
          if (contender !== notice && contender.getState() === 'waiting') {
            contender.open().catch(() => {});
            if (this._openNotices >= this.maxOpen) {
              done = true;
              return false;
            }
          }
        };
        if (this.maxStrategy === 'wait') {
          // Check for the next waiting notice and open it.
          this.forEach(open, {
            start: notice,
            dir: 'next'
          });
          if (!done) {
            this.forEach(open, {
              start: notice,
              dir: 'prev'
            });
          }
        } else if (this.maxStrategy === 'close' && this.maxClosureCausesWait) {
          // Check for the last closed notice and re-open it.
          this.forEach(open, {
            start: notice,
            dir: 'older'
          });
          if (!done) {
            this.forEach(open, {
              start: notice,
              dir: 'newer'
            });
          }
        }
      }

      if (this._openNotices <= 0) {
        this._openNotices = 0;
        this._resetPositionData();

        if (this._overlayOpen && !this._swapping) {
          this._removeOverlay();
        }
      } else if (!this._collapsingModalState) {
        this.queuePosition(0);
      }

      this.fire('afterCloseNotice', { notice });
    };

    // This is the linked list node.
    const node = {
      notice,
      prev: null,
      next: null,
      beforeOpenOff: notice.on('pnotify:beforeOpen', handleNoticeOpen),
      afterCloseOff: notice.on('pnotify:afterClose', handleNoticeClosed)
    };

    // Push to the correct side of the linked list.
    if (this.push === 'top') {
      node.next = this._noticeHead.next;
      node.prev = this._noticeHead;
      node.next.prev = node;
      node.prev.next = node;
    } else {
      node.prev = this._noticeTail.prev;
      node.next = this._noticeTail;
      node.prev.next = node;
      node.next.prev = node;
    }

    // Add to the map.
    this._noticeMap.set(notice, node);

    // Increment the length to match.
    this._length++;

    if (!this._listener) {
      this._listener = () => this.position();
      this.context.addEventListener('pnotify:position', this._listener);
    }

    if (['open', 'opening', 'closing'].indexOf(notice.getState()) !== -1) {
      // If the notice is already open, handle it immediately.
      handleNoticeOpen();
    } else if (
      this.modal === 'ish' &&
      this.modalishFlash &&
      this._shouldNoticeWait(notice)
    ) {
      // If it's not open, and it's going to be a waiting notice, flash it.
      const off = notice.on('pnotify:mount', () => {
        off();
        notice._setMasking(true, false, () => {
          notice._setMasking(false);
        });
        this._resetPositionData();
        this._positionNotice(this._leader);
        window.requestAnimationFrame(() => {
          this._positionNotice(notice, true);
        });
      });
    }

    this.fire('afterAddNotice', { notice });
  }

  _removeNotice(notice) {
    if (!this._noticeMap.has(notice)) {
      return;
    }

    this.fire('beforeRemoveNotice', { notice });

    const node = this._noticeMap.get(notice);

    if (this._leader === notice) {
      // Clear the leader.
      this._setLeader(null);
    }

    if (this._masking === notice) {
      // Clear masking.
      this._setMasking(null);
    }

    // Remove the notice from the linked list.
    node.prev.next = node.next;
    node.next.prev = node.prev;
    node.prev = null;
    node.next = null;
    node.beforeOpenOff();
    node.beforeOpenOff = null;
    node.afterCloseOff();
    node.afterCloseOff = null;

    // Remove the notice from the map.
    this._noticeMap.delete(notice);

    // Reduce the length to match.
    this._length--;

    if (!this._length && this._listener) {
      // Remove the listener.
      this.context.removeEventListener('pnotify:position', this._listener);
      this._listener = null;
    }

    if (!this._length && this._overlayOpen) {
      this._removeOverlay();
    }

    // If the notice is open, handle it as if it had closed.
    if (['open', 'opening', 'closing'].indexOf(notice.getState()) !== -1) {
      this._handleNoticeClosed(notice);
    }

    this.fire('afterRemoveNotice', { notice });
  }

  _setLeader(leader) {
    this.fire('beforeSetLeader', { leader });

    if (this._leaderOff) {
      this._leaderOff();
      this._leaderOff = null;
    }

    this._leader = leader;

    if (!this._leader) {
      this.fire('afterSetLeader', { leader });
      return;
    }

    // If the mouse enters this notice while it's the leader, then the next
    // waiting notice should start masking.
    const leaderInteraction = () => {
      // This is a workaround for leaving the modal state.
      let nextNoticeFromModalState = null;

      // If the leader is moused over:
      if (this._overlayOpen) {
        this._collapsingModalState = true;

        this.forEach(
          notice => {
            // Allow the notices to timed close.
            notice._preventTimerClose(false);

            // Close and set to wait any open notices other than the leader.
            if (
              notice !== this._leader &&
              ['opening', 'open'].indexOf(notice.getState()) !== -1
            ) {
              if (!nextNoticeFromModalState) {
                nextNoticeFromModalState = notice;
              }
              notice.close(notice === nextNoticeFromModalState, false, true);
            }
          },
          {
            start: this._leader,
            dir: 'next',
            skipModuleHandled: true
          }
        );

        // Remove the modal state overlay.
        this._removeOverlay();
      }

      // Turn off any masking off timer that may still be running.
      if (maskingOffTimer) {
        clearTimeout(maskingOffTimer);
        maskingOffTimer = null;
      }

      // Set the next waiting notice to be masking.
      this.forEach(
        notice => {
          if (notice === this._leader) {
            // Skip the leader, and start with the next one.
            return;
          }
          // The next notice that is "waiting" is usually fine, but if we're
          // leaving the modal state, it will still be "closing" here, so we have
          // to work around that. :P
          // Also, when coming back from modal state, the notice should
          // immediately be masking instead of fading in.
          if (
            notice.getState() === 'waiting' ||
            notice === nextNoticeFromModalState
          ) {
            this._setMasking(notice, !!nextNoticeFromModalState);
            return false;
          }
        },
        {
          start: this._leader,
          dir: 'next',
          skipModuleHandled: true
        }
      );
    };

    // If the mouse leaves this notice while it's the leader, then the next
    // waiting notice should stop masking.
    let maskingOffTimer = null;
    const leaderLeaveInteraction = () => {
      if (maskingOffTimer) {
        clearTimeout(maskingOffTimer);
        maskingOffTimer = null;
      }
      // TODO: Something wrong here when you come right back from the modal state.
      maskingOffTimer = setTimeout(() => {
        maskingOffTimer = null;
        this._setMasking(null);
      }, 750);
    };

    this._leaderOff = (offs => () => offs.map(off => off()))([
      this._leader.on('mouseenter', leaderInteraction),
      this._leader.on('focusin', leaderInteraction),
      this._leader.on('mouseleave', leaderLeaveInteraction),
      this._leader.on('focusout', leaderLeaveInteraction)
    ]);

    this.fire('afterSetLeader', { leader });
  }

  _setMasking(masking, immediate) {
    if (this._masking) {
      if (this._masking === masking) {
        // Nothing to do.
        return;
      }
      this._masking._setMasking(false, immediate);
    }

    if (this._maskingOff) {
      this._maskingOff();
      this._maskingOff = null;
    }

    this._masking = masking;

    if (!this._masking) {
      return;
    }

    // Reset the position data and position the leader.
    this._resetPositionData();
    if (this._leader) {
      this._positionNotice(this._leader);
    }

    // Get this notice ready for positioning.
    this._masking._setMasking(true, immediate);

    // Wait for the DOM to update.
    window.requestAnimationFrame(() => {
      if (this._masking) {
        this._positionNotice(this._masking);
      }
    });

    const maskingInteraction = () => {
      // If the masked notice is moused over or focused, the stack enters the
      // modal state, and the notices appear.
      if (this.modal === 'ish') {
        this._insertOverlay();

        this._setMasking(null, true);

        this.forEach(
          notice => {
            // Prevent the notices from timed closing.
            notice._preventTimerClose(true);

            if (notice.getState() === 'waiting') {
              notice.open();
            }
          },
          {
            start: this._leader,
            dir: 'next',
            skipModuleHandled: true
          }
        );
      }
    };

    this._maskingOff = (offs => () => offs.map(off => off()))([
      this._masking.on('mouseenter', maskingInteraction),
      this._masking.on('focusin', maskingInteraction)
    ]);
  }

  _shouldNoticeWait(notice) {
    return (
      this._swapping !== notice &&
      !(this.modal === 'ish' && this._overlayOpen) &&
      this.maxOpen !== Infinity &&
      this._openNotices >= this.maxOpen &&
      this.maxStrategy === 'wait'
    );
  }

  _insertOverlay() {
    if (!this._overlay) {
      this._overlay = document.createElement('div');
      this._overlay.classList.add('pnotify-modal-overlay');
      if (this.dir1) {
        this._overlay.classList.add(`pnotify-modal-overlay-${this.dir1}`);
      }
      if (this.overlayClose) {
        this._overlay.classList.add('pnotify-modal-overlay-closes');
      }
      if (this.context !== document.body) {
        this._overlay.style.height = `${this.context.scrollHeight}px`;
        this._overlay.style.width = `${this.context.scrollWidth}px`;
      }
      // Close the notices on overlay click.
      this._overlay.addEventListener('click', clickEvent => {
        if (this.overlayClose) {
          this.fire('overlayClose', { clickEvent });

          if (clickEvent.defaultPrevented) {
            return;
          }

          if (this._leader) {
            // Clear the leader. A new one will be found while closing.
            this._setLeader(null);
          }

          this.forEach(
            notice => {
              if (
                ['closed', 'closing', 'waiting'].indexOf(notice.getState()) !==
                -1
              ) {
                return;
              }
              if (notice.hide || this.overlayClosesPinned) {
                notice.close();
              } else if (!notice.hide && this.modal === 'ish') {
                if (this._leader) {
                  notice.close(false, false, true);
                } else {
                  this._setLeader(notice);
                }
              }
            },
            {
              skipModuleHandled: true
            }
          );

          if (this._overlayOpen) {
            this._removeOverlay();
          }
        }
      });
    }
    if (this._overlay.parentNode !== this.context) {
      this.fire('beforeAddOverlay');
      this._overlay.classList.remove('pnotify-modal-overlay-in');
      this._overlay = this.context.insertBefore(
        this._overlay,
        this.context.firstChild
      );
      this._overlayOpen = true;
      this._overlayInserted = true;
      window.requestAnimationFrame(() => {
        this._overlay.classList.add('pnotify-modal-overlay-in');
        this.fire('afterAddOverlay');
      });
    }
    this._collapsingModalState = false;
  }

  _removeOverlay() {
    if (this._overlay.parentNode) {
      this.fire('beforeRemoveOverlay');

      this._overlay.classList.remove('pnotify-modal-overlay-in');
      this._overlayOpen = false;
      setTimeout(() => {
        this._overlayInserted = false;
        if (this._overlay.parentNode) {
          this._overlay.parentNode.removeChild(this._overlay);
          this.fire('afterRemoveOverlay');
        }
      }, 250);
      setTimeout(() => {
        this._collapsingModalState = false;
      }, 400);
    }
  }
}
