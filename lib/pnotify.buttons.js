'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Buttons
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as a module.
    define('pnotify.buttons', ['jquery', 'pnotify'], factory);
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
    // CommonJS
    module.exports = factory(require('jquery'), require('./pnotify'));
  } else {
    // Browser globals
    factory(root.jQuery, root.PNotify);
  }
})(typeof window !== "undefined" ? window : undefined, function ($, PNotify) {
  PNotify.prototype.options.buttons = {
    // Provide a button for the user to manually close the notice.
    closer: true,
    // Only show the closer button on hover.
    closer_hover: true,
    // Provide a button for the user to manually stick the notice.
    sticker: true,
    // Only show the sticker button on hover.
    sticker_hover: true,
    // Show the buttons even when the nonblock module is in use.
    show_on_nonblock: false,
    // The various displayed text, helps facilitating internationalization.
    labels: {
      close: "Close",
      stick: "Stick",
      unstick: "Unstick"
    },
    // The classes to use for button icons. Leave them null to use the classes from the styling you're using.
    classes: {
      closer: null,
      pin_up: null,
      pin_down: null
    }
  };
  PNotify.prototype.modules.buttons = {
    init: function init(notice, options) {
      var that = this;
      notice.elem.on({
        "mouseenter": function mouseenter(e) {
          // Show the buttons.
          if (that.options.sticker && (!(notice.options.nonblock && notice.options.nonblock.nonblock) || that.options.show_on_nonblock)) {
            that.sticker.trigger("pnotify:buttons:toggleStick").css("visibility", "visible");
          }
          if (that.options.closer && (!(notice.options.nonblock && notice.options.nonblock.nonblock) || that.options.show_on_nonblock)) {
            that.closer.css("visibility", "visible");
          }
        },
        "mouseleave": function mouseleave(e) {
          // Hide the buttons.
          if (that.options.sticker_hover) {
            that.sticker.css("visibility", "hidden");
          }
          if (that.options.closer_hover) {
            that.closer.css("visibility", "hidden");
          }
        }
      });

      // Provide a button to stick the notice.
      this.sticker = $("<div />", {
        "class": "ui-pnotify-sticker",
        "aria-role": "button",
        "aria-pressed": notice.options.hide ? "false" : "true",
        "tabindex": "0",
        "title": notice.options.hide ? options.labels.stick : options.labels.unstick,
        "css": {
          "cursor": "pointer",
          "visibility": options.sticker_hover ? "hidden" : "visible"
        },
        "click": function click() {
          notice.options.hide = !notice.options.hide;
          if (notice.options.hide) {
            notice.queueRemove();
          } else {
            notice.cancelRemove();
          }
          $(this).trigger("pnotify:buttons:toggleStick");
        }
      }).bind("pnotify:buttons:toggleStick", function () {
        var pin_up = that.options.classes.pin_up === null ? notice.styles.pin_up : that.options.classes.pin_up;
        var pin_down = that.options.classes.pin_down === null ? notice.styles.pin_down : that.options.classes.pin_down;
        $(this).attr("title", notice.options.hide ? that.options.labels.stick : that.options.labels.unstick).children().attr("class", "").addClass(notice.options.hide ? pin_up : pin_down).attr("aria-pressed", notice.options.hide ? "false" : "true");
      }).append("<span />").trigger("pnotify:buttons:toggleStick").prependTo(notice.container);
      if (!options.sticker || notice.options.nonblock && notice.options.nonblock.nonblock && !options.show_on_nonblock) {
        this.sticker.css("display", "none");
      }

      // Provide a button to close the notice.
      this.closer = $("<div />", {
        "class": "ui-pnotify-closer",
        "aria-role": "button",
        "tabindex": "0",
        "title": options.labels.close,
        "css": { "cursor": "pointer", "visibility": options.closer_hover ? "hidden" : "visible" },
        "click": function click() {
          notice.remove(false);
          that.sticker.css("visibility", "hidden");
          that.closer.css("visibility", "hidden");
        }
      }).append($("<span />", { "class": options.classes.closer === null ? notice.styles.closer : options.classes.closer })).prependTo(notice.container);
      if (!options.closer || notice.options.nonblock && notice.options.nonblock.nonblock && !options.show_on_nonblock) {
        this.closer.css("display", "none");
      }
    },
    update: function update(notice, options) {
      // Update the sticker and closer buttons.
      if (!options.closer || notice.options.nonblock && notice.options.nonblock.nonblock && !options.show_on_nonblock) {
        this.closer.css("display", "none");
      } else if (options.closer) {
        this.closer.css("display", "block");
      }
      if (!options.sticker || notice.options.nonblock && notice.options.nonblock.nonblock && !options.show_on_nonblock) {
        this.sticker.css("display", "none");
      } else if (options.sticker) {
        this.sticker.css("display", "block");
      }
      // Update the sticker icon.
      this.sticker.trigger("pnotify:buttons:toggleStick");
      // Update the close icon.
      this.closer.find("span").attr("class", "").addClass(options.classes.closer === null ? notice.styles.closer : options.classes.closer);
      // Update the hover status of the buttons.
      if (options.sticker_hover) {
        this.sticker.css("visibility", "hidden");
      } else if (!(notice.options.nonblock && notice.options.nonblock.nonblock && !options.show_on_nonblock)) {
        this.sticker.css("visibility", "visible");
      }
      if (options.closer_hover) {
        this.closer.css("visibility", "hidden");
      } else if (!(notice.options.nonblock && notice.options.nonblock.nonblock && !options.show_on_nonblock)) {
        this.closer.css("visibility", "visible");
      }
    }
  };
  $.extend(PNotify.styling.brighttheme, {
    closer: "brighttheme-icon-closer",
    pin_up: "brighttheme-icon-sticker",
    pin_down: "brighttheme-icon-sticker brighttheme-icon-stuck"
  });
  $.extend(PNotify.styling.bootstrap3, {
    closer: "glyphicon glyphicon-remove",
    pin_up: "glyphicon glyphicon-pause",
    pin_down: "glyphicon glyphicon-play"
  });
  $.extend(PNotify.styling.fontawesome, {
    closer: "fa fa-times",
    pin_up: "fa fa-pause",
    pin_down: "fa fa-play"
  });
  return PNotify;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBub3RpZnkuYnV0dG9ucy5qcyJdLCJuYW1lcyI6WyJyb290IiwiZmFjdG9yeSIsImRlZmluZSIsImFtZCIsImV4cG9ydHMiLCJtb2R1bGUiLCJyZXF1aXJlIiwialF1ZXJ5IiwiUE5vdGlmeSIsIndpbmRvdyIsIiQiLCJwcm90b3R5cGUiLCJvcHRpb25zIiwiYnV0dG9ucyIsImNsb3NlciIsImNsb3Nlcl9ob3ZlciIsInN0aWNrZXIiLCJzdGlja2VyX2hvdmVyIiwic2hvd19vbl9ub25ibG9jayIsImxhYmVscyIsImNsb3NlIiwic3RpY2siLCJ1bnN0aWNrIiwiY2xhc3NlcyIsInBpbl91cCIsInBpbl9kb3duIiwibW9kdWxlcyIsImluaXQiLCJub3RpY2UiLCJ0aGF0IiwiZWxlbSIsIm9uIiwiZSIsIm5vbmJsb2NrIiwidHJpZ2dlciIsImNzcyIsImhpZGUiLCJxdWV1ZVJlbW92ZSIsImNhbmNlbFJlbW92ZSIsImJpbmQiLCJzdHlsZXMiLCJhdHRyIiwiY2hpbGRyZW4iLCJhZGRDbGFzcyIsImFwcGVuZCIsInByZXBlbmRUbyIsImNvbnRhaW5lciIsInJlbW92ZSIsInVwZGF0ZSIsImZpbmQiLCJleHRlbmQiLCJzdHlsaW5nIiwiYnJpZ2h0dGhlbWUiLCJib290c3RyYXAzIiwiZm9udGF3ZXNvbWUiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNDLFdBQVVBLElBQVYsRUFBZ0JDLE9BQWhCLEVBQXlCO0FBQ3hCLE1BQUksT0FBT0MsTUFBUCxLQUFrQixVQUFsQixJQUFnQ0EsT0FBT0MsR0FBM0MsRUFBZ0Q7QUFDOUM7QUFDQUQsV0FBTyxpQkFBUCxFQUEwQixDQUFDLFFBQUQsRUFBVyxTQUFYLENBQTFCLEVBQWlERCxPQUFqRDtBQUNELEdBSEQsTUFHTyxJQUFJLFFBQU9HLE9BQVAseUNBQU9BLE9BQVAsT0FBbUIsUUFBbkIsSUFBK0IsT0FBT0MsTUFBUCxLQUFrQixXQUFyRCxFQUFrRTtBQUN2RTtBQUNBQSxXQUFPRCxPQUFQLEdBQWlCSCxRQUFRSyxR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QUh5QixHQUFyQztBQUtBZixJQUFFd0MsTUFBRixDQUFTMUMsUUFBUTJDLE9BQVIsQ0FBZ0JHLFdBQXpCLEVBQXNDO0FBQ3BDeEMsWUFBUSxhQUQ0QjtBQUVwQ1UsWUFBUSxhQUY0QjtBQUdwQ0MsY0FBVTtBQUgwQixHQUF0QztBQUtBLFNBQU9qQixPQUFQO0FBQ0QsQ0FsS0EsQ0FBRCIsImZpbGUiOiJzcmMvcG5vdGlmeS5idXR0b25zLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEJ1dHRvbnNcbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhIG1vZHVsZS5cbiAgICBkZWZpbmUoJ3Bub3RpZnkuYnV0dG9ucycsIFsnanF1ZXJ5JywgJ3Bub3RpZnknXSwgZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JyksIHJlcXVpcmUoJy4vcG5vdGlmeScpKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbHNcbiAgICBmYWN0b3J5KHJvb3QualF1ZXJ5LCByb290LlBOb3RpZnkpO1xuICB9XG59KHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB0aGlzLCBmdW5jdGlvbigkLCBQTm90aWZ5KXtcbiAgUE5vdGlmeS5wcm90b3R5cGUub3B0aW9ucy5idXR0b25zID0ge1xuICAgIC8vIFByb3ZpZGUgYSBidXR0b24gZm9yIHRoZSB1c2VyIHRvIG1hbnVhbGx5IGNsb3NlIHRoZSBub3RpY2UuXG4gICAgY2xvc2VyOiB0cnVlLFxuICAgIC8vIE9ubHkgc2hvdyB0aGUgY2xvc2VyIGJ1dHRvbiBvbiBob3Zlci5cbiAgICBjbG9zZXJfaG92ZXI6IHRydWUsXG4gICAgLy8gUHJvdmlkZSBhIGJ1dHRvbiBmb3IgdGhlIHVzZXIgdG8gbWFudWFsbHkgc3RpY2sgdGhlIG5vdGljZS5cbiAgICBzdGlja2VyOiB0cnVlLFxuICAgIC8vIE9ubHkgc2hvdyB0aGUgc3RpY2tlciBidXR0b24gb24gaG92ZXIuXG4gICAgc3RpY2tlcl9ob3ZlcjogdHJ1ZSxcbiAgICAvLyBTaG93IHRoZSBidXR0b25zIGV2ZW4gd2hlbiB0aGUgbm9uYmxvY2sgbW9kdWxlIGlzIGluIHVzZS5cbiAgICBzaG93X29uX25vbmJsb2NrOiBmYWxzZSxcbiAgICAvLyBUaGUgdmFyaW91cyBkaXNwbGF5ZWQgdGV4dCwgaGVscHMgZmFjaWxpdGF0aW5nIGludGVybmF0aW9uYWxpemF0aW9uLlxuICAgIGxhYmVsczoge1xuICAgICAgY2xvc2U6IFwiQ2xvc2VcIixcbiAgICAgIHN0aWNrOiBcIlN0aWNrXCIsXG4gICAgICB1bnN0aWNrOiBcIlVuc3RpY2tcIlxuICAgIH0sXG4gICAgLy8gVGhlIGNsYXNzZXMgdG8gdXNlIGZvciBidXR0b24gaWNvbnMuIExlYXZlIHRoZW0gbnVsbCB0byB1c2UgdGhlIGNsYXNzZXMgZnJvbSB0aGUgc3R5bGluZyB5b3UncmUgdXNpbmcuXG4gICAgY2xhc3Nlczoge1xuICAgICAgY2xvc2VyOiBudWxsLFxuICAgICAgcGluX3VwOiBudWxsLFxuICAgICAgcGluX2Rvd246IG51bGxcbiAgICB9XG4gIH07XG4gIFBOb3RpZnkucHJvdG90eXBlLm1vZHVsZXMuYnV0dG9ucyA9IHtcbiAgICBpbml0OiBmdW5jdGlvbihub3RpY2UsIG9wdGlvbnMpe1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgbm90aWNlLmVsZW0ub24oe1xuICAgICAgICBcIm1vdXNlZW50ZXJcIjogZnVuY3Rpb24oZSl7XG4gICAgICAgICAgLy8gU2hvdyB0aGUgYnV0dG9ucy5cbiAgICAgICAgICBpZiAodGhhdC5vcHRpb25zLnN0aWNrZXIgJiYgKCEobm90aWNlLm9wdGlvbnMubm9uYmxvY2sgJiYgbm90aWNlLm9wdGlvbnMubm9uYmxvY2subm9uYmxvY2spIHx8IHRoYXQub3B0aW9ucy5zaG93X29uX25vbmJsb2NrKSkge1xuICAgICAgICAgICAgdGhhdC5zdGlja2VyLnRyaWdnZXIoXCJwbm90aWZ5OmJ1dHRvbnM6dG9nZ2xlU3RpY2tcIikuY3NzKFwidmlzaWJpbGl0eVwiLCBcInZpc2libGVcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGF0Lm9wdGlvbnMuY2xvc2VyICYmICghKG5vdGljZS5vcHRpb25zLm5vbmJsb2NrICYmIG5vdGljZS5vcHRpb25zLm5vbmJsb2NrLm5vbmJsb2NrKSB8fCB0aGF0Lm9wdGlvbnMuc2hvd19vbl9ub25ibG9jaykpIHtcbiAgICAgICAgICAgIHRoYXQuY2xvc2VyLmNzcyhcInZpc2liaWxpdHlcIiwgXCJ2aXNpYmxlXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJtb3VzZWxlYXZlXCI6IGZ1bmN0aW9uKGUpe1xuICAgICAgICAgIC8vIEhpZGUgdGhlIGJ1dHRvbnMuXG4gICAgICAgICAgaWYgKHRoYXQub3B0aW9ucy5zdGlja2VyX2hvdmVyKSB7XG4gICAgICAgICAgICB0aGF0LnN0aWNrZXIuY3NzKFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoYXQub3B0aW9ucy5jbG9zZXJfaG92ZXIpIHtcbiAgICAgICAgICAgIHRoYXQuY2xvc2VyLmNzcyhcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gUHJvdmlkZSBhIGJ1dHRvbiB0byBzdGljayB0aGUgbm90aWNlLlxuICAgICAgdGhpcy5zdGlja2VyID0gJChcIjxkaXYgLz5cIiwge1xuICAgICAgICBcImNsYXNzXCI6IFwidWktcG5vdGlmeS1zdGlja2VyXCIsXG4gICAgICAgIFwiYXJpYS1yb2xlXCI6IFwiYnV0dG9uXCIsXG4gICAgICAgIFwiYXJpYS1wcmVzc2VkXCI6IG5vdGljZS5vcHRpb25zLmhpZGUgPyBcImZhbHNlXCIgOiBcInRydWVcIixcbiAgICAgICAgXCJ0YWJpbmRleFwiOiBcIjBcIixcbiAgICAgICAgXCJ0aXRsZVwiOiBub3RpY2Uub3B0aW9ucy5oaWRlID8gb3B0aW9ucy5sYWJlbHMuc3RpY2sgOiBvcHRpb25zLmxhYmVscy51bnN0aWNrLFxuICAgICAgICBcImNzc1wiOiB7XG4gICAgICAgICAgXCJjdXJzb3JcIjogXCJwb2ludGVyXCIsXG4gICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IG9wdGlvbnMuc3RpY2tlcl9ob3ZlciA/IFwiaGlkZGVuXCIgOiBcInZpc2libGVcIlxuICAgICAgICB9LFxuICAgICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgbm90aWNlLm9wdGlvbnMuaGlkZSA9ICFub3RpY2Uub3B0aW9ucy5oaWRlO1xuICAgICAgICAgIGlmIChub3RpY2Uub3B0aW9ucy5oaWRlKSB7XG4gICAgICAgICAgICBub3RpY2UucXVldWVSZW1vdmUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm90aWNlLmNhbmNlbFJlbW92ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKHRoaXMpLnRyaWdnZXIoXCJwbm90aWZ5OmJ1dHRvbnM6dG9nZ2xlU3RpY2tcIik7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuYmluZChcInBub3RpZnk6YnV0dG9uczp0b2dnbGVTdGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgcGluX3VwID0gdGhhdC5vcHRpb25zLmNsYXNzZXMucGluX3VwID09PSBudWxsID8gbm90aWNlLnN0eWxlcy5waW5fdXAgOiB0aGF0Lm9wdGlvbnMuY2xhc3Nlcy5waW5fdXA7XG4gICAgICAgIHZhciBwaW5fZG93biA9IHRoYXQub3B0aW9ucy5jbGFzc2VzLnBpbl9kb3duID09PSBudWxsID8gbm90aWNlLnN0eWxlcy5waW5fZG93biA6IHRoYXQub3B0aW9ucy5jbGFzc2VzLnBpbl9kb3duO1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgIC5hdHRyKFwidGl0bGVcIiwgbm90aWNlLm9wdGlvbnMuaGlkZSA/IHRoYXQub3B0aW9ucy5sYWJlbHMuc3RpY2sgOiB0aGF0Lm9wdGlvbnMubGFiZWxzLnVuc3RpY2spXG4gICAgICAgIC5jaGlsZHJlbigpXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJcIilcbiAgICAgICAgLmFkZENsYXNzKG5vdGljZS5vcHRpb25zLmhpZGUgPyBwaW5fdXAgOiBwaW5fZG93bilcbiAgICAgICAgLmF0dHIoXCJhcmlhLXByZXNzZWRcIiwgbm90aWNlLm9wdGlvbnMuaGlkZSA/IFwiZmFsc2VcIiA6IFwidHJ1ZVwiKTtcbiAgICAgIH0pXG4gICAgICAuYXBwZW5kKFwiPHNwYW4gLz5cIilcbiAgICAgIC50cmlnZ2VyKFwicG5vdGlmeTpidXR0b25zOnRvZ2dsZVN0aWNrXCIpXG4gICAgICAucHJlcGVuZFRvKG5vdGljZS5jb250YWluZXIpO1xuICAgICAgaWYgKCFvcHRpb25zLnN0aWNrZXIgfHwgKG5vdGljZS5vcHRpb25zLm5vbmJsb2NrICYmIG5vdGljZS5vcHRpb25zLm5vbmJsb2NrLm5vbmJsb2NrICYmICFvcHRpb25zLnNob3dfb25fbm9uYmxvY2spKSB7XG4gICAgICAgIHRoaXMuc3RpY2tlci5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgICAgIH1cblxuICAgICAgLy8gUHJvdmlkZSBhIGJ1dHRvbiB0byBjbG9zZSB0aGUgbm90aWNlLlxuICAgICAgdGhpcy5jbG9zZXIgPSAkKFwiPGRpdiAvPlwiLCB7XG4gICAgICAgIFwiY2xhc3NcIjogXCJ1aS1wbm90aWZ5LWNsb3NlclwiLFxuICAgICAgICBcImFyaWEtcm9sZVwiOiBcImJ1dHRvblwiLFxuICAgICAgICBcInRhYmluZGV4XCI6IFwiMFwiLFxuICAgICAgICBcInRpdGxlXCI6IG9wdGlvbnMubGFiZWxzLmNsb3NlLFxuICAgICAgICBcImNzc1wiOiB7XCJjdXJzb3JcIjogXCJwb2ludGVyXCIsIFwidmlzaWJpbGl0eVwiOiBvcHRpb25zLmNsb3Nlcl9ob3ZlciA/IFwiaGlkZGVuXCIgOiBcInZpc2libGVcIn0sXG4gICAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24oKXtcbiAgICAgICAgICBub3RpY2UucmVtb3ZlKGZhbHNlKTtcbiAgICAgICAgICB0aGF0LnN0aWNrZXIuY3NzKFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtcbiAgICAgICAgICB0aGF0LmNsb3Nlci5jc3MoXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmFwcGVuZCgkKFwiPHNwYW4gLz5cIiwge1wiY2xhc3NcIjogb3B0aW9ucy5jbGFzc2VzLmNsb3NlciA9PT0gbnVsbCA/IG5vdGljZS5zdHlsZXMuY2xvc2VyIDogb3B0aW9ucy5jbGFzc2VzLmNsb3Nlcn0pKVxuICAgICAgLnByZXBlbmRUbyhub3RpY2UuY29udGFpbmVyKTtcbiAgICAgIGlmICghb3B0aW9ucy5jbG9zZXIgfHwgKG5vdGljZS5vcHRpb25zLm5vbmJsb2NrICYmIG5vdGljZS5vcHRpb25zLm5vbmJsb2NrLm5vbmJsb2NrICYmICFvcHRpb25zLnNob3dfb25fbm9uYmxvY2spKSB7XG4gICAgICAgIHRoaXMuY2xvc2VyLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgICAgfVxuICAgIH0sXG4gICAgdXBkYXRlOiBmdW5jdGlvbihub3RpY2UsIG9wdGlvbnMpe1xuICAgICAgLy8gVXBkYXRlIHRoZSBzdGlja2VyIGFuZCBjbG9zZXIgYnV0dG9ucy5cbiAgICAgIGlmICghb3B0aW9ucy5jbG9zZXIgfHwgKG5vdGljZS5vcHRpb25zLm5vbmJsb2NrICYmIG5vdGljZS5vcHRpb25zLm5vbmJsb2NrLm5vbmJsb2NrICYmICFvcHRpb25zLnNob3dfb25fbm9uYmxvY2spKSB7XG4gICAgICAgIHRoaXMuY2xvc2VyLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmNsb3Nlcikge1xuICAgICAgICB0aGlzLmNsb3Nlci5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG4gICAgICB9XG4gICAgICBpZiAoIW9wdGlvbnMuc3RpY2tlciB8fCAobm90aWNlLm9wdGlvbnMubm9uYmxvY2sgJiYgbm90aWNlLm9wdGlvbnMubm9uYmxvY2subm9uYmxvY2sgJiYgIW9wdGlvbnMuc2hvd19vbl9ub25ibG9jaykpIHtcbiAgICAgICAgdGhpcy5zdGlja2VyLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLnN0aWNrZXIpIHtcbiAgICAgICAgdGhpcy5zdGlja2VyLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcbiAgICAgIH1cbiAgICAgIC8vIFVwZGF0ZSB0aGUgc3RpY2tlciBpY29uLlxuICAgICAgdGhpcy5zdGlja2VyLnRyaWdnZXIoXCJwbm90aWZ5OmJ1dHRvbnM6dG9nZ2xlU3RpY2tcIik7XG4gICAgICAvLyBVcGRhdGUgdGhlIGNsb3NlIGljb24uXG4gICAgICB0aGlzLmNsb3Nlci5maW5kKFwic3BhblwiKS5hdHRyKFwiY2xhc3NcIiwgXCJcIikuYWRkQ2xhc3Mob3B0aW9ucy5jbGFzc2VzLmNsb3NlciA9PT0gbnVsbCA/IG5vdGljZS5zdHlsZXMuY2xvc2VyIDogb3B0aW9ucy5jbGFzc2VzLmNsb3Nlcik7XG4gICAgICAvLyBVcGRhdGUgdGhlIGhvdmVyIHN0YXR1cyBvZiB0aGUgYnV0dG9ucy5cbiAgICAgIGlmIChvcHRpb25zLnN0aWNrZXJfaG92ZXIpIHtcbiAgICAgICAgdGhpcy5zdGlja2VyLmNzcyhcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIik7XG4gICAgICB9IGVsc2UgaWYgKCEobm90aWNlLm9wdGlvbnMubm9uYmxvY2sgJiYgbm90aWNlLm9wdGlvbnMubm9uYmxvY2subm9uYmxvY2sgJiYgIW9wdGlvbnMuc2hvd19vbl9ub25ibG9jaykpIHtcbiAgICAgICAgdGhpcy5zdGlja2VyLmNzcyhcInZpc2liaWxpdHlcIiwgXCJ2aXNpYmxlXCIpO1xuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbnMuY2xvc2VyX2hvdmVyKSB7XG4gICAgICAgIHRoaXMuY2xvc2VyLmNzcyhcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIik7XG4gICAgICB9IGVsc2UgaWYgKCEobm90aWNlLm9wdGlvbnMubm9uYmxvY2sgJiYgbm90aWNlLm9wdGlvbnMubm9uYmxvY2subm9uYmxvY2sgJiYgIW9wdGlvbnMuc2hvd19vbl9ub25ibG9jaykpIHtcbiAgICAgICAgdGhpcy5jbG9zZXIuY3NzKFwidmlzaWJpbGl0eVwiLCBcInZpc2libGVcIik7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICAkLmV4dGVuZChQTm90aWZ5LnN0eWxpbmcuYnJpZ2h0dGhlbWUsIHtcbiAgICBjbG9zZXI6IFwiYnJpZ2h0dGhlbWUtaWNvbi1jbG9zZXJcIixcbiAgICBwaW5fdXA6IFwiYnJpZ2h0dGhlbWUtaWNvbi1zdGlja2VyXCIsXG4gICAgcGluX2Rvd246IFwiYnJpZ2h0dGhlbWUtaWNvbi1zdGlja2VyIGJyaWdodHRoZW1lLWljb24tc3R1Y2tcIlxuICB9KTtcbiAgJC5leHRlbmQoUE5vdGlmeS5zdHlsaW5nLmJvb3RzdHJhcDMsIHtcbiAgICBjbG9zZXI6IFwiZ2x5cGhpY29uIGdseXBoaWNvbi1yZW1vdmVcIixcbiAgICBwaW5fdXA6IFwiZ2x5cGhpY29uIGdseXBoaWNvbi1wYXVzZVwiLFxuICAgIHBpbl9kb3duOiBcImdseXBoaWNvbiBnbHlwaGljb24tcGxheVwiXG4gIH0pO1xuICAkLmV4dGVuZChQTm90aWZ5LnN0eWxpbmcuZm9udGF3ZXNvbWUsIHtcbiAgICBjbG9zZXI6IFwiZmEgZmEtdGltZXNcIixcbiAgICBwaW5fdXA6IFwiZmEgZmEtcGF1c2VcIixcbiAgICBwaW5fZG93bjogXCJmYSBmYS1wbGF5XCJcbiAgfSk7XG4gIHJldHVybiBQTm90aWZ5O1xufSkpO1xuIl19