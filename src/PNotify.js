import PNotify from './PNotifyCore.html';

// Factory functions.
export const alert = options => new PNotify(getDefaultArgs(options));
export const notice = options => new PNotify(getDefaultArgs(options, 'notice'));
export const info = options => new PNotify(getDefaultArgs(options, 'info'));
export const success = options => new PNotify(getDefaultArgs(options, 'success'));
export const error = options => new PNotify(getDefaultArgs(options, 'error'));

// Default arguments for the new notice helper functions.
function getDefaultArgs (options, type) {
  if (typeof options !== 'object') {
    options = { text: options };
  }

  // Only assign the type if it was requested, so we don't overwrite
  // options.type if it has something assigned.
  if (type) {
    options.type = type;
  }

  // Experiment that doesn't work:
  let target = document.body;

  if ('stack' in options && options.stack && options.stack.context) {
    target = options.stack.context;
  }

  return { target, props: options };
}

export default PNotify;
export * from './PNotifyCore.html';
export { default as Stack } from './Stack.js';
