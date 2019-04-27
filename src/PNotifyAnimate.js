import { modules } from './PNotifyCore';
import Component, { key, defaults } from './PNotifyAnimateComponent.html';

Component.key = key;

Component.defaults = defaults;

// Register the module with PNotify.
modules[key] = Component;

Component.factory = (notice, options) => {
  const module = new Component({ target: document.body, props: options });

  notice.attention = module.attention;

  return {
    key,
    $set: (...args) => module.$set(...args),
    $destroy: () => module.$destroy()
  };
};
