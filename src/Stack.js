export default class Stack {
  constructor (options) {
    this.dir1 = options.dir1 || null;
    this.dir2 = options.dir2 || null;
    this.firstpos1 = options.firstpos1;
    this.firstpos2 = options.firstpos2;
    this.spacing1 = options.spacing1;
    this.spacing2 = options.spacing2;
    this.push = options.push || 'bottom';
    this.maxOpen = 'maxOpen' in options ? options.maxOpen : Infinity;
    this.maxStrategy = 'maxStrategy' in options ? options.maxStrategy : 'wait';
    this.modal = 'modal' in options ? options.modal : false;
    this.overlayClose = 'overlayClose' in options ? options.overlayClose : true;
    this.context = options.context || (window && document.body) || null;

    this._openNotices = 0;

    this.notices = [];
    this.animation = true;
    this.listener = null;
  }

  forEach (callback, newestFirst) {
    const zeroStart = newestFirst ? this.push === 'top' : this.push === 'bottom';
    for (let i = (zeroStart ? 0 : this.notices.length - 1); (zeroStart ? i < this.notices.length : i >= 0); (zeroStart ? i++ : i--)) {
      if (callback(this.notices[i]) === false) {
        break;
      }
    }
  }

  addNotice (notice) {
    if (this.push === 'top') {
      this.notices.splice(0, 0, notice);
    } else {
      this.notices.push(notice);
    }
    if (!this.listener) {
      this.listener = () => this.position();
      this.context.addEventListener('pnotify:position', this.listener);
    }
  }

  removeNotice (notice) {
    const idx = this.notices.indexOf(notice);
    if (idx !== -1) {
      this.notices.splice(idx, 1);
    }
    if (!this.notices.length && this.listener) {
      this.context.removeEventListener('pnotify:position', this.listener);
      this.listener = null;
    }
  }

  noticeClosedHandler () {
    this._openNotices--;
    if (this.maxOpen !== Infinity && this.maxStrategy === 'wait') {
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
      if (this.overlay) {
        this.removeOverlay();
      }
    }
  }

  noticeOpenedHandler () {
    this._openNotices++;

    if (this.modal) {
      if (!this.overlay) {
        this.createOverlay();
      }
      this.insertOverlay();
    }
  }

  position () {
    // Reset the next position data.
    if (this.notices.length > 0) {
      this.nextpos1 = this.firstpos1;
      this.nextpos2 = this.firstpos2;
      this.addpos2 = 0;
      for (let i = 0; i < this.notices.length; i++) {
        this.notices[i].position();
      }
    } else {
      if (this.overlay) {
        this.removeOverlay();
      }

      delete this.nextpos1;
      delete this.nextpos2;
    }
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

  createOverlay () {
    if (!this.overlay) {
      const overlay = document.createElement('div');
      overlay.classList.add('ui-pnotify-modal-overlay');
      if (this.context !== document.body) {
        overlay.style.height = this.context.scrollHeight + 'px';
        overlay.style.width = this.context.scrollWidth + 'px';
      }
      // Close the notices on overlay click.
      overlay.addEventListener('click', () => {
        if (this.overlayClose) {
          this.close();
        }
      });
      this.overlay = overlay;
    }
  }

  insertOverlay () {
    if (this.overlay.parentNode !== this.context) {
      this.overlay.classList.remove('ui-pnotify-modal-overlay-in');
      this.overlay = this.context.insertBefore(this.overlay, this.context.firstChild);
      window.requestAnimationFrame(() => {
        this.overlay.classList.add('ui-pnotify-modal-overlay-in');
      });
    }
  }

  removeOverlay () {
    if (this.overlay.parentNode) {
      this.overlay.classList.remove('ui-pnotify-modal-overlay-in');
      setTimeout(() => {
        if (this.overlay.parentNode) {
          this.overlay.parentNode.removeChild(this.overlay);
        }
      }, 75);
    }
  }
}
