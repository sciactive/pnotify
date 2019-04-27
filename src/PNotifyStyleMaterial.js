import { modules, modulesPrependContainer } from './PNotifyCore';
import Component, { key } from './PNotifyStyleMaterialComponent.html';

Component.key = key;

// Register the module with PNotify.
modules[key] = Component;
// Prepend this module to the container.
modulesPrependContainer.push(Component);
