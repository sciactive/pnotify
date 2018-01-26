[![Stories in Ready](https://badge.waffle.io/sciactive/pnotify.png?label=ready&title=Ready)](http://waffle.io/sciactive/pnotify) [![Stories in Progress](https://badge.waffle.io/sciactive/pnotify.png?label=in%20progress&title=In%20Progress)](http://waffle.io/sciactive/pnotify) [![npm version](https://badge.fury.io/js/pnotify.svg)](https://www.npmjs.com/package/pnotify) [![jsDelivr Hits](https://data.jsdelivr.com/v1/package/npm/pnotify/badge?style=rounded)](https://www.jsdelivr.com/package/npm/pnotify)

PNotify is a JavaScript notification plugin. PNotify can provide [desktop notifications](http://sciactive.com/pnotify/#web-notifications) based on the [Web Notifications spec](http://www.w3.org/TR/notifications/). If desktop notifications are not available or not permitted, PNotify will fall back to an in-browser notice.

# Demos

* http://sciactive.com/pnotify/ for the latest release
* https://sciactive.github.io/pnotify/ for what's in development (may be broken)

# Whoa there!

I guarantee **none of this README applies to you!** You want to check out the **[README on the master branch](https://github.com/sciactive/pnotify/blob/master/README.md)**.

This README is for **PNotify v4**. v4 isn't out yet, but it's got some huge changes.

* jQuery is no longer required. v4 doesn't require any libraries, actually.
* It's built using [Svelte](http://svelte.technology), which means it compiles down to vanilla JS.
* PNotify now has an ES6 module build.
* `text_escape` and `title_escape` have been replaced by `trust_text` and `trust_title`, and the default behavior changed.
* `insert_brs` option has gone away. (Text and title now have `white-space: pre-line;`.)

But v4 isn't even in the alpha stage yet.

Things that work:

* PNotify Core
* Bright Theme styling (CSS)
* Material styling (module)
* Buttons module
* Animate module
* Callbacks module
* NonBlock module
* Mobile module
* History module
* Desktop module
* Confirm module

Things that don't work:
* npm package...

# Getting Started

You can get PNotify using NPM. (You can also use [jsDelivr](https://www.jsdelivr.com/package/npm/pnotify).)

```
npm install pnotify
```

Inside the pnotify directory in node_modules, you'll find a `src`, `lib`, and `dist` directory.

* `src` contains the actual Svelte source code, and CSS files.
* `lib` contains all the JS files uncompressed.
* `dist` contains both JS and CSS files compressed.
* `lib` and `dist` each have subdirectories for the available formats, UMD, IIFE, and ES6 modules.

So if you're not using Webpack or Rollup, here's how you'd include PNotify on your page:

```html
<script type="text/javascript" src="node_modules/pnotify/dist/iife/PNotify.js"></script>
<link href="node_modules/pnotify/dist/PNotify.BrightTheme.css" media="all" rel="stylesheet" type="text/css" />
```

Now you can use PNotify like this:

```html
<script type="text/javascript">
  function makeNotice() {
    PNotify.notice({
      title: "Regular Notice",
      text: "Check me out! I'm a notice."
    });
  }
</script>
<button onclick="makeNotice()">Click me for Notice</button>
```

## Using a UI Library

If you are not using any UI library, you can use the default styling, called Bright Theme by including the PNotifyBrightTheme.css file. It is the default.

If you are using a UI or icon library, include the appropriate lines below somewhere before your first notice:

```js
//  The Material Style module. (PNotifyStyleMaterial.js)
PNotify.defaults.styling = "material";
PNotify.defaults.icons = "material";

// Bootstrap version 3
PNotify.defaults.styling = "bootstrap3";
PNotify.defaults.icons = "bootstrap3";

// Bootstrap version 4
PNotify.defaults.styling = "bootstrap4";

// Font Awesome 4
PNotify.defaults.icons = "fontawesome4";

// Font Awesome 5
PNotify.defaults.icons = "fontawesome5";
```

# Creating Notices

To make a notice, you can use the helper function:

```js
PNotify.alert({
  text: "I'm an alert.",
  type: "notice"
});
```

Or you can automatically set the type:

```js
PNotify.notice({
  text: "I'm a notice."
});
PNotify.info({
  text: "I'm an info message."
});
PNotify.success({
  text: "I'm a success message."
});
PNotify.error({
  text: "I'm an error message."
});
```

Or you can manually create a new notice (but, why would you?):

```js
new PNotify({
  target: document.body,
  data: {
    text: "I'm an alert.",
    type: "notice"
  }
});
```

# Options

* `title: false` - The notice's title.
* `trust_title: false` - Whether to trust the title or escape its contents. (Not allow HTML.)
* `text: false` - The notice's text.
* `trust_text: false` - Whether to trust the text or escape its contents. (Not allow HTML.)
* `styling: "brighttheme"` - What styling classes to use. (Can be "brighttheme", "bootstrap3", "bootstrap4", or a styling object. See the source in PNotifyStyleMaterial.html for the properties in a style object.)
* `icons: "brighttheme"` - What icons classes to use (Can be "brighttheme", "bootstrap3", "fontawesome4", "fontawesome5", or an icon object. See the source in PNotifyStyleMaterial.html for the properties in an icon object.)
* `addclass: ""` - Additional classes to be added to the notice. (For custom styling.)
* `cornerclass: ""` - Class to be added to the notice for corner styling.
* `auto_display: true` - Display the notice when it is created. Turn this off to add notifications to the history without displaying them.
* `width: "300px"` - Width of the notice.
* `min_height: "16px"` - Minimum height of the notice. It will expand to fit content.
* `type: "notice"` - Type of the notice. "notice", "info", "success", or "error".
* `icon: true` - Set icon to true to use the default icon for the selected style/type, false for no icon, or a string for your own icon class.
* `animation: "fade"` - The animation to use when displaying and hiding the notice. "none" and "fade" are supported through CSS. Others are supported through the Animate module and Animate.css.
* `animate_speed: "normal"` - Speed at which the notice animates in and out. "slow", "normal", or "fast". Respectively, 400ms, 250ms, 100ms.
* `shadow: true` - Display a drop shadow.
* `hide: true` - After a delay, close the notice.
* `delay: 8000` - Delay in milliseconds before the notice is closed.
* `mouse_reset: true` - Reset the hide timer if the mouse moves over the notice.
* `remove: true` - Remove the notice's elements from the DOM after it is closed.
* `destroy: true` - Whether to remove the notice from the global array when it is closed.
* `stack: PNotify.defaultStack` - The stack on which the notices will be placed. Also controls the direction the notices stack.
* `modules: {}` - This is where options for modules should be defined.

```js
PNotify.defaultStack = {
  "dir1": "down",
  "dir2": "left",
  "firstpos1": 25,
  "firstpos2": 25,
  "spacing1": 36,
  "spacing2": 36,
  "push": "bottom",
  "context": document.body
}
```

## Changing Default Options

Changing a default option is easy.

```js
PNotify.defaults.width = "400px";
```

Changing a default option for modules can be done in a couple ways.

```js
// This will change the default for every notice and is the recommended way.
PNotify.modules.History.defaults.max_in_stack = 10;

// This will change the default only for notices that don't specify any module options.
PNotify.defaults.modules = {
  History: {
    max_in_stack: 10
  }
};
```

## Desktop Module

`Desktop: {`
* `desktop: false` - Display the notification as a desktop notification.
* `fallback: true` - If desktop notifications are not supported or allowed, fall back to a regular notice.
* `icon: null` - The URL of the icon to display. If false, no icon will show. If null, a default icon will show.
* `tag: null` - Using a tag lets you update an existing notice, or keep from duplicating notices between tabs. If you leave tag null, one will be generated, facilitating the "update" function.
* `title: null` - Optionally display a different title for the desktop.
* `text: null` - Optionally display different text for the desktop.
* `options: {}` - Any additional options to be passed to the Notification constructor.

`}`

## Buttons Module

`Buttons: {`
* `closer: true` - Provide a button for the user to manually close the notice.
* `closer_hover: true` - Only show the closer button on hover.
* `sticker: true` - Provide a button for the user to manually stick the notice.
* `sticker_hover: true` - Only show the sticker button on hover.
* `show_on_nonblock: false` - Show the buttons even when the nonblock module is in use.
* `labels: {close: "Close", stick: "Stick", unstick: "Unstick"}` - Lets you change the displayed text, facilitating internationalization.
* `classes: {closer: null, pin_up: null, pin_down: null}` - The classes to use for button icons. Leave them null to use the classes from the styling you're using.

`}`

## NonBlock Module

`NonBlock: {`
* `nonblock: false` - Create a non-blocking notice. It lets the user click elements underneath it.

`}`

## Mobile Module

`Mobile: {`
* `swipe_dismiss: true` - Let the user swipe the notice away.
* `styling: true` - Styles the notice to look good on mobile.

`}`

## Animate Module

The Animate module requires you to include [Animate.css](https://daneden.github.io/animate.css/) in your page.

`Animate: {`
* `animate: false` - Use animate.css to animate the notice.
* `in_class: ""` - The class to use to animate the notice in.
* `out_class: ""` - The class to use to animate the notice out.

`}`

The Animate module also creates a method, `attention`, on notices which accepts an attention grabber class from [Animate.css](https://daneden.github.io/animate.css/) and callback to be called on completion of the animation.

## Confirm Module

`Confirm: {`
* `confirm: false` - Make a confirmation box.
* `prompt: false` - Make a prompt.
* `prompt_class: ""` - Classes to add to the input element of the prompt.
* `prompt_value: ""` - The value of the prompt. (Note that this is two-way bound to the input.)
* `prompt_multi_line: false` - Whether the prompt should accept multiple lines of text.
* `align: "right"` - Where to align the buttons. (right, center, left, justify)

```js
buttons: [
  {
    text: "Ok",
    trustText: false,
    addClass: "",
    promptTrigger: true,
    click: (notice, value) => {
      notice.close();
      notice.fire("pnotify.confirm", {notice, value});
    }
  },
  {
    text: "Cancel",
    trustText: false,
    addClass: "",
    click: (notice) => {
      notice.close();
      notice.fire("pnotify.cancel", {notice});
    }
  }
]
```
* The buttons to display, and their callbacks. If a button has promptTrigger set to true, it will be triggered when the user hits enter in a prompt (unless they hold shift).

`}`

Because the default buttons fire notice events on confirmation and cancellation, you can listen for them like this:

```js
PNotify.alert({
  title: "Confirmation Needed",
  text: "Are you sure?",
  hide: false,
  modules: {
    Confirm: {
      confirm: true
    }
  }
}).on("pnotify.confirm", () => {
  // User confirmed, continue here...
});
```

## History Module

`History: {`
* `history: true` - Place the notice in the history.
* `max_in_stack: Infinity` - Maximum number of notices to have open in its stack.

`}`

The History module also has two methods:

* `PNotify.modules.History.showLast(stack)` - Reopen the last closed notice from a stack that was placed in the history. If no stack is provided, it will use the default stack.
* `PNotify.modules.History.showAll(stack)` - Reopen all notices from a stack that were placed in the history. If no stack is provided, it will also use the default stack. If stack is `true`, it will reopen all notices from every stack.

In PNotify v3, the history module could make a dropdown which had these functions. In v4, it was decided that the dropdown was extra code that users weren't using, so it was removed.

## Callbacks Module

The callback options all expect one argument, a function, which will be called when that event occurs. If the function returns false on the "before_open" or "before_close" callback, that event will be canceled.

`Callbacks: {`
* `before_init` - This option is called before the notice has been initialized. It accepts one argument, the options object.
* `after_init` - This option is called after the notice has been initialized. It accepts one argument, the notice object.
* `before_open` - This option is called before the notice has been displayed. It accepts one argument, the notice object.
* `after_open` - This option is called after the notice has been displayed. It accepts one argument, the notice object.
* `before_close` - This option is called before the notice closes. It accepts one argument, the notice object.
* `after_close` - This option is called after the notice closes. It accepts one argument, the notice object.

`}`

# Utility Functions and Properties

## Global

* `PNotify.VERSION` - PNotify version number.
* `PNotify.alert(options)` - Create an alert.
* `PNotify.notice(options)` - Create an alert with "notice" type.
* `PNotify.info(options)` - Create an alert with "info" type.
* `PNotify.success(options)` - Create an alert with "success" type.
* `PNotify.error(options)` - Create an alert with "error" type.
* `PNotify.closeAll()` - Close all notices.
* `PNotify.removeAll()` - Alias for closeAll(). (Deprecated)
* `PNotify.closeStack(stack)` - Close all the notices in a stack.
* `PNotify.removeStack(stack)` - Alias for closeStack(stack). (Deprecated)
* `PNotify.positionAll()` - Reposition all notices.
* `PNotify.defaults` - Defaults for options.
* `PNotify.defaultStack` - The default stack object.
* `PNotify.notices` - An array of all active notices.
* `PNotify.modules` - This object holds all the PNotify modules.
* `PNotify.styling` - Styling objects.

## Per Notice

* `notice.open()` - Open the notice.
* `notice.close()` - Close the notice.
* `notice.remove()` - Alias for close(). (Deprecated)
* `notice.update(options)` - Update the notice with new options.
* `notice.refs.elem` - The notice's DOM element.
* `notice.refs.container` - The notice container DOM element.
* `notice.refs.titleContainer` - The title container DOM element.
* `notice.refs.textContainer` - The text container DOM element.
* `notice.addModuleClass(...classNames)` - This is for modules to add classes to the notice.
* `notice.removeModuleClass(...classNames)` - This is for modules to remove classes from the notice.
* `notice.hasModuleClass(...classNames)` - This is for modules to test classes on the notice.

## From the [Svelte Component API](https://svelte.technology/guide#component-api)

* `notice.get(option)` - Get the value of an option.
* `notice.set(options)` - You probably want to use `update(options)` instead. It has some special PNotify secret sauce to make sure your notice doesn't break.
* `notice.observe(key, callback[, options])` - Observe an option. See the Svelte docs for more info.
* `notice.destroy()` - Removes the component from the DOM and any observers/event listeners. You probably want to use `close()` instead. It will animate the notice out and you can open it again. Once you destroy it, you can't open it again.

### Events

* `notice.on(eventName, callback)` - Assign a callback to an event. Callback receives an `event` argument.
* `notice.fire(eventName, event)` - Fire an event.

# Stacks

A stack is an object which PNotify uses to determine where to position notices.

* A stack can include a `dir1` property, wich can be `"up"`, `"down"`, `"right"`, or `"left"`.
* If you include `dir1`, you can also include `firstpos1`, a number of pixels from the edge of the container the first notice will appear.
* You can also include a `dir2`, which should be a perpendicular direction to `dir1`.
* If you include `dir2`, you can also include `firstpos2`, a number of pixels from the edge of the container the first notice will appear.
* `dir1` is the first direction in which the notices are stacked. When the notices run out of room in the window, they will move over in the direction specified by `dir2`.
* If there is no `dir1` property, the notice will be centered.
* If there is a `dir1` and no `dir2`, the notices will be centered along the axis of `dir1`.
* The `firstpos*` values are relative to an edge determined by the `dir*` value.
  * `dir*` is `"up"` - `firstpos*` is relative to the bottom edge.
  * `dir*` is `"down"` - `firstpos*` is relative to the top edge.
  * `dir*` is `"left"` - `firstpos*` is relative to the right edge.
  * `dir*` is `"right"` - `firstpos*` is relative to the left edge.
* Stacks are independent of each other, so a stack doesn't know and doesn't care if it overlaps (and blocks) another stack.
* Stack objects are used and manipulated by PNotify, and therefore, should be a variable when passed.

> :warning: Calling something like `PNotify.alert({text: "notice", stack: {"dir1": "down", "firstpos1": 25}});` may not do what you want. It will create a notice, but that notice will be in its own stack and will overlap other notices.

## Modal Stacks

You can set a stack as modal by setting the `modal` property to true. A modal stack creates an overlay behind it when any of its notices are open. When the last notice within it is closed, the overlay is hidden.

If the `overlay_close` property is set to true, then clicking the overlay will cause all of the notices in that stack to be closed.

## Example Stacks

These are some example stacks that are used on the demo page.

```js
const stack_topleft = {
  "dir1": "down",
  "dir2": "right",
  "firstpos1": 25,
  "firstpos2": 25,
  "push": "top"
};
const stack_bottomleft = {
  "dir1": "right",
  "dir2": "up",
  "firstpos1": 25,
  "firstpos2": 25,
  "push": "top"
};
const stack_topcenter = {
  "dir1": "down",
  "firstpos1": 25
};
const stack_modal = {
  "dir1": "down",
  "firstpos1": 25,
  "push": "top",
  "modal": true,
  "overlay_close": true
};
const stack_bar_top = {
  "dir1": "down",
  "firstpos1": 0,
  "spacing1": 0,
  "push": "top"
};
const stack_bar_bottom = {
  "dir1": "up",
  "firstpos1": 0,
  "spacing1": 0
};
const stack_context = {
  "dir1": "down",
  "dir2": "left",
  "firstpos1": 25,
  "firstpos2": 25,
  "context": document.getElementById("stack-context")
};
```

If you just want to position a single notice programmatically, and don't want to add any other notices into the stack, you can use something like this:

```js
new PNotify({
  text: "Notice that's positioned in its own stack.",
  stack: {
    "dir1": "down", "dir2": "right",
    "firstpos1": 90, "firstpos2": 90
  }
});
```

This will create a notice that is positioned 90px from the top edge and 90px from the left edge of the viewport.

# Licensing and Additional Info

PNotify is distributed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).

See http://sciactive.com/pnotify/ for download, more information, and examples.

## Support on Beerpay
Hey dude! Help me out for a couple of :beers:!

[![Beerpay](https://beerpay.io/sciactive/pnotify/badge.svg?style=beer-square)](https://beerpay.io/sciactive/pnotify)  [![Beerpay](https://beerpay.io/sciactive/pnotify/make-wish.svg?style=flat-square)](https://beerpay.io/sciactive/pnotify?focus=wish)
