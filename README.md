[![npm version](https://badge.fury.io/js/pnotify.svg)](https://www.npmjs.com/package/pnotify) [![jsDelivr Hits](https://data.jsdelivr.com/v1/package/npm/pnotify/badge?style=rounded)](https://www.jsdelivr.com/package/npm/pnotify)

<div align="center">
  <img src="includes/logo.png" alt="PNotify" />
</div>

A JavaScript/TypeScript notification, confirmation, and prompt library.

Notifications can display as toast style, snackbar style, banners, dialogs, alerts, or desktop notifications (using the [Web Notifications spec](http://www.w3.org/TR/notifications/)) with fall back to an in-browser notice.

PNotify provides a unique notification flow called [modalish](https://sciactive.com/2020/02/11/the-modalish-notification-flow/) that provides a good user experience, even when many notifications are shown at once.

<h1>Demos</h1>

Latest Stable - http://sciactive.com/pnotify/

Development - https://sciactive.github.io/pnotify/

<h1>Table of Contents</h1>

<!-- TOC START min:1 max:3 link:true asterisk:false update:true -->
- [Getting Started](#Getting-Started)
  - [Documentation for Old Versions](#Documentation-for-Old-Versions)
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
  - [Font Awesome 4 (Icons)](#Font-Awesome-4-Icons)
  - [Font Awesome 5 (Icons)](#Font-Awesome-5-Icons)
- [Creating Notices](#Creating-Notices)
- [Options](#Options)
  - [Changing Defaults](#Changing-Defaults)
- [Modules](#Modules)
  - [Creating Notices with Modules](#Creating-Notices-with-Modules)
    - [TypeScript](#TypeScript)
  - [Desktop Module](#Desktop-Module)
  - [Mobile Module](#Mobile-Module)
  - [Countdown Module](#Countdown-Module)
  - [Animate Module](#Animate-Module)
  - [Confirm Module](#Confirm-Module)
- [Exported Methods and Properties](#Exported-Methods-and-Properties)
- [Instance Methods and Properties](#Instance-Methods-and-Properties)
  - [Events](#Events)
- [Stacks](#Stacks)
  - [Example Stack](#Example-Stack)
- [Features](#Features)
- [Licensing and Additional Info](#Licensing-and-Additional-Info)
<!-- TOC END -->

# Getting Started

You can get PNotify using NPM or Yarn. (You can also use [jsDelivr](https://www.jsdelivr.com/package/npm/pnotify).)

You *should* install the packages you need individually. Alternatively, you can install all of them at once with the `pnotify` package.

```sh
# Install the packages you need individually.

# You definitely need this one.
npm install --save-dev @pnotify/core
# These are the optional ones.
npm install --save-dev @pnotify/animate
npm install --save-dev @pnotify/bootstrap3
npm install --save-dev @pnotify/bootstrap4
npm install --save-dev @pnotify/confirm
npm install --save-dev @pnotify/countdown
npm install --save-dev @pnotify/desktop
npm install --save-dev @pnotify/font-awesome4
npm install --save-dev @pnotify/font-awesome5
npm install --save-dev @pnotify/font-awesome5-fix
npm install --save-dev @pnotify/glyphicon
npm install --save-dev @pnotify/mobile

# ...

# Or, you can install this to get them all (if you're lazy).
npm install --save pnotify
```

## Documentation for Old Versions

* [Readme for v4](https://github.com/sciactive/pnotify/blob/v4/README.md) on the [v4 branch](https://github.com/sciactive/pnotify/tree/v4).
* [Readme for v3](https://github.com/sciactive/pnotify/blob/v3/README.md) on the [v3 branch](https://github.com/sciactive/pnotify/tree/v3).

## [Migrating from PNotify 4](MIGRATING.md)

# Installation

In addition to the JS and CSS, be sure to [include a PNotify style](#styles).

## Svelte

[PNotify in Svelte](https://codesandbox.io/s/pnotify-5-in-svelte-4kyyh).

```js
import { alert, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';

defaultModules.set(PNotifyMobile, {});

alert('Notice me, senpai!');
```

## React

[PNotify in React](https://codesandbox.io/s/pnotify-5-in-react-4g9uk).

```js
import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

defaultModules.set(PNotifyMobile, {});

alert('Notice me, senpai!');
```

## Angular

[PNotify in Angular](https://codesandbox.io/s/pnotify-5-in-angular-l8mxu).

```ts
import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

defaultModules.set(PNotifyMobile, {});

//...
export class WhateverComponent {
  constructor() {
    alert('Notice me, senpai!');
  }
}
```

<small>For IE support, see [this issue](https://github.com/sciactive/pnotify/issues/343).</small>

## Angular (Injectable)

[PNotify in Angular (Injectable)](https://codesandbox.io/s/pnotify-5-in-angular-injectable-xnb6k)

```ts
// pnotify.service.ts
import { Injectable } from '@angular/core';
import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

defaultModules.set(PNotifyMobile, {});

@Injectable()
export class PNotifyService {
  getPNotifyAlert() {
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

[PNotify in AngularJS](https://codesandbox.io/s/pnotify-5-in-angularjs-fk45i).

```html
<link href="node_modules/@pnotify/core/dist/PNotify.css" rel="stylesheet" type="text/css" />
<link href="node_modules/@pnotify/mobile/dist/PNotifyMobile.css" rel="stylesheet" type="text/css" />
```
```js
var angular = require('angular');
var PNotify = require('@pnotify/core');
var PNotifyMobile = require('@pnotify/mobile');

PNotify.defaultModules.set(PNotifyMobile, {});

angular.module('WhateverModule', [])
  .value('PNotify', PNotify)
  .controller('WhateverController', ['PNotify', function(PNotify) {
    PNotify.alert('Notice me, senpai!');
  }]);
```

## Vanilla JS (ES5)

PNotify in vanilla ES5

```html
<script type="text/javascript" src="node_modules/@pnotify/core/dist/PNotify.js"></script>
<link href="node_modules/@pnotify/core/dist/PNotify.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="node_modules/@pnotify/mobile/dist/PNotifyMobile.js"></script>
<link href="node_modules/@pnotify/mobile/dist/PNotifyMobile.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
  PNotify.defaultModules.set(PNotifyMobile, {});

  PNotify.alert('Notice me, senpai!');
</script>
```

## Vanilla JS (ES6)

[PNotify in vanilla ES6+](https://codesandbox.io/s/pnotify-5-in-vanilla-es6-x4ipu)

```html
<link href="node_modules/@pnotify/core/dist/PNotify.css" rel="stylesheet" type="text/css" />
<link href="node_modules/@pnotify/mobile/dist/PNotifyMobile.css" rel="stylesheet" type="text/css" />
<script type="module">
  import { alert, defaultModules } from 'node_modules/@pnotify/core/dist/PNotify.js';
  import * as PNotifyMobile from 'node_modules/@pnotify/mobile/dist/PNotifyMobile.js';

  defaultModules.set(PNotifyMobile, {});

  alert('Notice me, senpai!');
</script>
```

# Styles

## Bright Theme

The default, standalone theme, Bright Theme. Supports dark mode. Include the CSS file in your page:

```html
<link href="node_modules/@pnotify/core/dist/BrightTheme.css" rel="stylesheet" type="text/css" />
```

Or if you're using a packager that imports CSS:

```js
import '@pnotify/core/dist/BrightTheme.css';
```

## Material

The Material style. Supports dark mode. Requires [material-design-icons](https://www.npmjs.com/package/material-design-icons). Include the CSS file in your page:

```html
<link href="node_modules/@pnotify/core/dist/Material.css" rel="stylesheet" type="text/css" />
```

Or if you're using a packager that imports CSS:

```js
import '@pnotify/core/dist/Material.css';
```

Then set the default styling and icons to 'material':

```js
import { defaults } from '@pnotify/core';
// or
const { defaults } = require('@pnotify/core');

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

Or if you're using a packager that imports CSS:

```js
import 'material-design-icons/iconfont/material-icons.css';
```

Alternatively, you can use the Google Fonts CDN:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />
```

Or a clone from jsDelivr:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/material-icons-font@2.0.0/material-icons-font.css" />

```

## Bootstrap

```sh
npm install --save-dev @pnotify/bootstrap3
npm install --save-dev @pnotify/glyphicon
# or
npm install --save-dev @pnotify/bootstrap4
```

Styling for the popular Bootstrap library. Doesn't support dark mode (but you can use a Bootstrap theme).

Include the CSS:

```html
<link rel="stylesheet" href="node_modules/@pnotify/bootstrap4/dist/PNotifyBootstrap4.css" />
```

Or if you're using a packager that imports CSS:

```js
import '@pnotify/bootstrap4/dist/PNotifyBootstrap4.css';
```

Include the appropriate line(s) from below:

```js
import { defaultModules } from '@pnotify/core';
import * as PNotifyBootstrap4 from '@pnotify/bootstrap4';
// or
const { defaultModules } = require('@pnotify/core');
const PNotifyBootstrap4 = require('@pnotify/bootstrap4');
```

Then set it as a default module:

```js
defaultModules.set(PNotifyBootstrap4, {});
```

Change the "4" to "3" for Bootstrap 3, and also import and set `PNotifyGlyphicon` to use Bootstrap 3's glyphicons. `PNotifyGlyphicon` doesn't have any CSS to import.

## Font Awesome 4 (Icons)

```sh
npm install --save-dev @pnotify/font-awesome4
```

To set Font Awesome 4 as the default icons, include the appropriate line from below:

```js
import { defaultModules } from '@pnotify/core';
import * as PNotifyFontAwesome4 from '@pnotify/font-awesome4';
// or
const { defaultModules } = require('@pnotify/core');
const PNotifyFontAwesome4 = require('@pnotify/font-awesome4');
```

Then set it as a default module:

```js
defaultModules.set(PNotifyFontAwesome4, {});
```

## Font Awesome 5 (Icons)

```sh
npm install --save-dev @pnotify/font-awesome5
npm install --save-dev @pnotify/font-awesome5-fix
```

To set Font Awesome 5 as the default icons, include the appropriate line from below:

```js
import { defaultModules } from '@pnotify/core';
import * as PNotifyFontAwesome5Fix from '@pnotify/font-awesome5-fix';
import * as PNotifyFontAwesome5 from '@pnotify/font-awesome5';
// or
const { defaultModules } = require('@pnotify/core');
const PNotifyFontAwesome5Fix = require('@pnotify/font-awesome5-fix');
const PNotifyFontAwesome5 = require('@pnotify/font-awesome5');
```

Then set them as default modules:

```js
defaultModules.set(PNotifyFontAwesome5Fix, {});
defaultModules.set(PNotifyFontAwesome5, {});
```

If you don't want to use Font Awesome 5 as your default icons, but you still want support for them in your notices, you should include only the `@pnotify/font-awesome5-fix` package. Font Awesome 5 does some mysterious magic in its code that breaks PNotify. This module has a workaround for it.

# Creating Notices

To make a notice, use the factory functions. Each one takes an options object as its only argument. It will return a PNotify notice instance.

```js
import { alert, notice, info, success, error } from '@pnotify/core';
// or
const { alert, notice, info, success, error } = require('@pnotify/core');

// Manually set the type.
const myAlert = alert({
  text: "I'm an alert.",
  type: 'info'
});

// Automatically set the type.
const myNotice = notice({
  text: "I'm a notice."
});

const myInfo = info({
  text: "I'm an info message."
});

const mySuccess = success({
  text: "I'm a success message."
});

const myError = error({
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
  What styling classes to use. (Can be 'brighttheme', 'material', another string provided by a module, or a styling object.)
* `icons: 'brighttheme'`<br>
  What icons classes to use (Can be 'brighttheme', 'material', another string provided by a module, or an icon object.)
* `mode: 'no-preference'`<br>
  Light or dark version of the theme, if supported by the styling. This overrides the CSS media query when a preference is given. (Can be 'no-preference', 'light', or 'dark'.)
* `addClass: ''`<br>
  Additional classes to be added to the notice. (For custom styling.)
* `addModalClass: ''`<br>
  Additional classes to be added to the notice, only when in modal.
* `addModelessClass: ''`<br>
  Additional classes to be added to the notice, only when in modeless.
* `autoOpen: true`<br>
  Open the notice immediately when it is created.
* `width: '360px'`<br>
  Width of the notice.
* `minHeight: '16px'`<br>
  Minimum height of the notice. It will expand to fit content.
* `maxTextHeight: '200px'`
  Maximum height of the text container. If the text goes beyond this height, scrollbars will appear. Use null to remove this restriction.
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
  Delay in milliseconds before the notice is removed. If set to `Infinity`, the notice will not close, but it will not be considered sticky, so it will be closed along with all unstuck notices if the modal backdrop is clicked.
* `mouseReset: true`<br>
  Reset the hide timer if the mouse moves over the notice.
* `closer: true`<br>
  Provide a button for the user to manually close the notice.
* `closerHover: true`<br>
  Only show the closer button on hover.
* `sticker: true`<br>
  Provide a button for the user to manually stick the notice.
* `stickerHover: true`<br>
  Only show the sticker button on hover.
* `labels: {close: 'Close', stick: 'Pin', unstick: 'Unpin'}`<br>
  The various displayed text, helps facilitating internationalization.
* `remove: true`<br>
  Remove the notice's elements from the DOM after it is closed.
* `destroy: true`<br>
  Whether to remove the notice from the stack (and therefore, stack history) when it is closed.
* `stack: defaultStack`<br>
  The stack on which the notices will be placed. Also controls the direction the notices stack.
* `modules: defaultModules`<br>
  This is where modules and their options should be added. It is a map of `module => options` entries.

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

```js
defaultModules = new Map()
```

## Changing Defaults

```js
import { defaults } from '@pnotify/core';
// or
const { defaults } = require('@pnotify/core');

defaults.width = '400px';
```

Adding/removing a module to the defaults:

```js
import { defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
// or
const { defaultModules } = require('@pnotify/core');
const PNotifyMobile = require('@pnotify/mobile');

// Add a module to the defaults. Note that the second argument should
// always be `{}`.
defaultModules.set(PNotifyMobile, {});

// Removing a module from the defaults.
defaultModules.delete(PNotifyMobile);
```

Changing a module's defaults:

```js
import { defaults } from '@pnotify/animate';
// or
const { defaults } = require('@pnotify/animate');

// then
defaults.inClass = 'fadeInDown';
defaults.outClass = 'fadeOutUp';
```

# Modules

## Creating Notices with Modules

Besides using the default modules, you can remove or add modules and set their options when you call a notice. The modules Map has modules themselves as keys, and an options object as values.

```js
import { notice, defaultModules } from '@pnotify/core';
import * as PNotifyBootstrap4 from '@pnotify/bootstrap4';
import * as PNotifyFontAwesome4 from '@pnotify/font-awesome4';
import * as PNotifyMobile from '@pnotify/mobile';
import * as PNotifyAnimate from '@pnotify/animate';

defaultModules.set(PNotifyBootstrap4, {});
defaultModules.set(PNotifyFontAwesome4, {});
defaultModules.set(PNotifyMobile, {});

// Remove one of the default modules.
notice({
  text: "I don't have the Mobile module.",
  modules: new Map([
    ...[...defaultModules].filter(([mod]) => mod !== PNotifyMobile)
  ])
});

// Add an additional module and options.
notice({
  text: "I use the Animate module in addition to the defaults.",
  modules: new Map([
    ...defaultModules,
    [PNotifyAnimate, {
      inClass: 'fadeInDown',
      outClass: 'fadeOutUp'
    }]
  ])
});

// Don't worry about adding a module that's already in the defaults.
// It's a Map, so only the last instance/options will end up in there.
notice({
  text: "I use the Mobile module with options I specify.",
  modules: new Map([
    ...defaultModules,
    [PNotifyMobile, {
      swipeDismiss: false
    }]
  ])
});
```

### TypeScript

Using modules with TypeScript requires types assertions for module entries, and possibly the `downlevelIteration` TypeScript option.

```ts
import {notice, defaultModules, Notice, ModuleEntry} from '@pnotify/core';
import * as PNotifyConfirm from '@pnotify/confirm';

notice({
  text: "I'm a notice with modules, and my module options are checked by TypeScript.",
  modules: new Map([
    // This requires `"downlevelIteration": true` in your TypeScript config.
    ...defaultModules,
    [PNotifyConfirm, {
      confirm: true,
      buttons: [{
        text: 'Ok',
        primary: true,
        click: (notice: Notice) => notice.close()
      }]
      // ***
      // Notice the type assertion here. It tells TypeScript that the options
      // are for the Confirm module.
      // ***
    }] as ModuleEntry<typeof PNotifyConfirm>,
  ])
});
```

## Desktop Module

Notifications that display even when the web page is not visible. Implements the [Web Notifications spec](http://www.w3.org/TR/notifications/).

If the user's browser doesn't support Web Notifications, or they deny permission to show them, they will see regular in-browser notices, unless `fallback` is false.

```sh
npm install --save-dev @pnotify/desktop
```

```js
import {notice, defaultModules} from '@pnotify/core';
import * as PNotifyDesktop from '@pnotify/desktop';

const myNotice = notice({
  text: "I'm a notice.",
  modules: new Map([
    ...defaultModules,
    [PNotifyDesktop, {
      // Desktop Module Options
    }]
  ])
});
```

`PNotifyDesktop.defaults = {`
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

## Mobile Module

Notices on mobile phones and tablets.

```sh
npm install --save-dev @pnotify/mobile
```

```js
import {notice, defaultModules} from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';

const myNotice = notice({
  text: "I'm a notice.",
  modules: new Map([
    ...defaultModules,
    [PNotifyMobile, {
      // Mobile Module Options
    }]
  ])
});
```

`PNotifyMobile.defaults = {`
* `swipeDismiss: true`<br>
  Let the user swipe the notice away.

`}`

## Countdown Module

Give an indication of how much time is left.

```sh
npm install --save-dev @pnotify/countdown
```

```js
import {notice, defaultModules} from '@pnotify/core';
import * as PNotifyCountdown from '@pnotify/countdown';

const myNotice = notice({
  text: "I'm a notice.",
  modules: new Map([
    ...defaultModules,
    [PNotifyCountdown, {
      // Countdown Module Options
    }]
  ])
});
```

`PNotifyCountdown.defaults = {`
* `anchor: 'bottom'`<br>
  Where the countdown bar should anchor. One of 'top', 'bottom', 'left', or 'right'.
* `reverse: false`<br>
  Whether the countdown shrinks the other way.

`}`

## Animate Module

Fluid CSS animations using [Animate.css](https://daneden.github.io/animate.css/).

```sh
npm install --save-dev @pnotify/animate
```

```js
import {notice, defaultModules} from '@pnotify/core';
import * as PNotifyAnimate from '@pnotify/animate';

const myNotice = notice({
  text: "I'm a notice.",
  modules: new Map([
    ...defaultModules,
    [PNotifyAnimate, {
      // Animate Module Options
    }]
  ])
});
```

`PNotifyAnimate.defaults = {`
* `inClass: null`<br>
  The class to use to animate the notice in. If only one of these is set, it will be used for both.
* `outClass: null`<br>
  The class to use to animate the notice out. If only one of these is set, it will be used for both.

`}`

The Animate module also creates a method, `attention(aniClass, callback)`, on notices which accepts an attention grabber class and an animation completed callback.

## Confirm Module

Confirmation dialogs and prompts.

```sh
npm install --save-dev @pnotify/confirm
```

```js
import {notice, defaultModules} from '@pnotify/core';
import * as PNotifyConfirm from '@pnotify/confirm';

const myNotice = notice({
  text: "I'm a notice.",
  modules: new Map([
    ...defaultModules,
    [PNotifyConfirm, {
      // Confirm Module Options
    }]
  ])
});
```

`PNotifyConfirm.defaults = {`
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
* `align: 'flex-end'`<br>
  Where to align the buttons. (flex-start, center, flex-end, space-around, space-between)

```js
buttons: [
  {
    text: 'Ok',
    primary: true,
    promptTrigger: true,
    click: (notice, value) => {
      notice.close();
      notice.fire('pnotify:confirm', {notice, value});
    }
  },
  {
    text: 'Cancel',
    click: (notice) => {
      notice.close();
      notice.fire('pnotify:cancel', {notice});
    }
  }
]
```
* The buttons to display, and their callbacks. If a button has promptTrigger set to true, it will be triggered when the user hits enter in a prompt (unless they hold shift).

`}`

Because the default buttons fire notice events on confirmation and cancellation, you can listen for them like this:

```js
import { alert } from '@pnotify/core';
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
notice.on('pnotify:confirm', () => {
  // User confirmed, continue here...
});
notice.on('pnotify:cancel', () => {
  // User canceled, continue here...
});
```

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
* `defaults`<br>
  Defaults for options.
* `defaultStack`<br>
  The default stack object.
* `styles`<br>
  Styles objects.
* `icons`<br>
  Icons objects.

# Instance Methods and Properties

* `notice.open(immediate)`<br>
  Open the notice.
* `notice.close(immediate, timerHide, waitAfterward)`<br>
  Close the notice.
* `notice.update(options)`<br>
  Update the notice with new options.
* `notice.on(eventName, callback)`<br>
  Invokes the callback whenever the notice dispatches the event. Callback receives an `event` argument with a `detail` prop. Returns a function that removes the handler when invoked.
* `notice.fire(eventName, detail)`<br>
  Fire an event.
* `notice.getState()`<br>
  Returns the state of the notice. Can be 'waiting', 'opening', 'open', 'closing', or 'closed'.
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

Event objects have a `detail` property that contains information about the event, including a reference to the notice itself.

* `pnotify:init` - Fired upon initialization of a new notice. This event bubbles.
* `pnotify:mount` - Fired when the notice has been mounted into the DOM. This event bubbles.
* `pnotify:update` - Fired when the notice's state changes. Careful, this includes internal state and can be very noisy (don't do anything computationally expensive on this one).
* `pnotify:beforeOpen` - Fired before the notice opens. Use `preventDefault()` on the event to cancel this action.
* `pnotify:afterOpen` - Fired after the notice opens.
* `pnotify:enterModal` - Fired when the notice enters a modal state. (Opens in a modal stack, or a modalish stack that is in modal state.)
* `pnotify:leaveModal` - Fired when the notice leaves a modal state.
* `pnotify:beforeClose` - Fired before the notice closes. Use `preventDefault()` on the event to cancel this action.
* `pnotify:afterClose` - Fired after the notice closes.
* `pnotify:beforeDestroy` - Fired before the notice is destroyed. Use `preventDefault()` on the event to cancel this action.
* `pnotify:afterDestroy` - Fired after the notice is destroyed.

From the [Svelte Component API](https://svelte.dev/docs#Client-side_component_API).

Don't use these. I'm putting them in here to document that you should not use them. That way, if you do, and you file a bug report, I can point to this section in the README, and tell you that you did a bad.

* `notice.$set(options)`<br>
  You should use `update(options)` instead. The Svelte API may change.
* `notice.$on(event, callback)`<br>
  You should use `on(event, callback)` instead. The Svelte API may change.
* `notice.$destroy()`<br>
  You should use `close()` with `destroy: true` instead. It will animate the notice out and remove it from the `stack.notices` array. Removes the component from the DOM and any observers/event listeners.

# Stacks

A stack is an instance of the `Stack` class used to determine where to position notices and how they interact with each other.

```js
import {alert, Stack} from '@pnotify/core';

const myStack = new Stack({
  dir1: 'up'
});

alert({
  text: 'I\'m a notice centered at the bottom!',
  stack: myStack
});
```

Stack options and their defaults:

* `dir1: null`<br>
  The primary stacking direction. Can be `'up'`, `'down'`, `'right'`, or `'left'`.
* `firstpos1: null`<br>
  Number of pixels from the edge of the context, relative to `dir1`, the first notice will appear. If null, the current position of the notice, whatever that is, will be used.
* `spacing1: 25`<br>
  Number of pixels between notices along `dir1`.
* `dir2: null`<br>
  The secondary stacking direction. Should be a perpendicular direction to `dir1`. The notices will continue in this direction when they reach the edge of the viewport along `dir1`.
* `firstpos2: null`<br>
  Number of pixels from the edge of the context, relative to `dir2`, the first notice will appear. If null, the current position of the notice, whatever that is, will be used.
* `spacing2: 25`<br>
  Number of pixels between notices along `dir2`.
* `push: 'bottom'`<br>
  Where, in the stack, to push new notices. Can be `'top'` or `'bottom'`.
* `maxOpen: 1`<br>
  How many notices are allowed to be open in this stack at once.
* `maxStrategy: 'wait'`<br>
  The strategy to use to ensure `maxOpen`. Can be `'wait'`, which will cause new notices to wait their turn, or `'close'`, which will remove the oldest notice to make room for a new one.
* `maxClosureCausesWait: true`<br>
  Whether the notices that are closed to abide by `maxOpen` when `maxStrategy === 'close'` should wait and reopen in turn.
* `modal: 'ish'`<br>
  Whether the stack should be modal (`true`), modeless (`false`), or modalish (`'ish'`). Modalish stacks are cool. See https://sciactive.com/2020/02/11/the-modalish-notification-flow/.
* `modalishFlash: true`<br>
  Whether new notices that start waiting in a modalish stack should flash under the leader notice to show that they have been added.
* `overlayClose: true`<br>
  Whether clicking on the modal overlay should close the stack's notices.
* `overlayClosesPinned: false`<br>
  Whether clicking on the modal to close notices also closes notices that have been pinned (`hide === false`).
* `context: document.body`<br>
  The DOM element this stack's notices should appear in.

Stack behavior:

* If there is no `dir1` property, the notice will be centered in the context.
* If there is a `dir1` and no `dir2`, the notices will be centered along the axis of `dir1`.
* The `firstpos*` values are relative to an edge determined by the corresponding `dir*` value.
  * `dirX === 'up'` means `firstposX` is relative to the **bottom** edge.
  * `dirX === 'down'` means `firstposX` is relative to the **top** edge.
  * `dirX === 'left'` means `firstposX` is relative to the **right** edge.
  * `dirX === 'right'` means `firstposX` is relative to the **left** edge.
* Stacks are independent of each other, so a stack doesn't know and doesn't care if it overlaps (and blocks) another stack.
* Stack objects are used and manipulated by PNotify, and therefore, should likely be a variable when passed. Only use `stack: new Stack({...})` in your options if you intend to have only one notice open like that.

Stack methods:

* `forEach(callback, { start = 'oldest', dir = 'newer', skipModuleHandled = false } = {})`<br>
  Run a callback for all the notices in the stack. `start` can be 'head', 'tail', 'oldest', or 'newest'. `dir` can be 'next', 'prev', 'older', or 'newer'.
* `position()`<br>
  Position all the notices in the stack.
* `queuePosition(milliseconds = 10)`<br>
  Queue a position call in that many milliseconds, unless another one is queued beforehand.
* `close(immediate)`<br>
  Close all the notices in the stack.
* `open(immediate)`<br>
  Open all the notices in the stack.
* `openLast()`<br>
  Open the last closed/closing notice in the stack.

There are other methods on the stack class, but you shouldn't use them. They're meant to be internal, so they begin with an underscore.

Stack properties:

* `stack.notices` - An "array" of notices. It's actually built on the fly from the double linked list the notices are really stored in.
* `stack.length` - How many notices there are in the stack.
* `stack.leader` - When a stack is modalish, this is the notice that is open in the non-modal state.

All of the options are properties as well.

> :warning: Calling something like `alert({text: 'notice', stack: new Stack({dir1: 'down', firstpos1: 25})});` may not do what you want. It will create a notice, but that notice will be in its own stack and will overlap other notices.

## Example Stack

Here is an example stack with comments to explain. You can play with it [here](https://codesandbox.io/s/pnotify-5-example-stack-xgw1z).

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
  * Countdown bar to show time left before notice closes.
* Highly customizable UI.
  * [Modalish](https://sciactive.com/2020/02/11/the-modalish-notification-flow/), modal, and modeless notification flows.
  * Sticky (pinned) notices.
  * Optional close and stick buttons.
  * Supports non-blocking notices for less intrusive use.
  * Notification types: notice, info, success, and error.
  * Stacks allow notices to position together or independently.
  * Control stack direction and push to top or bottom.
  * Confirm dialogs, alert buttons, and prompts.
  * RTL language support.
* Feature rich API.
  * Desktop notifications based on the Web Notifications standard.
  * Dynamically update existing notices.
  * Put text, HTML, or DOM elements in notices.
    * By default, escapes text to prevent XSS attacks.
  * Optional notice history for reshowing old notices.
* Universally compatible.
  * Works with any frontend library (React, Angular, Svelte, Vue, Ember, etc.).
  * Works with bundlers (Webpack, Rollup, etc.).
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
