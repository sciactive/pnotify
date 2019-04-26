import PNotify, { VERSION, defaultStack, defaults, notices, modules, modulesPrependContainer, modulesAppendContainer, closeAll, closeStack, positionAll, styles, icons } from './PNotifyCore.html';

// The factory is responsible for giving the instance access to itself.
PNotify.factory = options => {
  const notice = new PNotify(options);
  notice.init(notice);
  return notice;
};

// Helper function to create a new notice.
PNotify.alert = options => PNotify.factory(getDefaultArgs(options));
// Helper function to create a new notice (notice type).
PNotify.notice = options => PNotify.factory(getDefaultArgs(options, 'notice'));
// Helper function to create a new notice (info type).
PNotify.info = options => PNotify.factory(getDefaultArgs(options, 'info'));
// Helper function to create a new notice (success type).
PNotify.success = options => PNotify.factory(getDefaultArgs(options, 'success'));
// Helper function to create a new notice (error type).
PNotify.error = options => PNotify.factory(getDefaultArgs(options, 'error'));

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
PNotify.prototype.off = function (...args) {
  return this.$off(...args);
};
PNotify.prototype.update = function (...args) {
  return this.$set(...args);
};

// Expose exports on constructor.
PNotify.VERSION = VERSION;
PNotify.defaultStack = defaultStack;
PNotify.defaults = defaults;
PNotify.notices = notices;
PNotify.modules = modules;
PNotify.modulesPrependContainer = modulesPrependContainer;
PNotify.modulesAppendContainer = modulesAppendContainer;
PNotify.closeAll = closeAll;
PNotify.closeStack = closeStack;
PNotify.positionAll = positionAll;
PNotify.styles = styles;
PNotify.icons = icons;

export default PNotify;
