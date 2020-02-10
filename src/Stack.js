export default class Stack {
  constructor (options) {
    this.dir1 = options.dir1 || null;
    this.dir2 = options.dir2 || null;
    this.firstpos1 = options.firstpos1;
    this.firstpos2 = options.firstpos2;
    this.spacing1 = options.spacing1;
    this.spacing2 = options.spacing2;
    this.push = options.push || 'bottom';
    this.maxOpen = 'maxOpen' in options ? options.maxOpen : 1;
    this.maxStrategy = 'maxStrategy' in options ? options.maxStrategy : 'wait';
    this.modal = 'modal' in options ? options.modal : 'ish';
    this.overlayClose = 'overlayClose' in options ? options.overlayClose : true;
    this.overlayClosesPinned = options.overlayClosesPinned || false;
    this.context = options.context || (window && document.body) || null;

    // Public properties.
    this.notices = [];

    // Private properties.
    this._addpos2 = 0;
    this._animation = true;
    this._posTimer = null;
    this._openNotices = 0;
    this._listener = null;
    this._overlayOpen = false;
    this._overlayInserted = false;
    // The masking leader is the first open notice in the stack. It is not
    // masked, but mousing over it resets the masking if the notices are out.
    this._maskingLeader = null;
    this._maskingLeaderOff = null;
  }

  forEach (callback, newestFirst) {
    const zeroStart = newestFirst ? this.push === 'top' : this.push === 'bottom';
    for (let i = (zeroStart ? 0 : this.notices.length - 1); (zeroStart ? i < this.notices.length : i >= 0); (zeroStart ? i++ : i--)) {
      if (callback(this.notices[i]) === false) {
        break;
      }
    }
  }

  position () {
    // Reset the next position data.
    if (this.notices.length > 0) {
      this._nextpos1 = this.firstpos1;
      this._nextpos2 = this.firstpos2;
      this._addpos2 = 0;
      for (let i = 0; i < this.notices.length; i++) {
        this.notices[i].position();
      }
    } else {
      if (this._overlay) {
        this._removeOverlay();
      }

      delete this._nextpos1;
      delete this._nextpos2;
    }
  }

  // Queue the position so it doesn't run repeatedly and use up resources.
  queuePosition (milliseconds) {
    if (this._posTimer) {
      clearTimeout(this._posTimer);
    }
    if (!milliseconds) {
      milliseconds = 10;
    }
    this._posTimer = setTimeout(() => this.position(), milliseconds);
  }

  close () {
    this.forEach(notice => notice.close(false));
  }

  open () {
    this.forEach(notice => notice.open());
  }

  openLast () {
    // Look up the last notice, and display it.
    this.forEach(notice => {
      if (['opening', 'open', 'waiting'].indexOf(notice.getState()) === -1) {
        notice.open();
        return false;
      }
    }, true);
  }

  _addNotice (notice) {
    if (this.push === 'top') {
      this.notices.splice(0, 0, notice);
    } else {
      this.notices.push(notice);
    }
    if (!this._listener) {
      this._listener = () => this.position();
      this.context.addEventListener('pnotify:position', this._listener);
    }
  }

  _removeNotice (notice) {
    const idx = this.notices.indexOf(notice);
    if (idx !== -1) {
      this.notices.splice(idx, 1);
    }
    if (!this.notices.length && this._listener) {
      this.context.removeEventListener('pnotify:position', this._listener);
      this._listener = null;
    }
  }

  _setMaskingLeader (leader) {
    if (this._maskingLeaderOff) {
      this._maskingLeaderOff();
      this._maskingLeaderOff = null;
    }

    this._maskingLeader = leader;

    if (this._maskingLeader) {
      // The next waiting notice that is masking.
      let masking = null;
      let maskingOff = null;

      const maskingInteraction = () => {
        turnMaskingOff();

        // If the masked notice is moused over or focused, the stack enters the
        // modal state, and the notices appear.
        if (this.modal === 'ish') {
          if (!this._overlay) {
            this._createOverlay();
          }
          this._insertOverlay();

          this.forEach(notice => {
            // Prevent the notices from timed closing.
            notice.preventTimerClose(true);

            if (notice.getState() === 'waiting') {
              notice.open();
            }
          });
        }
      };

      // If the mouse enters this notice while it's the masking leader, then the
      // next waiting notice should start masking.
      const leaderInteraction = () => {
        turnMaskingOff();
        // This is a workaround for leaving the modal state.
        let nextNoticeFromModalState = null;

        // If the masking leader is moused over:
        if (this._overlayOpen) {
          this.forEach(notice => {
            // Allow the notices to timed close.
            notice.preventTimerClose(false);

            // Close and set to wait any open notices other than the masking
            // leader.
            if (notice !== this._maskingLeader && ['opening', 'open'].indexOf(notice.getState()) !== -1) {
              if (!nextNoticeFromModalState) {
                nextNoticeFromModalState = notice;
              }
              notice.close(false, true);
            }
          });

          // Queue position.
          this.queuePosition(0);

          // Remove the modal state overlay.
          this._removeOverlay();
        }

        // Set the next waiting notice to be masking.
        let foundMaskingLeader = false;
        this.forEach(notice => {
          if (!foundMaskingLeader) {
            if (notice === this._maskingLeader) {
              foundMaskingLeader = true;
            }
            return;
          }
          // After the masking leader if found, the next notice that is
          // "waiting" is usually fine, but if we're leaving the modal state, it
          // will still be "closing" here, so we have to work around that. :P
          if (notice.getState() === 'waiting' || notice === nextNoticeFromModalState) {
            notice.setMasking(true);
            masking = notice;
            maskingOff = (offs => () => offs.map(off => off()))([
              notice.on('mouseenter', maskingInteraction),
              notice.on('focusin', maskingInteraction)
            ]);
            return false;
          }
        });
      };

      // If the mouse leaves this notice while it's the masking leader, then the
      // next waiting notice should stop masking.
      let maskingOffTimer = null;
      const turnMaskingOff = () => {
        if (maskingOffTimer) {
          clearTimeout(maskingOffTimer);
          maskingOffTimer = null;
        }
        if (maskingOff) {
          maskingOff();
          maskingOff = null;
        }
        if (masking) {
          masking.setMasking(false);
          masking = null;
        }
      };
      const leaderLeaveInteraction = () => {
        if (maskingOffTimer) {
          clearTimeout(maskingOffTimer);
          maskingOffTimer = null;
        }
        maskingOffTimer = setTimeout(turnMaskingOff, 1000);
      };

      this._maskingLeaderOff = (offs => () => offs.map(off => off()))([
        this._maskingLeader.on('mouseenter', leaderInteraction),
        this._maskingLeader.on('focusin', leaderInteraction),
        this._maskingLeader.on('mouseleave', leaderLeaveInteraction),
        this._maskingLeader.on('focusout', leaderLeaveInteraction)
      ]);
    }
  }

  _handleNoticeClosed (notice) {
    this._openNotices--;

    if (this.maxOpen !== Infinity && this.maxStrategy === 'wait' && this._openNotices < this.maxOpen) {
      // Check for the next waiting notice and open it.
      this.forEach(notice => {
        if (notice.getState() === 'waiting') {
          notice.open();
          if (this._openNotices >= this.maxOpen) {
            return false;
          }
        }
      });
    }

    if (this._openNotices <= 0) {
      this._openNotices = 0;
      if (this._overlay) {
        this._removeOverlay();
      }
    }

    if (this.modal === 'ish' && notice === this._maskingLeader) {
      this._setMaskingLeader(null);
      // Find a new masking leader.
      this.forEach(notice => {
        if (['opening', 'open'].indexOf(notice.getState()) !== -1) {
          this._setMaskingLeader(notice);
          return false;
        }
      });
    }

    this.queuePosition(0);
  }

  _handleNoticeOpened (notice) {
    this._openNotices++;

    if (this.modal === true) {
      if (!this._overlay) {
        this._createOverlay();
      }
      this._insertOverlay();
    }

    if (this.modal === 'ish' && !this._maskingLeader) {
      this._setMaskingLeader(notice);
    }
  }

  _createOverlay () {
    if (!this._overlay) {
      const overlay = document.createElement('div');
      overlay.classList.add('ui-pnotify-modal-overlay');
      if (this.overlayClose) {
        overlay.classList.add('ui-pnotify-modal-overlay-closes');
      }
      if (this.context !== document.body) {
        overlay.style.height = this.context.scrollHeight + 'px';
        overlay.style.width = this.context.scrollWidth + 'px';
      }
      // Close the notices on overlay click.
      overlay.addEventListener('click', () => {
        if (this.overlayClose) {
          this.forEach(notice => {
            if (notice.hide || this.overlayClosesPinned) {
              notice.close(false);
            }
          });

          if (this._overlayOpen) {
            this._removeOverlay();
            // todo: exit modal state here (from the code above)
            // like, cause the notices won't fold up.
          }
        }
      });
      this._overlay = overlay;
    }
  }

  _insertOverlay () {
    if (this._overlay.parentNode !== this.context) {
      this._overlay.classList.remove('ui-pnotify-modal-overlay-in');
      this._overlay = this.context.insertBefore(this._overlay, this.context.firstChild);
      this._overlayOpen = true;
      this._overlayInserted = true;
      window.requestAnimationFrame(() => {
        this._overlay.classList.add('ui-pnotify-modal-overlay-in');
      });
    }
  }

  _removeOverlay () {
    if (this._overlay.parentNode) {
      this._overlay.classList.remove('ui-pnotify-modal-overlay-in');
      this._overlayOpen = false;
      setTimeout(() => {
        this._overlayInserted = false;
        if (this._overlay.parentNode) {
          this._overlay.parentNode.removeChild(this._overlay);
        }
      }, 75);
    }
  }
}
