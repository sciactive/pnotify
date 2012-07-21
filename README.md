Introduction
============

Pines Notify is a JavaScript notification plugin, developed by Hunter Perrin as part of Pines. It is designed to provide an unparalleled level of flexibility, while still being very easy to implement and use.

See http://pinesframework.org/pnotify/ for more information and examples.

Requirements
============

jQuery (1.4 or higher) and either Bootstrap CSS or a jQuery UI Theme.

Getting Started
===============

Pines Notify comes with the following files:

* `jquery.pnotify.js` & `jquery.pnotify.min.js` (Minified) - The main JavaScript. 
* `jquery.pnotify.default.css` - The main stylesheet. 
* `jquery.pnotify.default.icons.css` - Use this to support Pines Icon styles.

So here's how you'd include them all:

	<script type="text/javascript" src="jquery.pnotify.min.js"></script>
	<link href="jquery.pnotify.default.css" media="all" rel="stylesheet" type="text/css" />
	<!-- Include this file if you are using Pines Icons. -->
	<link href="jquery.pnotify.default.icons.css" media="all" rel="stylesheet" type="text/css" />

Now you can use Pines Notify like this:

	<script type="text/javascript">
	$(function(){
		$.pnotify({
			title: 'Regular Notice',
			text: 'Check me out! I\'m a notice.'
		});
	});
	</script>

And if you choose to use jQuery UI for **all** your styling, include this line somewhere before your first notice:
* `$.pnotify.defaults.styling = "jqueryui";`

And if you don't want the history pull-down menu in the top corner, include this line somewhere before your first notice:
* `$.pnotify.defaults.history = false;`

Stacks
======

A stack is an object which Pines Notify uses to determine where to position notices. A stack has two mandatory variables, `dir1` and `dir2`. `dir1` is the first direction in which the notices are stacked. When the notices run out of room in the window, they will move over in the direction specified by `dir2`. The directions can be `"up"`, `"down"`, `"right"`, or `"left"`. Stacks are independent of each other, so a stack doesn't know and doesn't care if it overlaps (and blocks) another stack. The default stack, which can be changed like any other default, goes down, then left. Stack objects are used and manipulated by Pines Notify, and therefore, should be a variable when passed. So, calling something like `$.pnotify({stack: {"dir1": "down", "dir2": "left"}});` will **NOT** work. It will create a notice, but that notice will be in its own stack and may overlap other notices.

Example Stacks
--------------

	var stack_topleft = {"dir1": "down", "dir2": "right", "push": "top"};
	var stack_bottomleft = {"dir1": "right", "dir2": "up", "push": "top"};
	var stack_custom = {"dir1": "right", "dir2": "down"};
	var stack_custom2 = {"dir1": "left", "dir2": "up", "push": "top"};
	var stack_bar_top = {"dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0};
	var stack_bar_bottom = {"dir1": "up", "dir2": "right", "spacing1": 0, "spacing2": 0};

This stack is initially positioned through code instead of CSS.

	var stack_bottomright = {"dir1": "up", "dir2": "left", "firstpos1": 25, "firstpos2": 25};

This is done through two extra variables. `firstpos1` and `firstpos2` are pixel values, relative to a viewport edge. `dir1` and `dir2`, respectively, determine which edge. It is calculated as follows:

* `dir = "up"` - firstpos is relative to the bottom of viewport.
* `dir = "down"` - firstpos is relative to the top of viewport.
* `dir = "right"` - firstpos is relative to the left of viewport.
* `dir = "left"` - firstpos is relative to the right of viewport.

To create a stack in the top left, define the stack:

	var stack_topleft = {"dir1": "down", "dir2": "right"};
		
and then add two options to your pnotify call:
		
	addclass: "stack-topleft", // This is one of the included default classes.
	stack: stack_topleft

There are several CSS classes included which will position your notices for you:

* `stack-topleft`
* `stack-bottomleft`
* `stack-bottomright`

You can create your own custom position and movement by defining a custom stack.

Configuration Defaults / Options
================================

* `title: false` - The notice's title.
* `title_escape: false` - Whether to escape the content of the title. (Not allow HTML.)
* `text: false` - The notice's text.
* `text_escape: false` - Whether to escape the content of the text. (Not allow HTML.)
* `styling: "bootstrap"` - What styling classes to use. (Can be either jqueryui or bootstrap.)
* `addclass: ""` - Additional classes to be added to the notice. (For custom styling.)
* `cornerclass: ""` - Class to be added to the notice for corner styling.
* `nonblock: false` - Create a non-blocking notice. It lets the user click elements underneath it.
* `nonblock_opacity: .2` - The opacity of the notice (if it's non-blocking) when the mouse is over it.
* `history: true` - Display a pull down menu to redisplay previous notices, and place the notice in the history.
* `auto_display: true` - Display the notice when it is created. Turn this off to add notifications to the history without displaying them.
* `width: "300px"` - Width of the notice.
* `min_height: "16px"` - Minimum height of the notice. It will expand to fit content.
* `type: "notice"` - Type of the notice. "notice", "info", "success", or "error".
* `icon: true` - Set icon to true to use the default icon for the selected style/type, false for no icon, or a string for your own icon class.
* `animation: "fade"` - The animation to use when displaying and hiding the notice. "none", "show", "fade", and "slide" are built in to jQuery. Others require jQuery UI. Use an object with effect_in and effect_out to use different effects.
* `animate_speed: "slow"` - Speed at which the notice animates in and out. "slow", "def" or "normal", "fast" or number of milliseconds.
* `opacity: 1` - Opacity of the notice.
* `shadow: true` - Display a drop shadow.
* `closer: true` - Provide a button for the user to manually close the notice.
* `closer_hover: true` - Only show the closer button on hover.
* `sticker: true` - Provide a button for the user to manually stick the notice.
* `sticker_hover: true` - Only show the sticker button on hover.
* `hide: true` - After a delay, remove the notice.
* `delay: 8000` - Delay in milliseconds before the notice is removed.
* `mouse_reset: true` - Reset the hide timer if the mouse moves over the notice.
* `remove: true` - Remove the notice's elements from the DOM after it is removed.
* `insert_brs: true` - Change new lines to br tags.
* `stack: {"dir1": "down", "dir2": "left", "push": "bottom", "spacing1": 25, "spacing2": 25}` - The stack on which the notices will be placed. Also controls the direction the notices stack.

Additional Info
===============

For examples/demos see http://pinesframework.org/pnotify/