# Migrating from PNotify 4

## New Features in v5!!

- [Modalish flow!!](https://sciactive.com/2020/02/11/the-modalish-notification-flow/)
- Dark Mode!!
- [Countdown Module!!](https://github.com/sciactive/pnotify#countdown-module)
- Svelte 3!!
- Support for DOM Element Text and Title!!
- Individual Packages for Core and Modules!!

**PNotify 5** has breaking changes:

## Major Breaking Changes

- The new modalish flow is the default flow. The default stack is configured to use it. To go back to the old behavior, use `PNotify.defaultStack.maxOpen = Infinity; PNotify.defaultStack.modal = false;`.
- Using the factory functions is required. Using the `new` keyword will break your notice.
- IIFE scripts have been replaced with UMD scripts, since static methods and properties are now module exports.
  - The `dist` folder structure has changed. It's simpler now. All CSS and UMD scripts are right under `dist`.
- The Buttons module has been integrated into PNotify Core. Everyone was using it anyway. All the options are the same (except for `classes`), they're just core options now.
- Modules dont alter PNotify Core anymore. Instead, they are only used when they are explicitly added to the `modules` option.
  - Since they don't add themselves to PNotify anymore, the ones with a single option to toggle on/off, like Desktop, don't have that option anymore. If you don't want the functionality, don't include the module.
  - The way you add them and their options is different. Now `modules` is a `Map`, where the module itself is the key, and the options are the value.
- Bootstrap styling, Glyphicon icons, and Font Awesome icons are now provided by modules, rather than being built in.
- The deprecated `remove()`, `removeAll()`, `cancelRemove()`, etc. methods have been removed. (Use `close()`, `stack.close()`, `cancelClose()`.)
- The `autoDisplay` option has been renamed `autoOpen`.
- There is no longer a global array, and therefore, no longer `closeAll()` and `positionAll()` methods.
- Stacks use a `Stack` class now.
  - Stacks now have `close()` and `position()` methods.
  - The stack option `overlayClose` now defaults to true.
- `notice.get()` is no longer available.
- Dark mode is enabled by default if the user has enabled it on their OS! Use `PNotify.defaults.mode = 'light';` to remove this functionality.
- The History module has been removed.
  - The `showLast()` and `showAll()` methods are now the `openLast()` and `open()` methods of the Stack, respectively.
  - The `maxInStack` option has been replaced with `stack.maxOpen`. To use the old behavior, set `stack.maxStrategy` to 'close'.
- The Callbacks module has been removed.
  - The lifecycle events have been turned into actual events. You can use `notice.on('pnotify:beforeOpen')` and the like.
- The 'ui-pnotify' class and 'ui-pnotify-\*' classes have been changed to just 'pnotify' and 'pnotify-\*', respectively.
- The 'ui-pnotify' attribute has been changed to 'data-pnotify'.
- The `cornerClass` options has been removed, as has the `ui-pnotify-sharp` class. If you want `border-radius: 0;`, just use a custom class.
- Methods are no longer chainable. (Sorry.)

## Minor Breaking Changes.

- It's built using [Svelte](https://svelte.dev) 3, which has a slightly different component API than Svelte 2.
- The title is no longer an h4 element. It is now just a div.
- The deprecated NonBlock module has been removed.
- White space formatting has changed. HTML notices no longer use `white-space: pre-line;`. Only regular text notices. But also titles do too now.
- `notice.off(event, callback)` is no longer needed. `on()` returns a function that will remove the listener when invoked.
- Confirm module's events changed from `pnotify.confirm` and `pnotify.cancel` to `pnotify:confirm` and `pnotify:cancel`.
  - The event value for prompts moved from `event.value` to `event.detail.value`.
- The Mobile module now always styles notices. If you don't want styling, don't use the module.
- Animate.css support in legacy browsers has been removed.
- Some styling props and classes have changed, like pinDown, actionBar, etc.
- The styling class ending in '-element' has changed to '-elem'.
- Material styling is no longer a module, but rather just a CSS file.
- There is no longer a Compat module for running PNotify 3 code, and one will not be provided for running PNotify 4 code.
- `PNotify.styling` renamed to `PNotify.styles`. (Only relevant for creating modules.)
- The VERSION constant has been removed.
- The default labels for the sticker button has changed to 'Pin' and 'Unpin'.
