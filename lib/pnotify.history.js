'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// History
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as a module.
    define('pnotify.history', ['jquery', 'pnotify'], factory);
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
    // CommonJS
    module.exports = factory(require('jquery'), require('./pnotify'));
  } else {
    // Browser globals
    factory(root.jQuery, root.PNotify);
  }
})(typeof window !== "undefined" ? window : undefined, function ($, PNotify) {
  var history_menu, history_handle_top;
  $(function () {
    $("body").on("pnotify.history-all", function () {
      // Display all notices. (Disregarding non-history notices.)
      $.each(PNotify.notices, function () {
        if (this.modules.history.inHistory) {
          if (this.elem.is(":visible")) {
            // The hide variable controls whether the history pull down should
            // queue a removal timer.
            if (this.options.hide) this.queueRemove();
          } else if (this.open) this.open();
        }
      });
    }).on("pnotify.history-last", function () {
      var pushTop = PNotify.prototype.options.stack.push === "top";

      // Look up the last history notice, and display it.
      var i = pushTop ? 0 : -1;

      var notice;
      do {
        if (i === -1) notice = PNotify.notices.slice(i);else notice = PNotify.notices.slice(i, i + 1);
        if (!notice[0]) return false;

        i = pushTop ? i + 1 : i - 1;
      } while (!notice[0].modules.history.inHistory || notice[0].elem.is(":visible"));
      if (notice[0].open) notice[0].open();
    });
  });
  PNotify.prototype.options.history = {
    // Place the notice in the history.
    history: true,
    // Display a pull down menu to redisplay previous notices.
    menu: false,
    // Make the pull down menu fixed to the top of the viewport.
    fixed: true,
    // Maximum number of notifications to have onscreen.
    maxonscreen: Infinity,
    // The various displayed text, helps facilitating internationalization.
    labels: {
      redisplay: "Redisplay",
      all: "All",
      last: "Last"
    }
  };
  PNotify.prototype.modules.history = {
    init: function init(notice, options) {
      // Make sure that no notices get destroyed.
      notice.options.destroy = false;

      // The history variable controls whether the notice gets redisplayed
      // by the history pull down.
      this.inHistory = options.history;

      if (options.menu) {
        // If there isn't a history pull down, create one.
        if (typeof history_menu === "undefined") {
          history_menu = $("<div />", {
            "class": "ui-pnotify-history-container " + notice.styles.hi_menu,
            "mouseleave": function mouseleave() {
              history_menu.css("top", "-" + history_handle_top + "px");
            }
          }).append($("<div />", { "class": "ui-pnotify-history-header", "text": options.labels.redisplay })).append($("<button />", {
            "class": "ui-pnotify-history-all " + notice.styles.hi_btn,
            "text": options.labels.all,
            "mouseenter": function mouseenter() {
              $(this).addClass(notice.styles.hi_btnhov);
            },
            "mouseleave": function mouseleave() {
              $(this).removeClass(notice.styles.hi_btnhov);
            },
            "click": function click() {
              $(this).trigger("pnotify.history-all");
              return false;
            }
          })).append($("<button />", {
            "class": "ui-pnotify-history-last " + notice.styles.hi_btn,
            "text": options.labels.last,
            "mouseenter": function mouseenter() {
              $(this).addClass(notice.styles.hi_btnhov);
            },
            "mouseleave": function mouseleave() {
              $(this).removeClass(notice.styles.hi_btnhov);
            },
            "click": function click() {
              $(this).trigger("pnotify.history-last");
              return false;
            }
          })).appendTo("body");

          // Make a handle so the user can pull down the history tab.
          var handle = $("<span />", {
            "class": "ui-pnotify-history-pulldown " + notice.styles.hi_hnd,
            "mouseenter": function mouseenter() {
              history_menu.css("top", "0");
            }
          }).appendTo(history_menu);

          // Get the top of the handle.
          history_handle_top = handle.offset().top + 2;
          // Hide the history pull down up to the top of the handle.
          history_menu.css("top", "-" + history_handle_top + "px");

          // Apply the fixed styling.
          if (options.fixed) {
            history_menu.addClass('ui-pnotify-history-fixed');
          }
        }
      }
    },
    update: function update(notice, options) {
      // Update values for history menu access.
      this.inHistory = options.history;
      if (options.fixed && history_menu) {
        history_menu.addClass('ui-pnotify-history-fixed');
      } else if (history_menu) {
        history_menu.removeClass('ui-pnotify-history-fixed');
      }
    },
    beforeOpen: function beforeOpen(notice, options) {
      // Remove oldest notifications leaving only options.maxonscreen on screen
      if (PNotify.notices && PNotify.notices.length > options.maxonscreen) {
        // Oldest are normally in front of array, or if stack.push=="top" then
        // they are at the end of the array! (issue #98)
        var el;
        if (notice.options.stack.push !== "top") {
          el = PNotify.notices.slice(0, PNotify.notices.length - options.maxonscreen);
        } else {
          el = PNotify.notices.slice(options.maxonscreen, PNotify.notices.length);
        }

        $.each(el, function () {
          if (this.remove) {
            this.remove();
          }
        });
      }
    }
  };
  $.extend(PNotify.styling.brighttheme, {
    hi_menu: "ui-pnotify-history-brighttheme",
    hi_btn: "",
    hi_btnhov: "",
    hi_hnd: ""
  });
  $.extend(PNotify.styling.bootstrap3, {
    hi_menu: "well",
    hi_btn: "btn btn-default",
    hi_btnhov: "",
    hi_hnd: "glyphicon glyphicon-chevron-down"
  });
  $.extend(PNotify.styling.fontawesome, {
    hi_menu: "well",
    hi_btn: "btn btn-default",
    hi_btnhov: "",
    hi_hnd: "fa fa-chevron-down"
  });
  return PNotify;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBub3RpZnkuaGlzdG9yeS5qcyJdLCJuYW1lcyI6WyJyb290IiwiZmFjdG9yeSIsImRlZmluZSIsImFtZCIsImV4cG9ydHMiLCJtb2R1bGUiLCJyZXF1aXJlIiwialF1ZXJ5IiwiUE5vdGlmeSIsIndpbmRvdyIsIiQiLCJoaXN0b3J5X21lbnUiLCJoaXN0b3J5X2hhbmRsZV90b3AiLCJvbiIsImVhY2giLCJub3RpY2VzIiwibW9kdWxlcyIsImhpc3RvcnkiLCJpbkhpc3RvcnkiLCJlbGVtIiwiaXMiLCJvcHRpb25zIiwiaGlkZSIsInF1ZXVlUmVtb3ZlIiwib3BlbiIsInB1c2hUb3AiLCJwcm90b3R5cGUiLCJzdGFjayIsInB1c2giLCJpIiwibm90aWNlIiwic2xpY2UiLCJtZW51IiwiZml4ZWQiLCJtYXhvbnNjcmVlbiIsIkluZmluaXR5IiwibGFiZWxzIiwicmVkaXNwbGF5IiwiYWxsIiwibGFzdCIsImluaXQiLCJkZXN0cm95Iiwic3R5bGVzIiwiaGlfbWVudSIsImNzcyIsImFwcGVuZCIsImhpX2J0biIsImFkZENsYXNzIiwiaGlfYnRuaG92IiwicmVtb3ZlQ2xhc3MiLCJ0cmlnZ2VyIiwiYXBwZW5kVG8iLCJoYW5kbGUiLCJoaV9obmQiLCJvZmZzZXQiLCJ0b3AiLCJ1cGRhdGUiLCJiZWZvcmVPcGVuIiwibGVuZ3RoIiwiZWwiLCJyZW1vdmUiLCJleHRlbmQiLCJzdHlsaW5nIiwiYnJpZ2h0dGhlbWUiLCJib290c3RyYXAzIiwiZm9udGF3ZXNvbWUiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNDLFdBQVVBLElBQVYsRUFBZ0JDLE9BQWhCLEVBQXlCO0FBQ3hCLE1BQUksT0FBT0MsTUFBUCxLQUFrQixVQUFsQixJQUFnQ0EsT0FBT0MsR0FBM0MsRUFBZ0Q7QUFDOUM7QUFDQUQsV0FBTyxpQkFBUCxFQUEwQixDQUFDLFFBQUQsRUFBVyxTQUFYLENBQTFCLEVBQWlERCxPQUFqRDtBQUNELEdBSEQsTUFHTyxJQUFJLFFBQU9HLE9BQVAseUNBQU9BLE9B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NEI7QUFHcENFLGVBQVcsRUFIeUI7QUFJcENLLFlBQVE7QUFKNEIsR0FBdEM7QUFNQSxTQUFPN0MsT0FBUDtBQUNELENBdkxBLENBQUQiLCJmaWxlIjoic3JjL3Bub3RpZnkuaGlzdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBIaXN0b3J5XG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYSBtb2R1bGUuXG4gICAgZGVmaW5lKCdwbm90aWZ5Lmhpc3RvcnknLCBbJ2pxdWVyeScsICdwbm90aWZ5J10sIGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ2pxdWVyeScpLCByZXF1aXJlKCcuL3Bub3RpZnknKSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gQnJvd3NlciBnbG9iYWxzXG4gICAgZmFjdG9yeShyb290LmpRdWVyeSwgcm9vdC5QTm90aWZ5KTtcbiAgfVxufSh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdGhpcywgZnVuY3Rpb24oJCwgUE5vdGlmeSl7XG4gIHZhciBoaXN0b3J5X21lbnUsXG4gICAgICBoaXN0b3J5X2hhbmRsZV90b3A7XG4gICQoZnVuY3Rpb24oKXtcbiAgICAkKFwiYm9keVwiKS5vbihcInBub3RpZnkuaGlzdG9yeS1hbGxcIiwgZnVuY3Rpb24oKXtcbiAgICAgIC8vIERpc3BsYXkgYWxsIG5vdGljZXMuIChEaXNyZWdhcmRpbmcgbm9uLWhpc3Rvcnkgbm90aWNlcy4pXG4gICAgICAkLmVhY2goUE5vdGlmeS5ub3RpY2VzLCBmdW5jdGlvbigpe1xuICAgICAgICBpZiAodGhpcy5tb2R1bGVzLmhpc3RvcnkuaW5IaXN0b3J5KSB7XG4gICAgICAgICAgaWYgKHRoaXMuZWxlbS5pcyhcIjp2aXNpYmxlXCIpKSB7XG4gICAgICAgICAgICAvLyBUaGUgaGlkZSB2YXJpYWJsZSBjb250cm9scyB3aGV0aGVyIHRoZSBoaXN0b3J5IHB1bGwgZG93biBzaG91bGRcbiAgICAgICAgICAgIC8vIHF1ZXVlIGEgcmVtb3ZhbCB0aW1lci5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaGlkZSlcbiAgICAgICAgICAgICAgdGhpcy5xdWV1ZVJlbW92ZSgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcGVuKVxuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pLm9uKFwicG5vdGlmeS5oaXN0b3J5LWxhc3RcIiwgZnVuY3Rpb24oKXtcbiAgICAgIHZhciBwdXNoVG9wID0gKFBOb3RpZnkucHJvdG90eXBlLm9wdGlvbnMuc3RhY2sucHVzaCA9PT0gXCJ0b3BcIik7XG5cbiAgICAgIC8vIExvb2sgdXAgdGhlIGxhc3QgaGlzdG9yeSBub3RpY2UsIGFuZCBkaXNwbGF5IGl0LlxuICAgICAgdmFyIGkgPSAocHVzaFRvcCA/IDAgOiAtMSk7XG5cbiAgICAgIHZhciBub3RpY2U7XG4gICAgICBkbyB7XG4gICAgICAgIGlmIChpID09PSAtMSlcbiAgICAgICAgICBub3RpY2UgPSBQTm90aWZ5Lm5vdGljZXMuc2xpY2UoaSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBub3RpY2UgPSBQTm90aWZ5Lm5vdGljZXMuc2xpY2UoaSwgaSsxKTtcbiAgICAgICAgaWYgKCFub3RpY2VbMF0pXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGkgPSAocHVzaFRvcCA/IGkgKyAxIDogaSAtIDEpO1xuICAgICAgfSB3aGlsZSAoIW5vdGljZVswXS5tb2R1bGVzLmhpc3RvcnkuaW5IaXN0b3J5IHx8IG5vdGljZVswXS5lbGVtLmlzKFwiOnZpc2libGVcIikpO1xuICAgICAgaWYgKG5vdGljZVswXS5vcGVuKVxuICAgICAgICBub3RpY2VbMF0ub3BlbigpO1xuICAgIH0pO1xuICB9KTtcbiAgUE5vdGlmeS5wcm90b3R5cGUub3B0aW9ucy5oaXN0b3J5ID0ge1xuICAgIC8vIFBsYWNlIHRoZSBub3RpY2UgaW4gdGhlIGhpc3RvcnkuXG4gICAgaGlzdG9yeTogdHJ1ZSxcbiAgICAvLyBEaXNwbGF5IGEgcHVsbCBkb3duIG1lbnUgdG8gcmVkaXNwbGF5IHByZXZpb3VzIG5vdGljZXMuXG4gICAgbWVudTogZmFsc2UsXG4gICAgLy8gTWFrZSB0aGUgcHVsbCBkb3duIG1lbnUgZml4ZWQgdG8gdGhlIHRvcCBvZiB0aGUgdmlld3BvcnQuXG4gICAgZml4ZWQ6IHRydWUsXG4gICAgLy8gTWF4aW11bSBudW1iZXIgb2Ygbm90aWZpY2F0aW9ucyB0byBoYXZlIG9uc2NyZWVuLlxuICAgIG1heG9uc2NyZWVuOiBJbmZpbml0eSxcbiAgICAvLyBUaGUgdmFyaW91cyBkaXNwbGF5ZWQgdGV4dCwgaGVscHMgZmFjaWxpdGF0aW5nIGludGVybmF0aW9uYWxpemF0aW9uLlxuICAgIGxhYmVsczoge1xuICAgICAgcmVkaXNwbGF5OiBcIlJlZGlzcGxheVwiLFxuICAgICAgYWxsOiBcIkFsbFwiLFxuICAgICAgbGFzdDogXCJMYXN0XCJcbiAgICB9XG4gIH07XG4gIFBOb3RpZnkucHJvdG90eXBlLm1vZHVsZXMuaGlzdG9yeSA9IHtcbiAgICBpbml0OiBmdW5jdGlvbihub3RpY2UsIG9wdGlvbnMpe1xuICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgbm8gbm90aWNlcyBnZXQgZGVzdHJveWVkLlxuICAgICAgbm90aWNlLm9wdGlvbnMuZGVzdHJveSA9IGZhbHNlO1xuXG4gICAgICAvLyBUaGUgaGlzdG9yeSB2YXJpYWJsZSBjb250cm9scyB3aGV0aGVyIHRoZSBub3RpY2UgZ2V0cyByZWRpc3BsYXllZFxuICAgICAgLy8gYnkgdGhlIGhpc3RvcnkgcHVsbCBkb3duLlxuICAgICAgdGhpcy5pbkhpc3RvcnkgPSBvcHRpb25zLmhpc3Rvcnk7XG5cbiAgICAgIGlmIChvcHRpb25zLm1lbnUpIHtcbiAgICAgICAgLy8gSWYgdGhlcmUgaXNuJ3QgYSBoaXN0b3J5IHB1bGwgZG93biwgY3JlYXRlIG9uZS5cbiAgICAgICAgaWYgKHR5cGVvZiBoaXN0b3J5X21lbnUgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBoaXN0b3J5X21lbnUgPSAkKFwiPGRpdiAvPlwiLCB7XG4gICAgICAgICAgICBcImNsYXNzXCI6IFwidWktcG5vdGlmeS1oaXN0b3J5LWNvbnRhaW5lciBcIitub3RpY2Uuc3R5bGVzLmhpX21lbnUsXG4gICAgICAgICAgICBcIm1vdXNlbGVhdmVcIjogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgaGlzdG9yeV9tZW51LmNzcyhcInRvcFwiLCBcIi1cIitoaXN0b3J5X2hhbmRsZV90b3ArXCJweFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5hcHBlbmQoJChcIjxkaXYgLz5cIiwge1wiY2xhc3NcIjogXCJ1aS1wbm90aWZ5LWhpc3RvcnktaGVhZGVyXCIsIFwidGV4dFwiOiBvcHRpb25zLmxhYmVscy5yZWRpc3BsYXl9KSlcbiAgICAgICAgICAuYXBwZW5kKCQoXCI8YnV0dG9uIC8+XCIsIHtcbiAgICAgICAgICAgIFwiY2xhc3NcIjogXCJ1aS1wbm90aWZ5LWhpc3RvcnktYWxsIFwiK25vdGljZS5zdHlsZXMuaGlfYnRuLFxuICAgICAgICAgICAgXCJ0ZXh0XCI6IG9wdGlvbnMubGFiZWxzLmFsbCxcbiAgICAgICAgICAgIFwibW91c2VlbnRlclwiOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKG5vdGljZS5zdHlsZXMuaGlfYnRuaG92KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIm1vdXNlbGVhdmVcIjogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhub3RpY2Uuc3R5bGVzLmhpX2J0bmhvdik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAkKHRoaXMpLnRyaWdnZXIoXCJwbm90aWZ5Lmhpc3RvcnktYWxsXCIpO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkpXG4gICAgICAgICAgLmFwcGVuZCgkKFwiPGJ1dHRvbiAvPlwiLCB7XG4gICAgICAgICAgICBcImNsYXNzXCI6IFwidWktcG5vdGlmeS1oaXN0b3J5LWxhc3QgXCIrbm90aWNlLnN0eWxlcy5oaV9idG4sXG4gICAgICAgICAgICBcInRleHRcIjogb3B0aW9ucy5sYWJlbHMubGFzdCxcbiAgICAgICAgICAgIFwibW91c2VlbnRlclwiOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKG5vdGljZS5zdHlsZXMuaGlfYnRuaG92KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIm1vdXNlbGVhdmVcIjogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhub3RpY2Uuc3R5bGVzLmhpX2J0bmhvdik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAkKHRoaXMpLnRyaWdnZXIoXCJwbm90aWZ5Lmhpc3RvcnktbGFzdFwiKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKVxuICAgICAgICAgIC5hcHBlbmRUbyhcImJvZHlcIik7XG5cbiAgICAgICAgICAvLyBNYWtlIGEgaGFuZGxlIHNvIHRoZSB1c2VyIGNhbiBwdWxsIGRvd24gdGhlIGhpc3RvcnkgdGFiLlxuICAgICAgICAgIHZhciBoYW5kbGUgPSAkKFwiPHNwYW4gLz5cIiwge1xuICAgICAgICAgICAgXCJjbGFzc1wiOiBcInVpLXBub3RpZnktaGlzdG9yeS1wdWxsZG93biBcIitub3RpY2Uuc3R5bGVzLmhpX2huZCxcbiAgICAgICAgICAgIFwibW91c2VlbnRlclwiOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICBoaXN0b3J5X21lbnUuY3NzKFwidG9wXCIsIFwiMFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5hcHBlbmRUbyhoaXN0b3J5X21lbnUpO1xuXG4gICAgICAgICAgLy8gR2V0IHRoZSB0b3Agb2YgdGhlIGhhbmRsZS5cbiAgICAgICAgICBoaXN0b3J5X2hhbmRsZV90b3AgPSBoYW5kbGUub2Zmc2V0KCkudG9wICsgMjtcbiAgICAgICAgICAvLyBIaWRlIHRoZSBoaXN0b3J5IHB1bGwgZG93biB1cCB0byB0aGUgdG9wIG9mIHRoZSBoYW5kbGUuXG4gICAgICAgICAgaGlzdG9yeV9tZW51LmNzcyhcInRvcFwiLCBcIi1cIitoaXN0b3J5X2hhbmRsZV90b3ArXCJweFwiKTtcblxuICAgICAgICAgIC8vIEFwcGx5IHRoZSBmaXhlZCBzdHlsaW5nLlxuICAgICAgICAgIGlmIChvcHRpb25zLmZpeGVkKSB7XG4gICAgICAgICAgICBoaXN0b3J5X21lbnUuYWRkQ2xhc3MoJ3VpLXBub3RpZnktaGlzdG9yeS1maXhlZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgdXBkYXRlOiBmdW5jdGlvbihub3RpY2UsIG9wdGlvbnMpe1xuICAgICAgLy8gVXBkYXRlIHZhbHVlcyBmb3IgaGlzdG9yeSBtZW51IGFjY2Vzcy5cbiAgICAgIHRoaXMuaW5IaXN0b3J5ID0gb3B0aW9ucy5oaXN0b3J5O1xuICAgICAgaWYgKG9wdGlvbnMuZml4ZWQgJiYgaGlzdG9yeV9tZW51KSB7XG4gICAgICAgIGhpc3RvcnlfbWVudS5hZGRDbGFzcygndWktcG5vdGlmeS1oaXN0b3J5LWZpeGVkJyk7XG4gICAgICB9IGVsc2UgaWYgKGhpc3RvcnlfbWVudSkge1xuICAgICAgICBoaXN0b3J5X21lbnUucmVtb3ZlQ2xhc3MoJ3VpLXBub3RpZnktaGlzdG9yeS1maXhlZCcpO1xuICAgICAgfVxuICAgIH0sXG4gICAgYmVmb3JlT3BlbjogZnVuY3Rpb24obm90aWNlLCBvcHRpb25zKXtcbiAgICAgIC8vIFJlbW92ZSBvbGRlc3Qgbm90aWZpY2F0aW9ucyBsZWF2aW5nIG9ubHkgb3B0aW9ucy5tYXhvbnNjcmVlbiBvbiBzY3JlZW5cbiAgICAgIGlmIChQTm90aWZ5Lm5vdGljZXMgJiYgKFBOb3RpZnkubm90aWNlcy5sZW5ndGggPiBvcHRpb25zLm1heG9uc2NyZWVuKSkge1xuICAgICAgICAvLyBPbGRlc3QgYXJlIG5vcm1hbGx5IGluIGZyb250IG9mIGFycmF5LCBvciBpZiBzdGFjay5wdXNoPT1cInRvcFwiIHRoZW5cbiAgICAgICAgLy8gdGhleSBhcmUgYXQgdGhlIGVuZCBvZiB0aGUgYXJyYXkhIChpc3N1ZSAjOTgpXG4gICAgICAgIHZhciBlbDtcbiAgICAgICAgaWYgKG5vdGljZS5vcHRpb25zLnN0YWNrLnB1c2ggIT09IFwidG9wXCIpIHtcbiAgICAgICAgICBlbCA9IFBOb3RpZnkubm90aWNlcy5zbGljZSgwLCBQTm90aWZ5Lm5vdGljZXMubGVuZ3RoIC0gb3B0aW9ucy5tYXhvbnNjcmVlbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWwgPSBQTm90aWZ5Lm5vdGljZXMuc2xpY2Uob3B0aW9ucy5tYXhvbnNjcmVlbiwgUE5vdGlmeS5ub3RpY2VzLmxlbmd0aCk7XG4gICAgICAgIH1cblxuICAgICAgICAkLmVhY2goZWwsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgaWYgKHRoaXMucmVtb3ZlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICAkLmV4dGVuZChQTm90aWZ5LnN0eWxpbmcuYnJpZ2h0dGhlbWUsIHtcbiAgICBoaV9tZW51OiBcInVpLXBub3RpZnktaGlzdG9yeS1icmlnaHR0aGVtZVwiLFxuICAgIGhpX2J0bjogXCJcIixcbiAgICBoaV9idG5ob3Y6IFwiXCIsXG4gICAgaGlfaG5kOiBcIlwiXG4gIH0pO1xuICAkLmV4dGVuZChQTm90aWZ5LnN0eWxpbmcuYm9vdHN0cmFwMywge1xuICAgIGhpX21lbnU6IFwid2VsbFwiLFxuICAgIGhpX2J0bjogXCJidG4gYnRuLWRlZmF1bHRcIixcbiAgICBoaV9idG5ob3Y6IFwiXCIsXG4gICAgaGlfaG5kOiBcImdseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi1kb3duXCJcbiAgfSk7XG4gICQuZXh0ZW5kKFBOb3RpZnkuc3R5bGluZy5mb250YXdlc29tZSwge1xuICAgIGhpX21lbnU6IFwid2VsbFwiLFxuICAgIGhpX2J0bjogXCJidG4gYnRuLWRlZmF1bHRcIixcbiAgICBoaV9idG5ob3Y6IFwiXCIsXG4gICAgaGlfaG5kOiBcImZhIGZhLWNoZXZyb24tZG93blwiXG4gIH0pO1xuICByZXR1cm4gUE5vdGlmeTtcbn0pKTtcbiJdfQ==