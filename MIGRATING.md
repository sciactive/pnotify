# Migrating from PNotify 4

**PNotify 5** has some breaking changes:

* It's built using [Svelte](http://svelte.technology) 3, which has a slightly different component API than Svelte 2.
* Methods are no longer chainable.
* The deprecated `remove()`, `removeAll()`, `cancelRemove()`, etc. methods have been removed.
* The deprecated NonBlock module has been removed.
* There is no longer a Compat module for running PNotify 3 code.
* `notice.get()` is no longer available.
* `PNotify.styling` renamed to `PNotify.styles`. (Only relevant for creating modules.)
* In v5, using the factory functions is required. Using the `new` keyword will break your notice.
