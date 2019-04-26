import PNotify from './PNotifyCoreLoader';
import Component, { key, defaults } from './PNotifyAnimate.html';

Component.key = key;

Component.defaults = defaults;

// Register the module with PNotify.
PNotify.modules[key] = Component;

Component.factory = (notice) => {
  notice.attention = (aniClass, callback) => {
    const cb = () => {
      if (notice.refs.container) {
        notice.refs.container.removeEventListener('webkitAnimationEnd', cb);
        notice.refs.container.removeEventListener('mozAnimationEnd', cb);
        notice.refs.container.removeEventListener('MSAnimationEnd', cb);
        notice.refs.container.removeEventListener('oanimationend', cb);
        notice.refs.container.removeEventListener('animationend', cb);
        notice.refs.container.classList.remove(aniClass);
      }
      if (callback) {
        callback.call(notice);
      }
    };
    if (notice.refs.container) {
      notice.refs.container.addEventListener('webkitAnimationEnd', cb);
      notice.refs.container.addEventListener('mozAnimationEnd', cb);
      notice.refs.container.addEventListener('MSAnimationEnd', cb);
      notice.refs.container.addEventListener('oanimationend', cb);
      notice.refs.container.addEventListener('animationend', cb);
      notice.refs.container.classList.add('animated');
      notice.refs.container.classList.add(aniClass);
    }
  };

  const module = new Component({ target: document.body });

  return {
    key,
    $set: (...args) => module.$set(...args),
    $destroy: () => module.$destroy()
  };
};
