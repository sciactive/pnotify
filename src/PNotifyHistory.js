import { modules } from './PNotifyCore';
import Component, { key, defaults, showLast, showAll } from './PNotifyHistoryComponent.html';

Component.key = key;
Component.defaults = defaults;
Component.showLast = showLast;
Component.showAll = showAll;

// Register the module with PNotify.
modules[key] = Component;

Component.factory = (notice, options) => new Component({ target: document.body, props: options });
