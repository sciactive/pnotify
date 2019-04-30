// This file is for referencing while you are making a PNotify module.

import { modules, modulesAppendContainer } from './PNotifyCore';
import Component, { key, defaults } from './PNotifyReferenceComponent.html';

Component.key = key;

Component.defaults = defaults;

// Register the module with PNotify.
modules[key] = Component;
// Append this module to the container.
modulesAppendContainer.push(Component);

// This is the first way to init a module. If you aren't placing any
// markup in the template, you would do this.
// Component.factory = (notice, options) => new Component({ target: document.body, props: options });
