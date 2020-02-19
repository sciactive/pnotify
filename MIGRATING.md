# Migrating from PNotify 4

**PNotify 5** has breaking changes:

## Major Breaking Changes

* It's built using [Svelte](https://svelte.dev) 3, which has a slightly different component API than Svelte 2.
* The new modalish flow is the default flow. The default stack is configured to use it. To go back to the old behavior, use `PNotify.defaultStack.maxOpen = Infinity; PNotify.defaultStack.modal = false;`.
* Using the factory functions is required. Using the `new` keyword will break your notice.
* IIFE scripts have been replaced with UMD scripts, since static methods and properties are now module exports.
* The deprecated `remove()`, `removeAll()`, `cancelRemove()`, etc. methods have been removed. (Use `close()`, `stack.closeAll()`, `cancelClose()`.)
* The `autoDisplay` option has been renamed `autoOpen`.
* There is no longer a global array, and therefore, no longer `closeAll()` and `positionAll()` methods.
* Stacks use a `Stack` class now.
  * Stacks now have `close()` and `position()` methods.
  * The stack option `overlayClose` now defaults to true.
* `notice.get()` is no longer available.
* Dark mode is enabled by default if the user has enabled it on their OS! Use `PNotify.defaults.mode = 'light';` to remove this functionality.
* The History module has been removed.
  * The `showLast()` and `showAll()` methods are now the `openLast()` and `open()` methods of the Stack, respectively.
  * The `maxInStack` option has been replaced with `stack.maxOpen`. To use the old behavior, set `stack.maxStrategy` to 'close'.
* The Callbacks module has been removed.
  * The lifecycle events have been turned into actual events. You can use `notice.on('pnotify:beforeOpen')` and the like.
* Methods are no longer chainable.

## Minor Breaking Changes.

* The title is no longer an h4 element. It is now just a div.
* The deprecated NonBlock module has been removed.
* White space formatting has changed. HTML notices no longer use `white-space: pre-line;`. Only regular text notices. But also titles do too now.
* `notice.off(event, callback)` is no longer needed. `on()` returns a function that will remove the listener when invoked.
* Confirm modules events changed from `pnotify.confirm` and `pnotify.cancel` to `pnotify:confirm` and `pnotify:cancel`.
* Animate.css support in legacy browsers has been removed.
* Some styling props and classes have changed, like pinDown, actionBar, etc.
* Material styling is no longer a module, but rather a CSS file.
* There is no longer a Compat module for running PNotify 3 code, and one will not be provided for running PNotify 4 code.
* `PNotify.styling` renamed to `PNotify.styles`. (Only relevant for creating modules.)
* The VERSION constant has been removed.