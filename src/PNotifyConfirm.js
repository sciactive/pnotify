import { modules, modulesAppendContent } from './PNotifyCore';
import Component, { key, defaults } from './PNotifyConfirmComponent.html';

Component.key = key;
Component.defaults = defaults;

// Register the module with PNotify.
modules[key] = Component;
// Append this module to the container.
modulesAppendContent.push(Component);
