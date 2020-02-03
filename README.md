[![npm version](https://badge.fury.io/js/pnotify.svg)](https://www.npmjs.com/package/pnotify) [![jsDelivr Hits](https://data.jsdelivr.com/v1/package/npm/pnotify/badge?style=rounded)](https://www.jsdelivr.com/package/npm/pnotify)

PNotify is a JavaScript notification and [confirmation/prompt](http://sciactive.com/pnotify/#confirm-module) library. PNotify can provide [desktop notifications](http://sciactive.com/pnotify/#web-notifications) based on the [Web Notifications spec](http://www.w3.org/TR/notifications/) with fall back to an in-browser notice.

<h1>Demos</h1>

* http://sciactive.com/pnotify/ for the latest release
* https://sciactive.github.io/pnotify/ for what's in development

<h1>Table of Contents</h1>

<!-- TOC START min:1 max:3 link:true asterisk:false update:true -->
- [Getting Started](#Getting-Started)
  - [Migrating from PNotify 4](#Migrating-from-PNotify-4)
- [Installation](#Installation)
  - [Svelte](#Svelte)
  - [React](#React)
  - [Angular](#Angular)
  - [Angular (Injectable)](#Angular-Injectable)
  - [AngularJS](#AngularJS)
  - [Vanilla JS (ES5)](#Vanilla-JS-ES5)
  - [Vanilla JS (ES6)](#Vanilla-JS-ES6)
- [Styles](#Styles)
  - [Bright Theme](#Bright-Theme)
  - [Material](#Material)
    - [Material Icons](#Material-Icons)
  - [Bootstrap](#Bootstrap)
  - [Font Awesome (Icons)](#Font-Awesome-Icons)
- [Creating Notices](#Creating-Notices)
- [Options](#Options)
  - [Changing Defaults](#Changing-Defaults)
- [Module Options](#Module-Options)
  - [Desktop Module](#Desktop-Module)
  - [Buttons Module](#Buttons-Module)
  - [Mobile Module](#Mobile-Module)
  - [Animate Module](#Animate-Module)
  - [Confirm Module](#Confirm-Module)
  - [History Module](#History-Module)
  - [Callbacks Module](#Callbacks-Module)
- [Exported Methods and Properties](#Exported-Methods-and-Properties)
- [Instance Methods and Properties](#Instance-Methods-and-Properties)
  - [Events](#Events)
  - [From the Svelte Component API](#From-the-Svelte-Component-API)
- [Stacks](#Stacks)
  - [Example Stack](#Example-Stack)
- [Features](#Features)
- [Licensing and Additional Info](#Licensing-and-Additional-Info)
<!-- TOC END -->

# Getting Started

You can get PNotify using NPM. (You can also use [jsDelivr](https://www.jsdelivr.com/package/npm/pnotify) or [UNPKG](https://unpkg.com/pnotify/).)

```sh
npm install --save pnotify

# If you plan to use Material style:
npm install --save material-design-icons

# If you plan to use the Animate module:
npm install --save animate.css

# If you plan to use NonBlock.js for non-blocking notices:
npm install --save nonblockjs
```

Inside the pnotify module directory:

* `src` Svelte components and uncompressed Bright Theme CSS.
* `dist` compressed Bright Theme CSS.
* `dist/es` compressed ECMAScript modules.
* `dist/umd` compressed UMD modules.

## [Migrating from PNotify 4](MIGRATING.md)

# Installation

In addition to the JS, be sure to [include a PNotify style](#styles).

## Svelte

[PNotify in Svelte](https://codesandbox.io/s/nwoxqkvw6m). Import the source files from `src`:

```js
import { alert } from 'pnotify/src/PNotifyCore';
import 'pnotify/src/PNotifyButtons';

alert('Notice me, senpai!');
```

## React

[PNotify in React](https://codesandbox.io/s/wwqzk8472w). Import the ES modules from `dist`:

```js
import { alert } from 'pnotify/dist/es/PNotify';
import 'pnotify/dist/es/PNotifyButtons';

alert('Notice me, senpai!');
```

## Angular

[PNotify in Angular](https://codesandbox.io/s/l3pzkl64yq). Import the ES modules from `dist` and initiate the modules:

```ts
import { alert } from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';

//...
export class WhateverComponent {
  constructor() {
    PNotifyButtons; // Initiate the module. Important!
    alert('Notice me, senpai!');
  }
}
```

<small>For IE support, see [this issue](https://github.com/sciactive/pnotify/issues/343).</small>

## Angular (Injectable)

[PNotify in Angular](https://codesandbox.io/s/17yr520yj) as an injectable service:

```ts
// pnotify.service.ts
import { Injectable } from '@angular/core';
import { alert } from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';

@Injectable()
export class PNotifyService {
  getPNotifyAlert() {
    PNotifyButtons; // Initiate the module. Important!
    return alert;
  }
}

// whatever.module.ts
//...
import { PNotifyService } from './pnotify.service';
@NgModule({
  declarations: [...],
  imports: [...],
  providers: [PNotifyService],
  bootstrap: [...]
})
export class WhateverModule {}

// whatever.component.ts
import { PNotifyService } from './pnotify.service';
//...
export class WhateverComponent {
  alert = undefined;
  constructor(pnotifyService: PNotifyService) {
    this.alert = pnotifyService.getPNotifyAlert();
    this.alert('Notice me, senpai!');
  }
}
```

## AngularJS

[PNotify in AngularJS](https://codesandbox.io/s/o5mp55p2p9). Import the UMD modules from `dist`:

```js
var angular = require('angular');
var PNotify = require('pnotify/dist/umd/PNotify');
require('pnotify/dist/umd/PNotifyButtons');

angular.module('WhateverModule', [])
  .value('PNotify', PNotify)
  .controller('WhateverController', ['PNotify', function(PNotify) {
    PNotify.alert('Notice me, senpai!');
  }]);
```

## Vanilla JS (ES5)

PNotify in vanilla ECMAScript 5. Include the UMD scripts from `dist`:

```html
<script type="text/javascript" src="node_modules/pnotify/dist/umd/PNotify.js"></script>
<script type="text/javascript" src="node_modules/pnotify/dist/umd/PNotifyButtons.js"></script>
<script type="text/javascript">
  PNotify.alert('Notice me, senpai!');
</script>
```

## Vanilla JS (ES6)

PNotify in vanilla ECMAScript 6+. Include the ES modules from `dist`:

```js
import { alert } from 'node_modules/pnotify/dist/es/PNotify.js';
import 'node_modules/pnotify/dist/es/PNotifyButtons.js';

alert('Notice me, senpai!');
```

# Styles

## Bright Theme

The default, standalone theme, Bright Theme. Supports dark mode. Include the CSS file in your page:

```html
<link href="node_modules/pnotify/dist/PNotifyBrightTheme.css" rel="stylesheet" type="text/css" />
```

## Material

The Material style. Supports darm mode. Requires [material-design-icons](https://www.npmjs.com/package/material-design-icons). Include the CSS file in your page, and set it as the default:

```html
<link href="node_modules/pnotify/dist/PNotifyMaterial.css" rel="stylesheet" type="text/css" />
```

```js
import { defaults } from 'pnotify/dist/es/PNotify';
// or
const { defaults } = require('pnotify/dist/umd/PNotify');

// Set default styling.
defaults.styling = 'material';
// This icon setting requires the Material Icons font. (See below.)
defaults.icons = 'material';
```

### Material Icons

To use the Material Style icons, include the Material Design Icons Font in your page.

```sh
# The official Google package:
npm install --save material-design-icons

# OR, An unofficial package that only includes the font:
npm install --save material-design-icon-fonts
```

```html
<link rel="stylesheet" href="node_modules/material-design-icons/iconfont/material-icons.css" />
```

Alternatively, you can use the Google Fonts CDN:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />
```

## Bootstrap

Styling for the popular Bootstrap library. Doesn't support dark mode (but you can use a Bootstrap theme). To set Bootstrap as the default style, include the appropriate line(s) from below:

```js
import { defaults } from 'PNotify/dist/es/PNotify';
// or
const { defaults } = require('pnotify/dist/umd/PNotify');

defaults.styling = 'bootstrap3'; // Bootstrap version 3
defaults.icons = 'bootstrap3'; // glyphicons
// or
defaults.styling = 'bootstrap4'; // Bootstrap version 4
```

## Font Awesome (Icons)

To set Font Awesome as the default icons, include the appropriate line from below:

```js
import { defaults } from 'PNotify/dist/es/PNotify';
// or
const { defaults } = require('pnotify/dist/umd/PNotify');

defaults.icons = 'fontawesome4'; // Font Awesome 4
// or
defaults.icons = 'fontawesome5'; // Font Awesome 5
```

# Creating Notices

To make a notice, use the factory functions:

```js
import { alert, notice, info, success, error } from 'PNotify/dist/es/PNotify';
// or
const { alert, notice, info, success, error } = require('pnotify/dist/umd/PNotify');

// Manually set the type.
alert({
  text: "I'm an alert.",
  type: 'notice'
});

// Automatically set the type.
notice({
  text: "I'm a notice."
});
info({
  text: "I'm an info message."
});
success({
  text: "I'm a success message."
});
error({
  text: "I'm an error message."
});
```

# Options

PNotify options and default values.

`defaults = {`
* `type: 'notice'`<br>
  Type of the notice. 'notice', 'info', 'success', or 'error'.
* `title: false`<br>
  The notice's title. Can be a string, an element, or `false` for no title.
* `titleTrusted: false`<br>
  Whether to trust the title or escape its contents. (Not allow HTML.)
* `text: false`<br>
  The notice's text. Can be a string, an element, or `false` for no text.
* `textTrusted: false`<br>
  Whether to trust the text or escape its contents. (Not allow HTML.)
* `styling: 'brighttheme'`<br>
  What styling classes to use. (Can be 'brighttheme', 'material', 'bootstrap3', 'bootstrap4', or a styling object.)
* `icons: 'brighttheme'`<br>
  What icons classes to use (Can be 'brighttheme', 'material', 'bootstrap3', 'fontawesome4', 'fontawesome5', or an icon object.)
* `mode: 'no-preference'`<br>
  Light or dark version of the theme, if supported by the styling. This overrides the CSS media query when a preference is given. (Can be 'no-preference', 'light', or 'dark'.)
* `addClass: ''`<br>
  Additional classes to be added to the notice. (For custom styling.)
* `cornerClass: ''`<br>
  Class to be added to the notice for corner styling.
* `autoOpen: true`<br>
  Open the notice immediately when it is created.
* `width: '360px'`<br>
  Width of the notice.
* `minHeight: '16px'`<br>
  Minimum height of the notice. It will expand to fit content.
* `icon: true`<br>
  Set icon to true to use the default icon for the selected style/type, false for no icon, or a string for your own icon class.
* `animation: 'fade'`<br>
  The animation to use when displaying and hiding the notice. 'none' and 'fade' are supported through CSS. Others are supported through the Animate module and Animate.css.
* `animateSpeed: 'normal'`<br>
  Speed at which the notice animates in and out. 'slow', 'normal', or 'fast'. Respectively, 400ms, 250ms, 100ms.
* `shadow: true`<br>
  Display a drop shadow.
* `hide: true`<br>
  After a delay, close the notice.
* `delay: 8000`<br>
  Delay in milliseconds before the notice is closed.
* `mouseReset: true`<br>
  Reset the hide timer if the mouse moves over the notice.
* `remove: true`<br>
  Remove the notice's elements from the DOM after it is closed.
* `destroy: true`<br>
  Whether to remove the notice from the stack array (and therefore, history) when it is closed.
* `stack: defaultStack`<br>
  The stack on which the notices will be placed. Also controls the direction the notices stack.
* `modules: {}`<br>
  This is where options for modules should be defined.

`}`

```js
defaultStack = new Stack({
  dir1: 'down',
  dir2: 'left',
  firstpos1: 25,
  firstpos2: 25,
  spacing1: 36,
  spacing2: 36,
  push: 'bottom',
  context: document.body
})
```

[Learn more about stacks.](#Stacks)

## Changing Defaults

```js
import { defaults } from 'PNotify/dist/es/PNotify';
// or
const { defaults } = require('pnotify/dist/umd/PNotify');

defaults.width = '400px';
```

Changing a default for modules can be done in a couple ways.

```js
// This will change the default for every notice, and is the recommended way.
import { modules } from 'PNotify/dist/es/PNotify';
// or
const { modules } = require('pnotify/dist/umd/PNotify');
modules.History.defaults.maxInStack = 10;

// This will change the default only for notices that don't have a `modules` option.
import { defaults } from 'PNotify/dist/es/PNotify';
// or
const { defaults } = require('pnotify/dist/umd/PNotify');
defaults.modules = {
  History: {
    maxInStack: 10
  }
};
```

# Module Options

## Desktop Module

`Desktop: {`
* `desktop: false`<br>
  Display the notification as a desktop notification.
* `fallback: true`<br>
  If desktop notifications are not supported or allowed, fall back to a regular notice.
* `icon: null`<br>
  The URL of the icon to display. If false, no icon will show. If null, a default icon will show.
* `tag: null`<br>
  Using a tag lets you update an existing notice, or keep from duplicating notices between tabs. If you leave tag null, one will be generated, facilitating the `update` function.
* `title: null`<br>
  Optionally display a different title for the desktop.
* `text: null`<br>
  Optionally display different text for the desktop.
* `options: {}`<br>
  Any additional options to be passed to the Notification constructor.

`}`

## Buttons Module

`Buttons: {`
* `closer: true`<br>
  Provide a button for the user to manually close the notice.
* `closerHover: true`<br>
  Only show the closer button on hover.
* `sticker: true`<br>
  Provide a button for the user to manually stick the notice.
* `stickerHover: true`<br>
  Only show the sticker button on hover.
* `labels: {close: 'Close', stick: 'Stick', unstick: 'Unstick'}`<br>
  Lets you change the displayed text, facilitating internationalization.
* `classes: {closer: null, pinUp: null, pinDown: null}`<br>
  The classes to use for button icons. Leave them null to use the classes from the styling you're using.

`}`

## Mobile Module

`Mobile: {`
* `swipeDismiss: true`<br>
  Let the user swipe the notice away.
* `styling: true`<br>
  Styles the notice to look good on mobile.

`}`

## Animate Module

Requires [Animate.css](https://daneden.github.io/animate.css/).

`Animate: {`
* `animate: false`<br>
  Use animate.css to animate the notice.
* `inClass: ''`<br>
  The class to use to animate the notice in.
* `outClass: ''`<br>
  The class to use to animate the notice out.

`}`

The Animate module also creates a method, `attention`, on notices which accepts an attention grabber class and an animation completed callback.

## Confirm Module

`Confirm: {`
* `confirm: false`<br>
  Make a confirmation box.
* `focus: null`<br>
  For confirmation boxes, true means the first button or the button with promptTrigger will be focused, and null means focus will change only for modal notices. For prompts, true or null means focus the prompt. When false, focus will not change.
* `prompt: false`<br>
  Make a prompt.
* `promptClass: ''`<br>
  Classes to add to the input element of the prompt.
* `promptValue: ''`<br>
  The value of the prompt. (Note that this is two-way bound to the input.)
* `promptMultiLine: false`<br>
  Whether the prompt should accept multiple lines of text.
* `align: 'right'`<br>
  Where to align the buttons. (right, center, left, justify)

```js
buttons: [
  {
    text: 'Ok',
    textTrusted: false,
    addClass: '',
    primary: true,
    // Whether to trigger this button when the user hits enter in a single line
    // prompt. Also, focus the button if it is a modal prompt.
    promptTrigger: true,
    click: (notice, value) => {
      notice.close();
      notice.fire('pnotify.confirm', {notice, value});
    }
  },
  {
    text: 'Cancel',
    textTrusted: false,
    addClass: '',
    click: (notice) => {
      notice.close();
      notice.fire('pnotify.cancel', {notice});
    }
  }
]
```
* The buttons to display, and their callbacks. If a button has promptTrigger set to true, it will be triggered when the user hits enter in a prompt (unless they hold shift).

`}`

Because the default buttons fire notice events on confirmation and cancellation, you can listen for them like this:

```js
import { alert } from 'PNotify/dist/es/PNotify';
const notice = alert({
  title: 'Confirmation Needed',
  text: 'Are you sure?',
  hide: false,
  modules: {
    Confirm: {
      confirm: true
    }
  }
});
notice.on('pnotify.confirm', () => {
  // User confirmed, continue here...
});
notice.on('pnotify.cancel', () => {
  // User canceled, continue here...
});
```

## History Module

`History: {`
* `history: true`<br>
  Place the notice in the history.
* `maxInStack: Infinity`<br>
  Maximum number of notices to have open in its stack.

`}`

The History module also has two methods:

* `modules.History.showLast(stack)`<br>
  Reopen the last closed notice from a stack that was placed in the history. If no stack is provided, it will use the default stack.
* `modules.History.showAll(stack)`<br>
  Reopen all notices from a stack that were placed in the history. If no stack is provided, it will also use the default stack.

> :information_source: In v4, the History module can no longer make a dropdown for you. But hey, it's smaller now.

## Callbacks Module

The callback options all expect the value to be a callback function. If the function returns false on the `beforeOpen` or `beforeClose` callback, that event will be canceled.

`Callbacks: {`
* `beforeInit`<br>
  Called before the notice has been initialized. Given one argument, the options object.
* `afterInit`<br>
  Called after the notice has been initialized. Given one argument, the notice object.
* `beforeOpen`<br>
  Called before the notice opens. Given one argument, the notice object.
* `afterOpen`<br>
  Called after the notice opens. Given one argument, the notice object.
* `beforeClose`<br>
  Called before the notice closes. Given one argument, the notice object.
* `afterClose`<br>
  Called after the notice closes. Given one argument, the notice object.

`}`

# Exported Methods and Properties

* `alert(options)`<br>
  Create and return a notice with the default type.
* `notice(options)`<br>
  Create and return a notice with 'notice' type.
* `info(options)`<br>
  Create and return a notice with 'info' type.
* `success(options)`<br>
  Create and return a notice with 'success' type.
* `error(options)`<br>
  Create and return a notice with 'error' type.
* `closeStack(stack)`<br>
  Close all the notices in a stack.
* `positionAll()`<br>
  Reposition all notices.
* `defaults`<br>
  Defaults for options.
* `defaultStack`<br>
  The default stack object.
* `modules`<br>
  This object holds all the PNotify module constructors.
* `styles`<br>
  Styles objects.
* `icons`<br>
  Icons objects.

# Instance Methods and Properties

* `notice.open()`<br>
  Open the notice.
* `notice.close()`<br>
  Close the notice.
* `notice.update(options)`<br>
  Update the notice with new options.
* `notice.addModuleClass(element, ...classNames)`<br>
  This is for modules to add classes to the notice or container element.
* `notice.removeModuleClass(element, ...classNames)`<br>
  This is for modules to remove classes from the notice or container element.
* `notice.hasModuleClass(element, ...classNames)`<br>
  This is for modules to test classes on the notice or container element.
* `notice.refs.elem`<br>
  The notice's DOM element.
* `notice.refs.container`<br>
  The container DOM element.
* `notice.refs.content`<br>
  The content DOM element. (Title and text containers are in here.)
* `notice.refs.titleContainer`<br>
  The title container DOM element.
* `notice.refs.textContainer`<br>
  The text container DOM element.
* `notice.refs.iconContainer`<br>
  The icon container DOM element.

## Events

* `notice.on(eventName, callback)`<br>
  Invokes the callback whenever the notice dispatches the event. Callback receives an `event` argument with a `detail` prop. Returns a function that removes the handler when invoked.
* `notice.fire(eventName, event)`<br>
  Fire an event.

## From the [Svelte Component API](https://svelte.dev/docs#Client-side_component_API)

* `notice.$set(options)`<br>
  You probably want to use `update(options)` instead. The Svelte API may change.
* `notice.$on(event, callback)`<br>
  You probably want to use `on(event, callback)` instead. The Svelte API may change.
* `notice.$destroy()`<br>
  Removes the component from the DOM and any observers/event listeners. You probably want to use `close()` with `destroy: true` instead. It will animate the notice out and remove it from the `stack.notices` array.

# Stacks

A stack is an object used to determine where to position notices.

Stack properties:

* `dir1`<br>
  The primary stacking direction. Can be `'up'`, `'down'`, `'right'`, or `'left'`.
* `firstpos1`<br>
  Number of pixels from the edge of the context, relative to `dir1`, the first notice will appear. If undefined, the current position of the notice, whatever that is, will be used.
* `spacing1`<br>
  Number of pixels between notices along `dir1`. If undefined, `25` will be used.
* `dir2`<br>
  The secondary stacking direction. Should be a perpendicular direction to `dir1`. The notices will continue in this direction when they reach the edge of the viewport along `dir1`.
* `firstpos2`<br>
  Number of pixels from the edge of the context, relative to `dir2`, the first notice will appear. If undefined, the current position of the notice, whatever that is, will be used.
* `spacing2`<br>
  Number of pixels between notices along `dir2`. If undefined, `25` will be used.
* `push`<br>
  Where, in the stack, to push new notices. Can be `'top'` or `'bottom'`.
* `modal`<br>
  Whether to create a modal overlay when this stack's notices are open.
* `overlayClose`<br>
  Whether clicking on the modal overlay should close the stack's notices.
* `context`<br>
  The DOM element this stack's notices should appear in. If undefined, `document.body` will be used.

Stack behavior:

* If there is no `dir1` property, the notice will be centered in the context.
* If there is a `dir1` and no `dir2`, the notices will be centered along the axis of `dir1`.
* The `firstpos*` values are relative to an edge determined by the corresponding `dir*` value.
  * `dirX === 'up'` means `firstposX` is relative to the **bottom** edge.
  * `dirX === 'down'` means `firstposX` is relative to the **top** edge.
  * `dirX === 'left'` means `firstposX` is relative to the **right** edge.
  * `dirX === 'right'` means `firstposX` is relative to the **left** edge.
* Stacks are independent of each other, so a stack doesn't know and doesn't care if it overlaps (and blocks) another stack.
* Stack objects are used and manipulated by PNotify, and therefore, should be a variable when passed.

> :warning: Calling something like `alert({text: 'notice', stack: new Stack({dir1: 'down', firstpos1: 25})});` may not do what you want. It will create a notice, but that notice will be in its own stack and will overlap other notices.

## Example Stack

Here is an example stack with comments to explain. You can play with it [here](https://codesandbox.io/s/2po6zq9yrr).

```js
const stackBottomModal = new Stack({
  dir1: 'up', // With a dir1 of 'up', the stacks will start appearing at the bottom.
  // Without a `dir2`, this stack will be horizontally centered, since the `dir1` axis is vertical.
  firstpos1: 25, // The notices will appear 25 pixels from the bottom of the context.
  // Without a `spacing1`, this stack's notices will be placed 25 pixels apart.
  push: 'top', // Each new notice will appear at the bottom of the screen, which is where the 'top' of the stack is. Other notices will be pushed up.
  modal: true, // When a notice appears in this stack, a modal overlay will be created.
  overlayClose: true, // When the user clicks on the overlay, all notices in this stack will be closed.
  context: document.getElementById('page-container') // The notices will be placed in the 'page-container' element.
});
```

If you just want to position a single notice programmatically, and don't want to add any other notices into the stack, you can use something like this:

```js
alert({
  text: "Notice that's positioned in its own stack.",
  stack: new Stack({
    dir1: 'down', dir2: 'right', // Position from the top left corner.
    firstpos1: 90, firstpos2: 90 // 90px from the top, 90px from the left.
  })
});
```

# Features

* Rich graphical features and effects.
  * Automatic dark mode support.
  * Material, Bootstrap 3/4, Font Awesome 4/5, or the stand-alone theme, Bright Theme.
  * Mobile styling and swipe support.
  * Timed hiding.
  * Slick animations with Animate.css.
  * Attention getters with Animate.css.
* Highly customizable UI.
  * Sticky notices.
  * Optional close and stick buttons.
  * Non-blocking notices for less intrusive use.
  * Notification types: notice, info, success, and error.
  * Stacks allow notices to position together or independently.
  * Control stack direction and push to top or bottom.
  * Modal notices.
  * Confirm dialogs, alert buttons, and prompts.
  * RTL language support.
* Feature rich API.
  * Desktop notifications based on the Web Notifications standard.
  * Dynamically update existing notices.
  * Put forms and other HTML in notices.
    * By default, escapes text to prevent XSS attack.
  * Callbacks for lifespan events.
  * Notice history for reshowing old notices.
* Universally compatible.
  * Works with any frontend library (React, Angular, Svelte, Vue, Ember, etc.).
  * Works well with bundlers (Webpack, Rollup, etc.).
  * No dependencies for most features.

# Licensing and Additional Info

Copyright 2009-2020 Hunter Perrin
Copyright 2015 Google, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

See http://sciactive.com/pnotify/ for more information, and demos.
