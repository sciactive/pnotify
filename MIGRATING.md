# Migrating from PNotify 4

**PNotify 5** has some breaking changes:

## Major Breaking Changes

* It's built using [Svelte](https://svelte.dev) 3, which has a slightly different component API than Svelte 2.
* Using the factory functions is required. Using the `new` keyword will break your notice.
* IIFE scripts have been replaced with UMD scripts, since static methods and properties are now module exports.
* The deprecated `remove()`, `removeAll()`, `cancelRemove()`, etc. methods have been removed.
* The `autoDisplay` option has been renamed `autoOpen`.
* There is no longer a global array, and therefore, no longer `closeAll()` and `positionAll()` methods.
* Stacks now have `close()` and `position()` methods. Also, stacks use a `Stack` class now.
* The stack option `overlayClose` now defaults to true.
* `notice.get()` is no longer available.
* Dark mode is enabled by default if the user has enabled it on their OS! Use `PNotify.defaults.mode = 'light';` to remove this functionality.
* Methods are no longer chainable.

## Minor Breaking Changes.

* The title is no longer an h4 element. It is now just a div.
* The deprecated NonBlock module has been removed.
* White space formatting has changed. HTML notices no longer use `white-space: pre-line;`. Only regular text notices. But also titles do too now.
* `notice.off(event, callback)` is no longer needed. `on()` returns a function that will remove the listener when invoked.
* Animate.css support in legacy browsers has been removed.
* Some styling props and classes have changed, like pinDown, actionBar, etc.
* Material styling is no longer a module, but rather a CSS file.
* There is no longer a Compat module for running PNotify 3 code, and one will not be provided for running PNotify 4 code.
* `PNotify.styling` renamed to `PNotify.styles`. (Only relevant for creating modules.)
* The VERSION constant has been removed.