import { modules } from './PNotifyCore';
import Component, { key, defaults, requestPermission } from './PNotifyDesktopComponent.html';

Component.key = key;
Component.defaults = defaults;
Component.permission = requestPermission;

// Register the module with PNotify.
modules[key] = Component;

Component.factory = (notice, options) => new Component({ target: document.body, props: options });
