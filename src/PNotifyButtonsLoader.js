import PNotify from './PNotifyCoreLoader';
import Component, { key, defaults } from './PNotifyButtons.html';

Component.key = key;

Component.defaults = defaults;

// Register the module with PNotify.
PNotify.modules[key] = Component;
// Prepend this module to the container.
PNotify.modulesPrependContainer.push(Component);
