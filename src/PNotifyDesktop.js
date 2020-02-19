import { modules, modulesPrependContainer } from './PNotifyCore';
import Component, { key, defaults, requestPermission } from './PNotifyDesktopComponent.html';

Component.key = key;
Component.defaults = defaults;
Component.permission = requestPermission;

// Register the module with PNotify.
modules[key] = Component;
// This module doesn't render anything, so it doesn't matter where it goes.
modulesPrependContainer.push(Component);
