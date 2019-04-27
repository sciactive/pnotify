import PNotify from './PNotifyCoreComponent.html';

// The factory is responsible for giving the instance access to itself.
PNotify.factory = options => {
  const notice = new PNotify(options);
  notice.init(notice);
  return notice;
};

// Factory functions.
export const alert = options => PNotify.factory(getDefaultArgs(options));
export const notice = options => PNotify.factory(getDefaultArgs(options, 'notice'));
export const info = options => PNotify.factory(getDefaultArgs(options, 'info'));
export const success = options => PNotify.factory(getDefaultArgs(options, 'success'));
export const error = options => PNotify.factory(getDefaultArgs(options, 'error'));

// Default arguments for the new notice helper functions.
function getDefaultArgs (options, type) {
  if (typeof options !== 'object') {
    options = { 'text': options };
  }

  // Only assign the type if it was requested, so we don't overwrite
  // options.type if it has something assigned.
  if (type) {
    options.type = type;
  }

  return { target: document.body, props: options };
}

// Some shortcut functions.
PNotify.prototype.on = function (...args) {
  return this.$on(...args);
};
PNotify.prototype.update = function (...args) {
  return this.$set(...args);
};

export default PNotify;
export * from './PNotifyCoreComponent.html';
