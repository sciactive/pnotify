'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var PNotify = function () {
  'use strict';

  function recompute(state, newState, oldState, isInitial) {
    if (isInitial || 'text' in newState && differs(state.text, oldState.text) || 'insert_brs' in newState && differs(state.insert_brs, oldState.insert_brs)) {
      state._text_processed = newState._text_processed = template.computed._text_processed(state.text, state.insert_brs);
    }

    if (isInitial || 'styling' in newState && differs(state.styling, oldState.styling)) {
      state._styles = newState._styles = template.computed._styles(state.styling);
    }
  }

  var template = function () {
    var PNotify = void 0;

    var defaultStack = {
      dir1: "down",
      dir2: "left",
      push: "bottom",
      spacing1: 36,
      spacing2: 36,
      context: window && document.body,
      modal: false
    };
    var posTimer = void 0; // Position all timer.
    // Set global variables.
    var onDocumentLoaded = function onDocumentLoaded() {
      defaultStack.context = document.body;
      // Reposition the notices when the window resizes.
      window.addEventListener('resize', function () {
        if (posTimer) {
          clearTimeout(posTimer);
        }
        posTimer = setTimeout(function () {
          PNotify.positionAll(true);
        }, 10);
      });
    };
    var createStackOverlay = function createStackOverlay(stack) {
      var overlay = document.createElement("div");
      overlay.classList.add("ui-pnotify-modal-overlay");
      stack.context.prependChild(overlay);
      // Close the notices on overlay click.
      overlay.addEventListener('click', function () {
        if (stack.overlay_close) {
          PNotify.removeStack(stack);
        }
      });
      return overlay;
    };

    return {
      setup: function setup(Component) {
        PNotify = Component;
        PNotify.VERSION = "4.0.0";

        PNotify.defaults = {
          // The notice's title.
          title: false,
          // Whether to escape the content of the title. (Not allow HTML.)
          title_escape: false,
          // The notice's text.
          text: false,
          // Whether to escape the content of the text. (Not allow HTML.)
          text_escape: false,
          // What styling classes to use. (Can be either "brighttheme", "bootstrap3", "fontawesome", or a styling object.)
          styling: "brighttheme",
          // Additional classes to be added to the notice. (For custom styling.)
          addclass: "",
          // Class to be added to the notice for corner styling.
          cornerclass: "",
          // Display the notice when it is created.
          auto_display: true,
          // Width of the notice.
          width: "300px",
          // Minimum height of the notice. It will expand to fit content.
          min_height: "16px",
          // Type of the notice. "notice", "info", "success", or "error".
          type: "info",
          // Set icon to true to use the default icon for the selected
          // style/type, false for no icon, or a string for your own icon class.
          icon: true,
          // The animation to use when displaying and hiding the notice. "none"
          // and "fade" are supported through CSS. Others are supported
          // through the Animate module and Animate.css.
          animation: "fade",
          // Speed at which the notice animates in and out. "slow", "normal",
          // or "fast". Respectively, 400ms, 250ms, 100ms.
          animate_speed: "normal",
          // Display a drop shadow.
          shadow: true,
          // After a delay, remove the notice.
          hide: true,
          // Delay in milliseconds before the notice is removed.
          delay: 8000,
          // Reset the hide timer if the mouse moves over the notice.
          mouse_reset: true,
          // Remove the notice's elements from the DOM after it is removed.
          remove: true,
          // Change new lines to br tags.
          insert_brs: true,
          // Whether to remove the notice from the global array when it is closed.
          destroy: true,
          // The stack on which the notices will be placed. Also controls the
          // direction the notices stack.
          stack: defaultStack
        };

        // An array of all active notices.
        PNotify.notices = [];
        // This object holds all the PNotify modules. They are used to provide
        // additional functionality.
        PNotify.modules = {};

        PNotify.alert = function (options) {
          return new PNotify({ target: document.body, data: options });
        };

        PNotify.notice = function (options) {
          options.type = "notice";
          return new PNotify({ target: document.body, data: options });
        };

        PNotify.info = function (options) {
          options.type = "info";
          return new PNotify({ target: document.body, data: options });
        };

        PNotify.success = function (options) {
          options.type = "success";
          return new PNotify({ target: document.body, data: options });
        };

        PNotify.error = function (options) {
          options.type = "error";
          return new PNotify({ target: document.body, data: options });
        };

        PNotify.removeAll = function () {
          for (var i = 0; i < PNotify.notices.length; i++) {
            if (PNotify.notices[i].remove) {
              PNotify.notices[i].remove(false);
            }
          }
        };
        PNotify.removeStack = function (stack) {
          for (var i = 0; i < PNotify.notices.length; i++) {
            if (PNotify.notices[i].remove && PNotify.notices[i].get("stack") === stack) {
              PNotify.notices[i].remove(false);
            }
          }
        };
        PNotify.positionAll = function (animate) {
          // This timer is used for queueing this function so it doesn't run
          // repeatedly.
          if (posTimer) {
            clearTimeout(posTimer);
          }
          posTimer = null;
          // Reset the next position data.
          if (PNotify.notices.length > 0) {
            for (var i = 0; i < PNotify.notices.length; i++) {
              var notice = PNotify.notices[i],
                  s = notice.get("stack");
              if (!s) {
                return;
              }
              if (s.overlay) {
                s.overlay.classList.add("ui-pnotify-modal-overlay-hidden");
              }
              s.nextpos1 = s.firstpos1;
              s.nextpos2 = s.firstpos2;
              s.addpos2 = 0;
              s.animation = animate;
            }
            for (var _i = 0; _i < PNotify.notices.length; _i++) {
              PNotify.notices[_i].position();
            }
          } else {
            delete defaultStack.nextpos1;
            delete defaultStack.nextpos2;
          }
        };

        PNotify.styling = {
          brighttheme: {
            // Bright Theme doesn't require any UI libraries.
            container: "brighttheme",
            notice: "brighttheme-notice",
            notice_icon: "brighttheme-icon-notice",
            info: "brighttheme-info",
            info_icon: "brighttheme-icon-info",
            success: "brighttheme-success",
            success_icon: "brighttheme-icon-success",
            error: "brighttheme-error",
            error_icon: "brighttheme-icon-error"
          },
          bootstrap3: {
            container: "alert",
            notice: "alert-warning",
            notice_icon: "glyphicon glyphicon-exclamation-sign",
            info: "alert-info",
            info_icon: "glyphicon glyphicon-info-sign",
            success: "alert-success",
            success_icon: "glyphicon glyphicon-ok-sign",
            error: "alert-danger",
            error_icon: "glyphicon glyphicon-warning-sign"
          }
        };
        /*
         * uses icons from http://fontawesome.io/
         * version 4.0.3
         */
        PNotify.styling.fontawesome = _extends({}, PNotify.styling.bootstrap3);
        _extends(PNotify.styling.fontawesome, {
          notice_icon: "fa fa-exclamation-circle",
          info_icon: "fa fa-info",
          success_icon: "fa fa-check",
          error_icon: "fa fa-warning"
        });

        if (window && document.body) {
          onDocumentLoaded();
        } else {
          document.addEventListener("DOMContentLoaded", onDocumentLoaded);
        }
      },

      oncreate: function oncreate() {
        // We don't want our module objects all referencing the main object.
        var modules = {};
        for (var m in PNotify.modules) {
          modules[m] = _extends({}, PNotify.modules[m]);
        }
        this.set({ "_modules": modules });

        // Add the notice to the notice array.
        if (this.get("stack").push === "top") {
          PNotify.notices.splice(0, 0, this);
          // Now position all the notices if they are to push to the top.
          this.queuePosition(false, 1);
        } else {
          PNotify.notices.push(this);
        }

        // Mark the stack so it won't animate the new notice.
        this.get("stack").animation = false;

        // Run the modules.
        this.runModules('init');

        // We're now initialized, but haven't been opened yet.
        this.set({ "_state": "closed" });

        // Display the notice.
        if (this.get("auto_display")) {
          this.open();
        }
      },
      data: function data() {
        return _extends({
          "_state": "initializing", // The state can be "initializing", "opening", "open", "closing", and "closed".
          "_timer": null, // Auto close timer.
          "_animTimer": null, // Animation timer.
          "_animating": false, // Stores what is currently being animated (in or out).
          "_animatingClass": "", // Stores the class that adds entry/exit animation effects.
          "_moveClass": "", // Stores the class that adds movement animation effects.
          "_timerHide": false // Stores whether the notice was hidden by a timer.
        }, PNotify.defaults);
      },


      computed: {
        _text_processed: function _text_processed(text, insert_brs) {
          return insert_brs ? String(text).replace(/\n/g, '<br />') : text;
        },
        _styles: function _styles(styling) {
          return (typeof styling === 'undefined' ? 'undefined' : _typeof(styling)) === "object" ? styling : PNotify.styling[styling];
        }
      },

      methods: {
        // This runs an event on all the modules.
        runModules: function runModules(event, arg) {
          var modules = this.get("_modules");
          for (var module in modules) {
            var curArg = (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === "object" && module in arg ? arg[module] : arg;
            if (typeof modules[module][event] === 'function') {
              modules[module].notice = this;
              modules[module].options = _typeof(this.get("modules")[module]) === 'object' ? this.get("modules")[module] : {};
              modules[module][event](this, _typeof(this.get("modules")[module]) === 'object' ? this.get("modules")[module] : {}, curArg);
            }
          }
        },
        update: function update(options) {
          // Save old options.
          var oldHide = this.get("hide");

          // Run the modules.
          this.runModules('update', options);

          this.set(options);

          // Update the timed hiding.
          if (!this.get("hide")) {
            this.cancelRemove();
          } else if (!oldHide) {
            this.queueRemove();
          }
          this.queuePosition(true);

          return this;
        },
        mouseenter: function mouseenter(e) {
          // Stop animation, reset the removal timer when the user mouses over.
          if (this.get("mouse_reset") && this.get("_animating") === "out") {
            if (!this.get("_timerHide")) {
              return;
            }
            this.cancelRemove();
          }
          // Stop the close timer.
          if (this.get("hide") && this.get("mouse_reset")) {
            this.cancelRemove();
          }
        },
        mouseleave: function mouseleave(e) {
          // Start the close timer.
          if (this.get("hide") && this.get("mouse_reset") && this.get("_animating") !== "out") {
            this.queueRemove();
          }
          PNotify.positionAll();
        },


        // Display the notice.
        open: function open() {
          var _this = this;

          this.set({ "_state": "opening" });
          // Run the modules.
          this.runModules('beforeOpen');

          var stack = this.get("stack");
          // If the notice is not in the DOM, append it.
          if (!this.refs.elem.parentNode) {
            if (stack.context) {
              stack.context.appendChild(this.refs.elem);
            } else if (document.body) {
              document.body.appendChild(this.refs.elem);
            } else {
              throw new Error("No context to open this notice in.");
            }
          }
          // Try to put it in the right position.
          if (stack.push !== "top") {
            this.position(true);
          }
          this.animateIn(function () {
            _this.queuePosition(true);

            // Now set it to hide.
            if (_this.get("hide")) {
              _this.queueRemove();
            }

            _this.set({ "_state": "open" });

            // Run the modules.
            _this.runModules('afterOpen');
          });

          return this;
        },


        // Remove the notice.
        remove: function remove(timerHide) {
          var _this2 = this;

          this.set({ "_state": "closing", "_timerHide": !!timerHide }); // Make sure it's a boolean.
          // Run the modules.
          this.runModules('beforeClose');

          if (this.get("_timer") && clearTimeout) {
            clearTimeout(this.get("_timer"));
            this.set({ "_timer": null });
          }
          this.animateOut(function () {
            _this2.set({ "_state": "closed" });
            // Run the modules.
            _this2.runModules('afterClose');
            _this2.queuePosition(true);
            // If we're supposed to remove the notice from the DOM, do it.
            if (_this2.get("remove")) {
              _this2.refs.elem.parentNode.removeChild(_this2.refs.elem);
            }
            // Run the modules.
            _this2.runModules('beforeDestroy');
            // Remove object from PNotify.notices to prevent memory leak (issue #49)
            // unless destroy is off
            if (_this2.get("destroy")) {
              if (PNotify.notices !== null) {
                var idx = PNotify.notices.indexOf(_this2);
                if (idx !== -1) {
                  PNotify.notices.splice(idx, 1);
                }
              }
            }
            // Run the modules.
            _this2.runModules('afterDestroy');
          });

          return this;
        },


        // Animate the notice in.
        animateIn: function animateIn(callback) {
          var _this3 = this;

          // Declare that the notice is animating in.
          this.set({ "_animating": "in" });
          var finished = function finished() {
            _this3.refs.elem.removeEventListener('transitionend', finished);
            if (_this3.get("_animTimer")) {
              clearTimeout(_this3.get("_animTimer"));
            }
            if (_this3.get("_animating") !== "in") {
              return;
            }
            var visible = false;
            var boundingRect = _this3.refs.elem.getBoundingClientRect();
            for (var prop in boundingRect) {
              if (boundingRect[prop] > 0) {
                visible = true;
                break;
              }
            }
            if (visible) {
              if (callback) {
                callback.call();
              }
              // Declare that the notice has completed animating.
              _this3.set({ "_animating": false });
            } else {
              _this3.set({ "_animTimer": setTimeout(finished, 40) });
            }
          };

          if (this.get("animation") === "fade") {
            this.refs.elem.addEventListener('transitionend', finished);
            this.set({ "_animatingClass": "ui-pnotify-in" });
            this.refs.elem.style.opacity; // This line is necessary for some reason. Some notices don't fade without it.
            this.set({ "_animatingClass": "ui-pnotify-in ui-pnotify-fade-in" });
            // Just in case the event doesn't fire, call it after 650 ms.
            this.set({ "_animTimer": setTimeout(finished, 650) });
          } else {
            this.set({ "_animatingClass": "ui-pnotify-in" });
            finished();
          }
        },


        // Animate the notice out.
        animateOut: function animateOut(callback) {
          var _this4 = this;

          // Declare that the notice is animating out.
          this.set({ "_animating": "out" });
          var finished = function finished() {
            _this4.refs.elem.removeEventListener('transitionend', finished);
            if (_this4.get("_animTimer")) {
              clearTimeout(_this4.get("_animTimer"));
            }
            if (_this4.get("_animating") !== "out") {
              return;
            }
            var visible = false;
            var boundingRect = _this4.refs.elem.getBoundingClientRect();
            for (var prop in boundingRect) {
              if (boundingRect[prop] > 0) {
                visible = true;
                break;
              }
            }
            if (_this4.refs.elem.style.opacity == "0" || !visible) {
              _this4.set({ "_animatingClass": "" });
              var stack = _this4.get("stack");
              if (stack.overlay) {
                // Go through the modal stack to see if any are left open.
                // TODO: Rewrite this cause it sucks.
                var stillOpen = false;
                for (var i = 0; i < PNotify.notices.length; i++) {
                  var notice = PNotify.notices[i];
                  if (notice != _this4 && notice.get("stack") === stack && notice.get("_state") !== "closed") {
                    stillOpen = true;
                    break;
                  }
                }
                if (!stillOpen) {
                  stack.overlay.classList.add("ui-pnotify-modal-overlay-hidden");
                }
              }
              if (callback) {
                callback.call();
              }
              // Declare that the notice has completed animating.
              _this4.set({ "_animating": false });
            } else {
              // In case this was called before the notice finished animating.
              _this4.set({ "_animTimer": setTimeout(finished, 40) });
            }
          };

          if (this.get("animation") === "fade") {
            this.refs.elem.addEventListener('transitionend', finished);
            this.set({ "_animatingClass": "ui-pnotify-in" });
            // Just in case the event doesn't fire, call it after 650 ms.
            this.set({ "_animTimer": setTimeout(finished, 650) });
          } else {
            this.set({ "_animatingClass": "" });
            finished();
          }
        },


        // Position the notice. dont_skip_hidden causes the notice to
        // position even if it's not visible.
        position: function position(dontSkipHidden) {
          // Get the notice's stack.
          var stack = this.get("stack"),
              elem = this.refs.elem;
          if (!stack) {
            return;
          }
          if (!stack.context) {
            stack.context = document.body;
          }
          if (typeof stack.nextpos1 !== "number") {
            stack.nextpos1 = stack.firstpos1;
          }
          if (typeof stack.nextpos2 !== "number") {
            stack.nextpos2 = stack.firstpos2;
          }
          if (typeof stack.addpos2 !== "number") {
            stack.addpos2 = 0;
          }
          var hidden = !elem.classList.contains("ui-pnotify-in");
          // Skip this notice if it's not shown.
          if (!hidden || dontSkipHidden) {
            if (stack.modal) {
              if (stack.overlay) {
                stack.overlay.classList.remove("ui-pnotify-modal-overlay-hidden");
              } else {
                stack.overlay = createStackOverlay(stack);
              }
            }
            // Add animate class by default.
            this.set({ "_moveClass": "ui-pnotify-move" });
            var curpos1 = void 0,
                curpos2 = void 0;
            // Calculate the current pos1 value.
            var csspos1 = void 0;
            switch (stack.dir1) {
              case "down":
                csspos1 = "top";
                break;
              case "up":
                csspos1 = "bottom";
                break;
              case "left":
                csspos1 = "right";
                break;
              case "right":
                csspos1 = "left";
                break;
            }
            curpos1 = parseInt(elem.style[csspos1].replace(/(?:\..*|[^0-9.])/g, ''));
            if (isNaN(curpos1)) {
              curpos1 = 0;
            }
            // Remember the first pos1, so the first visible notice goes there.
            if (typeof stack.firstpos1 === "undefined" && !hidden) {
              stack.firstpos1 = curpos1;
              stack.nextpos1 = stack.firstpos1;
            }
            // Calculate the current pos2 value.
            var csspos2 = void 0;
            switch (stack.dir2) {
              case "down":
                csspos2 = "top";
                break;
              case "up":
                csspos2 = "bottom";
                break;
              case "left":
                csspos2 = "right";
                break;
              case "right":
                csspos2 = "left";
                break;
            }
            curpos2 = parseInt(elem.style[csspos2].replace(/(?:\..*|[^0-9.])/g, ''));
            if (isNaN(curpos2)) {
              curpos2 = 0;
            }
            // Remember the first pos2, so the first visible notice goes there.
            if (typeof stack.firstpos2 === "undefined" && !hidden) {
              stack.firstpos2 = curpos2;
              stack.nextpos2 = stack.firstpos2;
            }
            // Check that it's not beyond the viewport edge.
            var boundingRect = elem.getBoundingClientRect();
            if (stack.dir1 === "down" && stack.nextpos1 + boundingRect.height > (stack.context === document.body ? window.innerHeight : stack.context.scrollHeight) || stack.dir1 === "up" && stack.nextpos1 + boundingRect.height > (stack.context === document.body ? window.innerHeight : stack.context.scrollHeight) || stack.dir1 === "left" && stack.nextpos1 + boundingRect.width > (stack.context === document.body ? window.innerWidth : stack.context.scrollWidth) || stack.dir1 === "right" && stack.nextpos1 + boundingRect.width > (stack.context === document.body ? window.innerWidth : stack.context.scrollWidth)) {
              // If it is, it needs to go back to the first pos1, and over on pos2.
              stack.nextpos1 = stack.firstpos1;
              stack.nextpos2 += stack.addpos2 + (typeof stack.spacing2 === "undefined" ? 25 : stack.spacing2);
              stack.addpos2 = 0;
            }
            if (typeof stack.nextpos2 === "number") {
              if (!stack.animation) {
                this.set({ "_moveClass": "" });
                elem.style[csspos2] = stack.nextpos2 + "px";
                elem.style[csspos2]; // Read from the DOM for update.
                this.set({ "_moveClass": "ui-pnotify-move" });
              } else {
                elem.style[csspos2] = stack.nextpos2 + "px";
              }
            }
            // Keep track of the widest/tallest notice in the column/row, so we can push the next column/row.
            switch (stack.dir2) {
              case "down":
              case "up":
                if (elem.offsetHeight + parseFloat(elem.style.marginTop, 10) + parseFloat(elem.style.marginBottom, 10) > stack.addpos2) {
                  stack.addpos2 = boundingRect.height;
                }
                break;
              case "left":
              case "right":
                if (elem.offsetWidth + parseFloat(elem.style.marginLeft, 10) + parseFloat(elem.style.marginRight, 10) > stack.addpos2) {
                  stack.addpos2 = boundingRect.width;
                }
                break;
            }
            // Move the notice on dir1.
            if (typeof stack.nextpos1 === "number") {
              if (!stack.animation) {
                this.set({ "_moveClass": "" });
                elem.style[csspos1] = stack.nextpos1 + "px";
                elem.style[csspos1]; // Read from the DOM for update.
                this.set({ "_moveClass": "ui-pnotify-move" });
              } else {
                elem.style[csspos1] = stack.nextpos1 + "px";
              }
            }
            // Calculate the next dir1 position.
            switch (stack.dir1) {
              case "down":
              case "up":
                stack.nextpos1 += boundingRect.height + (typeof stack.spacing1 === "undefined" ? 25 : stack.spacing1);
                break;
              case "left":
              case "right":
                stack.nextpos1 += boundingRect.width + (typeof stack.spacing1 === "undefined" ? 25 : stack.spacing1);
                break;
            }
          }
          return this;
        },


        // Queue the position all function so it doesn't run repeatedly and
        // use up resources.
        queuePosition: function queuePosition(animate, milliseconds) {
          if (posTimer) {
            clearTimeout(posTimer);
          }
          if (!milliseconds) {
            milliseconds = 10;
          }
          posTimer = setTimeout(function () {
            PNotify.positionAll(animate);
          }, milliseconds);
          return this;
        },


        // Cancel any pending removal timer.
        cancelRemove: function cancelRemove() {
          if (this.get("_timer")) {
            clearTimeout(this.get("_timer"));
          }
          if (this.get("_animTimer")) {
            clearTimeout(this.get("_animTimer"));
          }
          if (this.get("_state") === "closing") {
            // If it's animating out, stop it.
            this.set({
              "_state": "open",
              "_animating": false,
              "_animatingClass": this.get("animation") === "fade" ? "ui-pnotify-in ui-pnotify-fade-in" : "ui-pnotify-in"
            });
          }
          return this;
        },


        // Queue a removal timer.
        queueRemove: function queueRemove() {
          var _this5 = this;

          // Cancel any current removal timer.
          this.cancelRemove();
          this.set({
            "_timer": setTimeout(function () {
              return _this5.remove(true);
            }, isNaN(this.get("delay")) ? 0 : this.get("delay"))
          });
          return this;
        }
      }
    };
  }();

  function encapsulateStyles(node) {
    setAttribute(node, 'svelte-1191067480', '');
  }

  function add_css() {
    var style = createElement('style');
    style.id = 'svelte-1191067480-style';
    style.textContent = "[svelte-1191067480].ui-pnotify,[svelte-1191067480] .ui-pnotify{top:36px;right:36px;position:absolute;height:auto;z-index:2;display:none}body[svelte-1191067480] > .ui-pnotify,[svelte-1191067480] body > .ui-pnotify{position:fixed;z-index:100040}[svelte-1191067480].ui-pnotify.ui-pnotify-in,[svelte-1191067480] .ui-pnotify.ui-pnotify-in{display:block}[svelte-1191067480].ui-pnotify.ui-pnotify-move,[svelte-1191067480] .ui-pnotify.ui-pnotify-move{transition:left .5s ease, top .5s ease, right .5s ease, bottom .5s ease}[svelte-1191067480].ui-pnotify.ui-pnotify-fade-slow,[svelte-1191067480] .ui-pnotify.ui-pnotify-fade-slow{transition:opacity .4s linear;opacity:0}[svelte-1191067480].ui-pnotify.ui-pnotify-fade-slow.ui-pnotify.ui-pnotify-move,[svelte-1191067480] .ui-pnotify.ui-pnotify-fade-slow.ui-pnotify.ui-pnotify-move{transition:opacity .4s linear, left .5s ease, top .5s ease, right .5s ease, bottom .5s ease}[svelte-1191067480].ui-pnotify.ui-pnotify-fade-normal,[svelte-1191067480] .ui-pnotify.ui-pnotify-fade-normal{transition:opacity .25s linear;opacity:0}[svelte-1191067480].ui-pnotify.ui-pnotify-fade-normal.ui-pnotify.ui-pnotify-move,[svelte-1191067480] .ui-pnotify.ui-pnotify-fade-normal.ui-pnotify.ui-pnotify-move{transition:opacity .25s linear, left .5s ease, top .5s ease, right .5s ease, bottom .5s ease}[svelte-1191067480].ui-pnotify.ui-pnotify-fade-fast,[svelte-1191067480] .ui-pnotify.ui-pnotify-fade-fast{transition:opacity .1s linear;opacity:0}[svelte-1191067480].ui-pnotify.ui-pnotify-fade-fast.ui-pnotify.ui-pnotify-move,[svelte-1191067480] .ui-pnotify.ui-pnotify-fade-fast.ui-pnotify.ui-pnotify-move{transition:opacity .1s linear, left .5s ease, top .5s ease, right .5s ease, bottom .5s ease}[svelte-1191067480].ui-pnotify.ui-pnotify-fade-in,[svelte-1191067480] .ui-pnotify.ui-pnotify-fade-in{opacity:1}[svelte-1191067480].ui-pnotify .ui-pnotify-shadow,[svelte-1191067480] .ui-pnotify .ui-pnotify-shadow{-webkit-box-shadow:0px 6px 28px 0px rgba(0,0,0,0.1);-moz-box-shadow:0px 6px 28px 0px rgba(0,0,0,0.1);box-shadow:0px 6px 28px 0px rgba(0,0,0,0.1)}[svelte-1191067480].ui-pnotify-container,[svelte-1191067480] .ui-pnotify-container{background-position:0 0;padding:.8em;height:100%;margin:0}[svelte-1191067480].ui-pnotify-container:after,[svelte-1191067480] .ui-pnotify-container:after{content:\" \";visibility:hidden;display:block;height:0;clear:both}[svelte-1191067480].ui-pnotify-container.ui-pnotify-sharp,[svelte-1191067480] .ui-pnotify-container.ui-pnotify-sharp{-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}[svelte-1191067480].ui-pnotify-title,[svelte-1191067480] .ui-pnotify-title{display:block;margin-bottom:.4em;margin-top:0}[svelte-1191067480].ui-pnotify-text,[svelte-1191067480] .ui-pnotify-text{display:block}[svelte-1191067480].ui-pnotify-icon,[svelte-1191067480] .ui-pnotify-icon,[svelte-1191067480].ui-pnotify-icon span,[svelte-1191067480] .ui-pnotify-icon span{display:block;float:left;margin-right:.2em}[svelte-1191067480].ui-pnotify.stack-topleft,[svelte-1191067480] .ui-pnotify.stack-topleft,[svelte-1191067480].ui-pnotify.stack-bottomleft,[svelte-1191067480] .ui-pnotify.stack-bottomleft{left:25px;right:auto}[svelte-1191067480].ui-pnotify.stack-bottomright,[svelte-1191067480] .ui-pnotify.stack-bottomright,[svelte-1191067480].ui-pnotify.stack-bottomleft,[svelte-1191067480] .ui-pnotify.stack-bottomleft{bottom:25px;top:auto}[svelte-1191067480].ui-pnotify.stack-modal,[svelte-1191067480] .ui-pnotify.stack-modal{left:50%;right:auto;margin-left:-150px}[svelte-1191067480].ui-pnotify-modal-overlay,[svelte-1191067480] .ui-pnotify-modal-overlay{background-color:rgba(0, 0, 0, .4);top:0;left:0;position:absolute;height:100%;width:100%;z-index:1}body[svelte-1191067480] > .ui-pnotify-modal-overlay,[svelte-1191067480] body > .ui-pnotify-modal-overlay{position:fixed;z-index:100039}[svelte-1191067480].ui-pnotify-modal-overlay-hidden,[svelte-1191067480] .ui-pnotify-modal-overlay-hidden{display:none}";
    appendNode(style, document.head);
  }

  function create_main_fragment(state, component) {
    var div, div_class_value, div_style_value, div_1, div_1_class_value, text, h4, h4_style_value, text_2, div_2, div_2_style_value;

    function mouseenter_handler(event) {
      component.mouseenter(event);
    }

    function mouseleave_handler(event) {
      component.mouseleave(event);
    }

    var if_block = state.icon !== false && create_if_block(state, component);

    var current_block_type = select_block_type(state);
    var if_block_1 = current_block_type(state, component);

    var current_block_type_1 = select_block_type_1(state);
    var if_block_2 = current_block_type_1(state, component);

    return {
      create: function create() {
        div = createElement('div');
        div_1 = createElement('div');
        if (if_block) if_block.create();
        text = createText("\n    ");
        h4 = createElement('h4');
        if_block_1.create();
        text_2 = createText("\n    ");
        div_2 = createElement('div');
        if_block_2.create();
        this.hydrate();
      },

      hydrate: function hydrate(nodes) {
        encapsulateStyles(div);
        div.className = div_class_value = "ui-pnotify " + state.addclass + " " + state._animatingClass + " " + state._moveClass + " " + (state.animation === 'fade' ? 'ui-pnotify-fade-' + state.animate_speed : '');
        div.style.cssText = div_style_value = "\n      " + (typeof state.width === 'string' ? 'width: ' + state.width + ';' : '') + "\n      " + (typeof state.min_height === 'string' ? 'min-height: ' + state.min_height + ';' : '') + "\n    ";
        setAttribute(div, 'aria-live', "assertive");
        setAttribute(div, 'aria-role', "alertdialog");
        addListener(div, 'mouseenter', mouseenter_handler);
        addListener(div, 'mouseleave', mouseleave_handler);
        div_1.className = div_1_class_value = "ui-pnotify-container " + state._styles.container + " " + state._styles[state.type] + " " + state.cornerclass + " " + (state.shadow ? 'ui-pnotify-shadow' : '');
        setAttribute(div_1, 'role', "alert");
        h4.className = "ui-pnotify-title";
        h4.style.cssText = h4_style_value = "display: " + (state.title === false ? 'none' : 'block');
        div_2.className = "ui-pnotify-text";
        div_2.style.cssText = div_2_style_value = "display: " + (state.text === false ? 'none' : 'block');
        setAttribute(div_2, 'aria-role', "alert");
      },

      mount: function mount(target, anchor) {
        insertNode(div, target, anchor);
        component.refs.elem = div;
        appendNode(div_1, div);
        component.refs.container = div_1;
        if (if_block) if_block.mount(div_1, null);
        appendNode(text, div_1);
        appendNode(h4, div_1);
        component.refs.titleContainer = h4;
        if_block_1.mount(h4, null);
        appendNode(text_2, div_1);
        appendNode(div_2, div_1);
        component.refs.textContainer = div_2;
        if_block_2.mount(div_2, null);
      },

      update: function update(changed, state) {
        if (div_class_value !== (div_class_value = "ui-pnotify " + state.addclass + " " + state._animatingClass + " " + state._moveClass + " " + (state.animation === 'fade' ? 'ui-pnotify-fade-' + state.animate_speed : ''))) {
          div.className = div_class_value;
        }

        if (div_style_value !== (div_style_value = "\n      " + (typeof state.width === 'string' ? 'width: ' + state.width + ';' : '') + "\n      " + (typeof state.min_height === 'string' ? 'min-height: ' + state.min_height + ';' : '') + "\n    ")) {
          div.style.cssText = div_style_value;
        }

        if (div_1_class_value !== (div_1_class_value = "ui-pnotify-container " + state._styles.container + " " + state._styles[state.type] + " " + state.cornerclass + " " + (state.shadow ? 'ui-pnotify-shadow' : ''))) {
          div_1.className = div_1_class_value;
        }

        if (state.icon !== false) {
          if (if_block) {
            if_block.update(changed, state);
          } else {
            if_block = create_if_block(state, component);
            if_block.create();
            if_block.mount(div_1, text);
          }
        } else if (if_block) {
          if_block.unmount();
          if_block.destroy();
          if_block = null;
        }

        if (h4_style_value !== (h4_style_value = "display: " + (state.title === false ? 'none' : 'block'))) {
          h4.style.cssText = h4_style_value;
        }

        if (current_block_type === (current_block_type = select_block_type(state)) && if_block_1) {
          if_block_1.update(changed, state);
        } else {
          if_block_1.unmount();
          if_block_1.destroy();
          if_block_1 = current_block_type(state, component);
          if_block_1.create();
          if_block_1.mount(h4, null);
        }

        if (div_2_style_value !== (div_2_style_value = "display: " + (state.text === false ? 'none' : 'block'))) {
          div_2.style.cssText = div_2_style_value;
        }

        if (current_block_type_1 === (current_block_type_1 = select_block_type_1(state)) && if_block_2) {
          if_block_2.update(changed, state);
        } else {
          if_block_2.unmount();
          if_block_2.destroy();
          if_block_2 = current_block_type_1(state, component);
          if_block_2.create();
          if_block_2.mount(div_2, null);
        }
      },

      unmount: function unmount() {
        detachNode(div);
        if (if_block) if_block.unmount();
        if_block_1.unmount();
        if_block_2.unmount();
      },

      destroy: function destroy() {
        removeListener(div, 'mouseenter', mouseenter_handler);
        removeListener(div, 'mouseleave', mouseleave_handler);
        if (component.refs.elem === div) component.refs.elem = null;
        if (component.refs.container === div_1) component.refs.container = null;
        if (if_block) if_block.destroy();
        if (component.refs.titleContainer === h4) component.refs.titleContainer = null;
        if_block_1.destroy();
        if (component.refs.textContainer === div_2) component.refs.textContainer = null;
        if_block_2.destroy();
      }
    };
  }

  function create_if_block(state, component) {
    var div, span, span_class_value;

    return {
      create: function create() {
        div = createElement('div');
        span = createElement('span');
        this.hydrate();
      },

      hydrate: function hydrate(nodes) {
        div.className = "ui-pnotify-icon";
        span.className = span_class_value = state.icon === true ? state._styles[state.type + '_icon'] : state.icon;
      },

      mount: function mount(target, anchor) {
        insertNode(div, target, anchor);
        appendNode(span, div);
      },

      update: function update(changed, state) {
        if (span_class_value !== (span_class_value = state.icon === true ? state._styles[state.type + '_icon'] : state.icon)) {
          span.className = span_class_value;
        }
      },

      unmount: function unmount() {
        detachNode(div);
      },

      destroy: noop
    };
  }

  function create_if_block_1(state, component) {
    var text_value, text;

    return {
      create: function create() {
        text = createText(text_value = state.title);
      },

      mount: function mount(target, anchor) {
        insertNode(text, target, anchor);
      },

      update: function update(changed, state) {
        if (text_value !== (text_value = state.title)) {
          text.data = text_value;
        }
      },

      unmount: function unmount() {
        detachNode(text);
      },

      destroy: noop
    };
  }

  function create_if_block_2(state, component) {
    var raw_value, raw_before, raw_after;

    return {
      create: function create() {
        raw_before = createElement('noscript');
        raw_after = createElement('noscript');
      },

      mount: function mount(target, anchor) {
        insertNode(raw_before, target, anchor);
        insertNode(raw_after, target, anchor);
        raw_before.insertAdjacentHTML('afterend', raw_value = state.title);
      },

      update: function update(changed, state) {
        if (raw_value !== (raw_value = state.title)) {
          detachBetween(raw_before, raw_after);
          raw_before.insertAdjacentHTML('afterend', raw_value = state.title);
        }
      },

      unmount: function unmount() {
        detachBetween(raw_before, raw_after);

        detachNode(raw_before);
        detachNode(raw_after);
      },

      destroy: noop
    };
  }

  function create_if_block_3(state, component) {
    var text_value, text;

    return {
      create: function create() {
        text = createText(text_value = state.text);
      },

      mount: function mount(target, anchor) {
        insertNode(text, target, anchor);
      },

      update: function update(changed, state) {
        if (text_value !== (text_value = state.text)) {
          text.data = text_value;
        }
      },

      unmount: function unmount() {
        detachNode(text);
      },

      destroy: noop
    };
  }

  function create_if_block_4(state, component) {
    var raw_value, raw_before, raw_after;

    return {
      create: function create() {
        raw_before = createElement('noscript');
        raw_after = createElement('noscript');
      },

      mount: function mount(target, anchor) {
        insertNode(raw_before, target, anchor);
        insertNode(raw_after, target, anchor);
        raw_before.insertAdjacentHTML('afterend', raw_value = state._text_processed);
      },

      update: function update(changed, state) {
        if (raw_value !== (raw_value = state._text_processed)) {
          detachBetween(raw_before, raw_after);
          raw_before.insertAdjacentHTML('afterend', raw_value = state._text_processed);
        }
      },

      unmount: function unmount() {
        detachBetween(raw_before, raw_after);

        detachNode(raw_before);
        detachNode(raw_after);
      },

      destroy: noop
    };
  }

  function select_block_type(state) {
    if (state.title_escape) return create_if_block_1;
    return create_if_block_2;
  }

  function select_block_type_1(state) {
    if (state.text_escape) return create_if_block_3;
    return create_if_block_4;
  }

  function PNotify(options) {
    options = options || {};
    this.refs = {};
    this._state = assign(template.data(), options.data);
    recompute(this._state, this._state, {}, true);

    this._observers = {
      pre: Object.create(null),
      post: Object.create(null)
    };

    this._handlers = Object.create(null);

    this._root = options._root || this;
    this._yield = options._yield;

    this._destroyed = false;
    if (!document.getElementById('svelte-1191067480-style')) add_css();

    var oncreate = template.oncreate.bind(this);

    if (!options._root) {
      this._oncreate = [oncreate];
    } else {
      this._root._oncreate.push(oncreate);
    }

    this._fragment = create_main_fragment(this._state, this);

    if (options.target) {
      this._fragment.create();
      this._fragment.mount(options.target, null);
    }

    if (!options._root) {
      callAll(this._oncreate);
    }
  }

  assign(PNotify.prototype, template.methods, {
    get: get,
    fire: fire,
    observe: observe,
    on: on,
    set: set
  });

  PNotify.prototype._set = function _set(newState) {
    var oldState = this._state;
    this._state = assign({}, oldState, newState);
    recompute(this._state, newState, oldState, false);
    dispatchObservers(this, this._observers.pre, newState, oldState);
    this._fragment.update(newState, this._state);
    dispatchObservers(this, this._observers.post, newState, oldState);
  };

  PNotify.prototype.teardown = PNotify.prototype.destroy = function destroy(detach) {
    if (this._destroyed) return;
    this.fire('destroy');

    if (detach !== false) this._fragment.unmount();
    this._fragment.destroy();
    this._fragment = null;

    this._state = {};
    this._destroyed = true;
  };

  template.setup(PNotify);

  function differs(a, b) {
    return a !== b || a && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' || typeof a === 'function';
  }

  function setAttribute(node, attribute, value) {
    node.setAttribute(attribute, value);
  }

  function createElement(name) {
    return document.createElement(name);
  }

  function appendNode(node, target) {
    target.appendChild(node);
  }

  function createText(data) {
    return document.createTextNode(data);
  }

  function addListener(node, event, handler) {
    node.addEventListener(event, handler, false);
  }

  function insertNode(node, target, anchor) {
    target.insertBefore(node, anchor);
  }

  function detachNode(node) {
    node.parentNode.removeChild(node);
  }

  function removeListener(node, event, handler) {
    node.removeEventListener(event, handler, false);
  }

  function noop() {}

  function detachBetween(before, after) {
    while (before.nextSibling && before.nextSibling !== after) {
      before.parentNode.removeChild(before.nextSibling);
    }
  }

  function assign(target) {
    var k,
        source,
        i = 1,
        len = arguments.length;
    for (; i < len; i++) {
      source = arguments[i];
      for (k in source) {
        target[k] = source[k];
      }
    }

    return target;
  }

  function callAll(fns) {
    while (fns && fns.length) {
      fns.pop()();
    }
  }

  function get(key) {
    return key ? this._state[key] : this._state;
  }

  function fire(eventName, data) {
    var handlers = eventName in this._handlers && this._handlers[eventName].slice();
    if (!handlers) return;

    for (var i = 0; i < handlers.length; i += 1) {
      handlers[i].call(this, data);
    }
  }

  function observe(key, callback, options) {
    var group = options && options.defer ? this._observers.post : this._observers.pre;

    (group[key] || (group[key] = [])).push(callback);

    if (!options || options.init !== false) {
      callback.__calling = true;
      callback.call(this, this._state[key]);
      callback.__calling = false;
    }

    return {
      cancel: function cancel() {
        var index = group[key].indexOf(callback);
        if (~index) group[key].splice(index, 1);
      }
    };
  }

  function on(eventName, handler) {
    if (eventName === 'teardown') return this.on('destroy', handler);

    var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
    handlers.push(handler);

    return {
      cancel: function cancel() {
        var index = handlers.indexOf(handler);
        if (~index) handlers.splice(index, 1);
      }
    };
  }

  function set(newState) {
    this._set(assign({}, newState));
    if (this._root._lock) return;
    this._root._lock = true;
    callAll(this._root._beforecreate);
    callAll(this._root._oncreate);
    callAll(this._root._aftercreate);
    this._root._lock = false;
  }

  function dispatchObservers(component, group, newState, oldState) {
    for (var key in group) {
      if (!(key in newState)) continue;

      var newValue = newState[key];
      var oldValue = oldState[key];

      if (differs(newValue, oldValue)) {
        var callbacks = group[key];
        if (!callbacks) continue;

        for (var i = 0; i < callbacks.length; i += 1) {
          var callback = callbacks[i];
          if (callback.__calling) continue;

          callback.__calling = true;
          callback.call(component, newValue, oldValue);
          callback.__calling = false;
        }
      }
    }
  }

  return PNotify;
}();
//# sourceMappingURL=PNotify.js.map