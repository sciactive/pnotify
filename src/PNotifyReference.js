// This file is for referencing while you are making a PNotify module.

import { modules, modulesAppendContent } from './PNotifyCore';
import Component, { key, defaults } from './PNotifyReferenceComponent.html';

Component.key = key;
Component.defaults = defaults;

// Register the module with PNotify.
modules[key] = Component;
// Append this module to the content area.
modulesAppendContent.push(Component);
