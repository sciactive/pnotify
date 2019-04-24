# Migrating from PNotify 3

**PNotify 4** came along with some huge changes:

* **jQuery is no longer required.** v4 doesn't require any libraries, actually.
* It's built using [Svelte](http://svelte.technology), which means it compiles down to vanilla JS.
* Has an ES module build.
* Options are in camelCase instead of snake_case.
* `text_escape`/`title_escape` replaced by `textTrusted`/`titleTrusted`, and default behavior changed.
* `insert_brs` went away. (Now uses `white-space: pre-line;`.)
* Default width raised to 360px.
* NonBlock module spun off into its own project, [NonBlock.js](https://github.com/sciactive/nonblockjs).
* There is a Compat module available to allow you to run PNotify 3 code with PNotify 4.

## Running PNotify 3 Code with PNotifyCompat

You can use `PNotifyCompat` instead of `PNotify` in order to run PNotify 3 code. Check out `demo/compat-*.html` for more examples.

```js
import PNotify from 'pnotify/dist/es/PNotifyCompat';

new PNotify({
  title: 'Regular Notice',
  text: 'Check me out! I\'m a notice.',
  text_escape: true // <-- old options work
});
```
