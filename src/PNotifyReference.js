import { modules, modulesAppendContainer } from './PNotifyCore';
import Component, { key, defaults } from './PNotifyReferenceComponent.html';

Component.key = key;

Component.defaults = defaults;

// Register the module with PNotify.
modules[key] = Component;
// Append this module to the container.
modulesAppendContainer.push(Component);
