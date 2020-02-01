# Migrating from PNotify 4

**PNotify 5** has some breaking changes:

* It's built using [Svelte](https://svelte.dev) 3, which has a slightly different component API than Svelte 2.
* IIFE scripts have been replaced with UMD scripts, since static methods and properties are now module exports.
* Methods are no longer chainable.
* The deprecated `remove()`, `removeAll()`, `cancelRemove()`, etc. methods have been removed.
* The `autoDisplay` option has been renamed `autoOpen`.
* The deprecated NonBlock module has been removed.
* There is no longer a Compat module for running PNotify 3 code, and one will not be provided for running PNotify 4 code.
* `notice.get()` is no longer available.
* `PNotify.styling` renamed to `PNotify.styles`. (Only relevant for creating modules.)
* In v5, using the factory functions is required. Using the `new` keyword will break your notice.
* Animate.css support in legacy browsers has been removed.
* `notice.off(event, callback)` is no longer needed. `on()` returns a function that will remove the listener when invoked.
* Some styling props and classes have changed, like pinDown, actionBar, etc.
* Material styling is no longer a module, but rather a CSS file.
* The VERSION constant has been removed.
* Dark mode is enabled by default if the user has enabled it on their OS! Use `PNotify.defaults.mode = 'light';` to remove this functionality.
