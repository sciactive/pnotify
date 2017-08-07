'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Desktop
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as a module.
    define('pnotify.desktop', ['jquery', 'pnotify'], factory);
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
    // CommonJS
    module.exports = factory(require('jquery'), require('./pnotify'));
  } else {
    // Browser globals
    factory(root.jQuery, root.PNotify);
  }
})(typeof window !== "undefined" ? window : undefined, function ($, PNotify) {
  var permission;
  var _notify = function notify(title, options) {
    // Memoize based on feature detection.
    if ("Notification" in window) {
      _notify = function notify(title, options) {
        return new Notification(title, options);
      };
    } else if ("mozNotification" in navigator) {
      _notify = function notify(title, options) {
        // Gecko < 22
        return navigator.mozNotification.createNotification(title, options.body, options.icon).show();
      };
    } else if ("webkitNotifications" in window) {
      _notify = function notify(title, options) {
        return window.webkitNotifications.createNotification(options.icon, title, options.body);
      };
    } else {
      _notify = function notify(title, options) {
        return null;
      };
    }
    return _notify(title, options);
  };

  PNotify.prototype.options.desktop = {
    // Display the notification as a desktop notification.
    desktop: false,
    // If desktop notifications are not supported or allowed, fall back to a regular notice.
    fallback: true,
    // The URL of the icon to display. If false, no icon will show. If null, a default icon will show.
    icon: null,
    // Using a tag lets you update an existing notice, or keep from duplicating notices between tabs.
    // If you leave tag null, one will be generated, facilitating the "update" function.
    // see: http://www.w3.org/TR/notifications/#tags-example
    tag: null,
    // Optionally display a different title for the desktop.
    title: null,
    // Optionally display different text for the desktop.
    text: null
  };
  PNotify.prototype.modules.desktop = {
    genNotice: function genNotice(notice, options) {
      if (options.icon === null) {
        this.icon = "http://sciactive.com/pnotify/includes/desktop/" + notice.options.type + ".png";
      } else if (options.icon === false) {
        this.icon = null;
      } else {
        this.icon = options.icon;
      }
      if (this.tag === null || options.tag !== null) {
        this.tag = options.tag === null ? "PNotify-" + Math.round(Math.random() * 1000000) : options.tag;
      }
      notice.desktop = _notify(options.title || notice.options.title, {
        icon: this.icon,
        body: options.text || notice.options.text,
        tag: this.tag
      });
      if (!("close" in notice.desktop) && "cancel" in notice.desktop) {
        notice.desktop.close = function () {
          notice.desktop.cancel();
        };
      }
      notice.desktop.onclick = function () {
        notice.elem.trigger("click");
      };
      notice.desktop.onclose = function () {
        if (notice.state !== "closing" && notice.state !== "closed") {
          notice.remove();
        }
      };
    },
    init: function init(notice, options) {
      if (!options.desktop) return;
      permission = PNotify.desktop.checkPermission();
      if (permission !== 0) {
        // Keep the notice from opening if fallback is false.
        if (!options.fallback) {
          notice.options.auto_display = false;
        }
        return;
      }
      this.genNotice(notice, options);
    },
    update: function update(notice, options, oldOpts) {
      if (permission !== 0 && options.fallback || !options.desktop) return;
      this.genNotice(notice, options);
    },
    beforeOpen: function beforeOpen(notice, options) {
      if (permission !== 0 && options.fallback || !options.desktop) return;
      notice.elem.css({ 'left': '-10000px' }).removeClass('ui-pnotify-in');
    },
    afterOpen: function afterOpen(notice, options) {
      if (permission !== 0 && options.fallback || !options.desktop) return;
      notice.elem.css({ 'left': '-10000px' }).removeClass('ui-pnotify-in');
      if ("show" in notice.desktop) {
        notice.desktop.show();
      }
    },
    beforeClose: function beforeClose(notice, options) {
      if (permission !== 0 && options.fallback || !options.desktop) return;
      notice.elem.css({ 'left': '-10000px' }).removeClass('ui-pnotify-in');
    },
    afterClose: function afterClose(notice, options) {
      if (permission !== 0 && options.fallback || !options.desktop) return;
      notice.elem.css({ 'left': '-10000px' }).removeClass('ui-pnotify-in');
      if ("close" in notice.desktop) {
        notice.desktop.close();
      }
    }
  };
  PNotify.desktop = {
    permission: function permission() {
      if (typeof Notification !== "undefined" && "requestPermission" in Notification) {
        Notification.requestPermission();
      } else if ("webkitNotifications" in window) {
        window.webkitNotifications.requestPermission();
      }
    },
    checkPermission: function checkPermission() {
      if (typeof Notification !== "undefined" && "permission" in Notification) {
        return Notification.permission === "granted" ? 0 : 1;
      } else if ("webkitNotifications" in window) {
        return window.webkitNotifications.checkPermission() == 0 ? 0 : 1;
      } else {
        return 1;
      }
    }
  };
  permission = PNotify.desktop.checkPermission();
  return PNotify;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBub3RpZnkuZGVza3RvcC5qcyJdLCJuYW1lcyI6WyJyb290IiwiZmFjdG9yeSIsImRlZmluZSIsImFtZCIsImV4cG9ydHMiLCJtb2R1bGUiLCJyZXF1aXJlIiwialF1ZXJ5IiwiUE5vdGlmeSIsIndpbmRvdyIsIiQiLCJwZXJtaXNzaW9uIiwibm90aWZ5IiwidGl0bGUiLCJvcHRpb25zIiwiTm90aWZpY2F0aW9uIiwibmF2aWdhdG9yIiwibW96Tm90aWZpY2F0aW9uIiwiY3JlYXRlTm90aWZpY2F0aW9uIiwiYm9keSIsImljb24iLCJzaG93Iiwid2Via2l0Tm90aWZpY2F0aW9ucyIsInByb3RvdHlwZSIsImRlc2t0b3AiLCJmYWxsYmFjayIsInRhZyIsInRleHQiLCJtb2R1bGVzIiwiZ2VuTm90aWNlIiwibm90aWNlIiwidHlwZSIsIk1hdGgiLCJyb3VuZCIsInJhbmRvbSIsImNsb3NlIiwiY2FuY2VsIiwib25jbGljayIsImVsZW0iLCJ0cmlnZ2VyIiwib25jbG9zZSIsInN0YXRlIiwicmVtb3ZlIiwiaW5pdCIsImNoZWNrUGVybWlzc2lvbiIsImF1dG9fZGlzcGxheSIsInVwZGF0ZSIsIm9sZE9wdHMiLCJiZWZvcmVPcGVuIiwiY3NzIiwicmVtb3ZlQ2xhc3MiLCJhZnRlck9wZW4iLCJiZWZvcmVDbG9zZSIsImFmdGVyQ2xvc2UiLCJyZXF1ZXN0UGVybWlzc2lvbiJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0MsV0FBVUEsSUFBVixFQUFnQkMsT0FBaEIsRUFBeUI7QUFDeEIsTUFBSSxPQUFPQyxNQUFQLEtBQWtCLFVBQWxCLElBQWdDQSxPQUFPQyxHQUEzQyxFQUFnRDtBQUM5QztBQUNBRCxXQUFPLGlCQUFQLEVBQTBCLENBQUMsUUFBRCxFQUFXLFNBQVgsQ0FBMUIsRUFBaURELE9BQWpEO0FBQ0QsR0FIRCxNQUdPLElBQUksUUFBT0csT0FBUCx5Q0FBT0EsT0FBUCxPQUFtQixRQUFuQixJQUErQixPQUFPQyxNQUFQLEtBQWtCLFdBQXJELEVBQWtF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USxJQUFQLENBQVlXLEdBQVosQ0FBZ0IsRUFBQyxRQUFRLFVBQVQsRUFBaEIsRUFBc0NDLFdBQXRDLENBQWtELGVBQWxEO0FBQ0EsVUFBSSxXQUFXcEIsT0FBT04sT0FBdEIsRUFBK0I7QUFDN0JNLGVBQU9OLE9BQVAsQ0FBZVcsS0FBZjtBQUNEO0FBQ0Y7QUExRWlDLEdBQXBDO0FBNEVBM0IsVUFBUWdCLE9BQVIsR0FBa0I7QUFDaEJiLGdCQUFZLHNCQUFVO0FBQ3BCLFVBQUksT0FBT0ksWUFBUCxLQUF3QixXQUF4QixJQUF1Qyx1QkFBdUJBLFlBQWxFLEVBQWdGO0FBQzlFQSxxQkFBYXVDLGlCQUFiO0FBQ0QsT0FGRCxNQUVPLElBQUkseUJBQXlCN0MsTUFBN0IsRUFBcUM7QUFDMUNBLGVBQU9hLG1CQUFQLENBQTJCZ0MsaUJBQTNCO0FBQ0Q7QUFDRixLQVBlO0FBUWhCVixxQkFBaUIsMkJBQVU7QUFDekIsVUFBSSxPQUFPN0IsWUFBUCxLQUF3QixXQUF4QixJQUF1QyxnQkFBZ0JBLFlBQTNELEVBQXlFO0FBQ3ZFLGVBQVFBLGFBQWFKLFVBQWIsS0FBNEIsU0FBNUIsR0FBd0MsQ0FBeEMsR0FBNEMsQ0FBcEQ7QUFDRCxPQUZELE1BRU8sSUFBSSx5QkFBeUJGLE1BQTdCLEVBQXFDO0FBQzFDLGVBQU9BLE9BQU9hLG1CQUFQLENBQTJCc0IsZUFBM0IsTUFBZ0QsQ0FBaEQsR0FBb0QsQ0FBcEQsR0FBd0QsQ0FBL0Q7QUFDRCxPQUZNLE1BRUE7QUFDTCxlQUFPLENBQVA7QUFDRDtBQUNGO0FBaEJlLEdBQWxCO0FBa0JBakMsZUFBYUgsUUFBUWdCLE9BQVIsQ0FBZ0JvQixlQUFoQixFQUFiO0FBQ0EsU0FBT3BDLE9BQVA7QUFDRCxDQTNKQSxDQUFEIiwiZmlsZSI6InNyYy9wbm90aWZ5LmRlc2t0b3AuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVza3RvcFxuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGEgbW9kdWxlLlxuICAgIGRlZmluZSgncG5vdGlmeS5kZXNrdG9wJywgWydqcXVlcnknLCAncG5vdGlmeSddLCBmYWN0b3J5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCdqcXVlcnknKSwgcmVxdWlyZSgnLi9wbm90aWZ5JykpO1xuICB9IGVsc2Uge1xuICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xuICAgIGZhY3Rvcnkocm9vdC5qUXVlcnksIHJvb3QuUE5vdGlmeSk7XG4gIH1cbn0odHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHRoaXMsIGZ1bmN0aW9uKCQsIFBOb3RpZnkpe1xuICB2YXIgcGVybWlzc2lvbjtcbiAgdmFyIG5vdGlmeSA9IGZ1bmN0aW9uKHRpdGxlLCBvcHRpb25zKXtcbiAgICAvLyBNZW1vaXplIGJhc2VkIG9uIGZlYXR1cmUgZGV0ZWN0aW9uLlxuICAgIGlmIChcIk5vdGlmaWNhdGlvblwiIGluIHdpbmRvdykge1xuICAgICAgbm90aWZ5ID0gZnVuY3Rpb24gKHRpdGxlLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgTm90aWZpY2F0aW9uKHRpdGxlLCBvcHRpb25zKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChcIm1vek5vdGlmaWNhdGlvblwiIGluIG5hdmlnYXRvcikge1xuICAgICAgbm90aWZ5ID0gZnVuY3Rpb24gKHRpdGxlLCBvcHRpb25zKSB7XG4gICAgICAgIC8vIEdlY2tvIDwgMjJcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5tb3pOb3RpZmljYXRpb25cbiAgICAgICAgICAuY3JlYXRlTm90aWZpY2F0aW9uKHRpdGxlLCBvcHRpb25zLmJvZHksIG9wdGlvbnMuaWNvbilcbiAgICAgICAgICAuc2hvdygpO1xuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKFwid2Via2l0Tm90aWZpY2F0aW9uc1wiIGluIHdpbmRvdykge1xuICAgICAgbm90aWZ5ID0gZnVuY3Rpb24gKHRpdGxlLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cud2Via2l0Tm90aWZpY2F0aW9ucy5jcmVhdGVOb3RpZmljYXRpb24oXG4gICAgICAgICAgb3B0aW9ucy5pY29uLFxuICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgIG9wdGlvbnMuYm9keVxuICAgICAgICApO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgbm90aWZ5ID0gZnVuY3Rpb24gKHRpdGxlLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIG5vdGlmeSh0aXRsZSwgb3B0aW9ucyk7XG4gIH07XG5cblxuICBQTm90aWZ5LnByb3RvdHlwZS5vcHRpb25zLmRlc2t0b3AgPSB7XG4gICAgLy8gRGlzcGxheSB0aGUgbm90aWZpY2F0aW9uIGFzIGEgZGVza3RvcCBub3RpZmljYXRpb24uXG4gICAgZGVza3RvcDogZmFsc2UsXG4gICAgLy8gSWYgZGVza3RvcCBub3RpZmljYXRpb25zIGFyZSBub3Qgc3VwcG9ydGVkIG9yIGFsbG93ZWQsIGZhbGwgYmFjayB0byBhIHJlZ3VsYXIgbm90aWNlLlxuICAgIGZhbGxiYWNrOiB0cnVlLFxuICAgIC8vIFRoZSBVUkwgb2YgdGhlIGljb24gdG8gZGlzcGxheS4gSWYgZmFsc2UsIG5vIGljb24gd2lsbCBzaG93LiBJZiBudWxsLCBhIGRlZmF1bHQgaWNvbiB3aWxsIHNob3cuXG4gICAgaWNvbjogbnVsbCxcbiAgICAvLyBVc2luZyBhIHRhZyBsZXRzIHlvdSB1cGRhdGUgYW4gZXhpc3Rpbmcgbm90aWNlLCBvciBrZWVwIGZyb20gZHVwbGljYXRpbmcgbm90aWNlcyBiZXR3ZWVuIHRhYnMuXG4gICAgLy8gSWYgeW91IGxlYXZlIHRhZyBudWxsLCBvbmUgd2lsbCBiZSBnZW5lcmF0ZWQsIGZhY2lsaXRhdGluZyB0aGUgXCJ1cGRhdGVcIiBmdW5jdGlvbi5cbiAgICAvLyBzZWU6IGh0dHA6Ly93d3cudzMub3JnL1RSL25vdGlmaWNhdGlvbnMvI3RhZ3MtZXhhbXBsZVxuICAgIHRhZzogbnVsbCxcbiAgICAvLyBPcHRpb25hbGx5IGRpc3BsYXkgYSBkaWZmZXJlbnQgdGl0bGUgZm9yIHRoZSBkZXNrdG9wLlxuICAgIHRpdGxlOiBudWxsLFxuICAgIC8vIE9wdGlvbmFsbHkgZGlzcGxheSBkaWZmZXJlbnQgdGV4dCBmb3IgdGhlIGRlc2t0b3AuXG4gICAgdGV4dDogbnVsbFxuICB9O1xuICBQTm90aWZ5LnByb3RvdHlwZS5tb2R1bGVzLmRlc2t0b3AgPSB7XG4gICAgZ2VuTm90aWNlOiBmdW5jdGlvbihub3RpY2UsIG9wdGlvbnMpe1xuICAgICAgaWYgKG9wdGlvbnMuaWNvbiA9PT0gbnVsbCkge1xuICAgICAgICB0aGlzLmljb24gPSBcImh0dHA6Ly9zY2lhY3RpdmUuY29tL3Bub3RpZnkvaW5jbHVkZXMvZGVza3RvcC9cIitub3RpY2Uub3B0aW9ucy50eXBlK1wiLnBuZ1wiO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmljb24gPT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuaWNvbiA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmljb24gPSBvcHRpb25zLmljb247XG4gICAgICB9XG4gICAgICBpZiAodGhpcy50YWcgPT09IG51bGwgfHwgb3B0aW9ucy50YWcgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy50YWcgPSBvcHRpb25zLnRhZyA9PT0gbnVsbCA/IFwiUE5vdGlmeS1cIitNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwKSA6IG9wdGlvbnMudGFnO1xuICAgICAgfVxuICAgICAgbm90aWNlLmRlc2t0b3AgPSBub3RpZnkob3B0aW9ucy50aXRsZSB8fCBub3RpY2Uub3B0aW9ucy50aXRsZSwge1xuICAgICAgICBpY29uOiB0aGlzLmljb24sXG4gICAgICAgIGJvZHk6IG9wdGlvbnMudGV4dCB8fCBub3RpY2Uub3B0aW9ucy50ZXh0LFxuICAgICAgICB0YWc6IHRoaXMudGFnXG4gICAgICB9KTtcbiAgICAgIGlmICghKFwiY2xvc2VcIiBpbiBub3RpY2UuZGVza3RvcCkgJiYgKFwiY2FuY2VsXCIgaW4gbm90aWNlLmRlc2t0b3ApKSB7XG4gICAgICAgIG5vdGljZS5kZXNrdG9wLmNsb3NlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICBub3RpY2UuZGVza3RvcC5jYW5jZWwoKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIG5vdGljZS5kZXNrdG9wLm9uY2xpY2sgPSBmdW5jdGlvbigpe1xuICAgICAgICBub3RpY2UuZWxlbS50cmlnZ2VyKFwiY2xpY2tcIik7XG4gICAgICB9O1xuICAgICAgbm90aWNlLmRlc2t0b3Aub25jbG9zZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmIChub3RpY2Uuc3RhdGUgIT09IFwiY2xvc2luZ1wiICYmIG5vdGljZS5zdGF0ZSAhPT0gXCJjbG9zZWRcIikge1xuICAgICAgICAgIG5vdGljZS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuICAgIGluaXQ6IGZ1bmN0aW9uKG5vdGljZSwgb3B0aW9ucyl7XG4gICAgICBpZiAoIW9wdGlvbnMuZGVza3RvcClcbiAgICAgICAgcmV0dXJuO1xuICAgICAgcGVybWlzc2lvbiA9IFBOb3RpZnkuZGVza3RvcC5jaGVja1Blcm1pc3Npb24oKTtcbiAgICAgIGlmIChwZXJtaXNzaW9uICE9PSAwKSB7XG4gICAgICAgIC8vIEtlZXAgdGhlIG5vdGljZSBmcm9tIG9wZW5pbmcgaWYgZmFsbGJhY2sgaXMgZmFsc2UuXG4gICAgICAgIGlmICghb3B0aW9ucy5mYWxsYmFjaykge1xuICAgICAgICAgIG5vdGljZS5vcHRpb25zLmF1dG9fZGlzcGxheSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuZ2VuTm90aWNlKG5vdGljZSwgb3B0aW9ucyk7XG4gICAgfSxcbiAgICB1cGRhdGU6IGZ1bmN0aW9uKG5vdGljZSwgb3B0aW9ucywgb2xkT3B0cyl7XG4gICAgICBpZiAoKHBlcm1pc3Npb24gIT09IDAgJiYgb3B0aW9ucy5mYWxsYmFjaykgfHwgIW9wdGlvbnMuZGVza3RvcClcbiAgICAgICAgcmV0dXJuO1xuICAgICAgdGhpcy5nZW5Ob3RpY2Uobm90aWNlLCBvcHRpb25zKTtcbiAgICB9LFxuICAgIGJlZm9yZU9wZW46IGZ1bmN0aW9uKG5vdGljZSwgb3B0aW9ucyl7XG4gICAgICBpZiAoKHBlcm1pc3Npb24gIT09IDAgJiYgb3B0aW9ucy5mYWxsYmFjaykgfHwgIW9wdGlvbnMuZGVza3RvcClcbiAgICAgICAgcmV0dXJuO1xuICAgICAgbm90aWNlLmVsZW0uY3NzKHsnbGVmdCc6ICctMTAwMDBweCd9KS5yZW1vdmVDbGFzcygndWktcG5vdGlmeS1pbicpO1xuICAgIH0sXG4gICAgYWZ0ZXJPcGVuOiBmdW5jdGlvbihub3RpY2UsIG9wdGlvbnMpe1xuICAgICAgaWYgKChwZXJtaXNzaW9uICE9PSAwICYmIG9wdGlvbnMuZmFsbGJhY2spIHx8ICFvcHRpb25zLmRlc2t0b3ApXG4gICAgICAgIHJldHVybjtcbiAgICAgIG5vdGljZS5lbGVtLmNzcyh7J2xlZnQnOiAnLTEwMDAwcHgnfSkucmVtb3ZlQ2xhc3MoJ3VpLXBub3RpZnktaW4nKTtcbiAgICAgIGlmIChcInNob3dcIiBpbiBub3RpY2UuZGVza3RvcCkge1xuICAgICAgICBub3RpY2UuZGVza3RvcC5zaG93KCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBiZWZvcmVDbG9zZTogZnVuY3Rpb24obm90aWNlLCBvcHRpb25zKXtcbiAgICAgIGlmICgocGVybWlzc2lvbiAhPT0gMCAmJiBvcHRpb25zLmZhbGxiYWNrKSB8fCAhb3B0aW9ucy5kZXNrdG9wKVxuICAgICAgICByZXR1cm47XG4gICAgICBub3RpY2UuZWxlbS5jc3MoeydsZWZ0JzogJy0xMDAwMHB4J30pLnJlbW92ZUNsYXNzKCd1aS1wbm90aWZ5LWluJyk7XG4gICAgfSxcbiAgICBhZnRlckNsb3NlOiBmdW5jdGlvbihub3RpY2UsIG9wdGlvbnMpe1xuICAgICAgaWYgKChwZXJtaXNzaW9uICE9PSAwICYmIG9wdGlvbnMuZmFsbGJhY2spIHx8ICFvcHRpb25zLmRlc2t0b3ApXG4gICAgICAgIHJldHVybjtcbiAgICAgIG5vdGljZS5lbGVtLmNzcyh7J2xlZnQnOiAnLTEwMDAwcHgnfSkucmVtb3ZlQ2xhc3MoJ3VpLXBub3RpZnktaW4nKTtcbiAgICAgIGlmIChcImNsb3NlXCIgaW4gbm90aWNlLmRlc2t0b3ApIHtcbiAgICAgICAgbm90aWNlLmRlc2t0b3AuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIFBOb3RpZnkuZGVza3RvcCA9IHtcbiAgICBwZXJtaXNzaW9uOiBmdW5jdGlvbigpe1xuICAgICAgaWYgKHR5cGVvZiBOb3RpZmljYXRpb24gIT09IFwidW5kZWZpbmVkXCIgJiYgXCJyZXF1ZXN0UGVybWlzc2lvblwiIGluIE5vdGlmaWNhdGlvbikge1xuICAgICAgICBOb3RpZmljYXRpb24ucmVxdWVzdFBlcm1pc3Npb24oKTtcbiAgICAgIH0gZWxzZSBpZiAoXCJ3ZWJraXROb3RpZmljYXRpb25zXCIgaW4gd2luZG93KSB7XG4gICAgICAgIHdpbmRvdy53ZWJraXROb3RpZmljYXRpb25zLnJlcXVlc3RQZXJtaXNzaW9uKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBjaGVja1Blcm1pc3Npb246IGZ1bmN0aW9uKCl7XG4gICAgICBpZiAodHlwZW9mIE5vdGlmaWNhdGlvbiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBcInBlcm1pc3Npb25cIiBpbiBOb3RpZmljYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIChOb3RpZmljYXRpb24ucGVybWlzc2lvbiA9PT0gXCJncmFudGVkXCIgPyAwIDogMSk7XG4gICAgICB9IGVsc2UgaWYgKFwid2Via2l0Tm90aWZpY2F0aW9uc1wiIGluIHdpbmRvdykge1xuICAgICAgICByZXR1cm4gd2luZG93LndlYmtpdE5vdGlmaWNhdGlvbnMuY2hlY2tQZXJtaXNzaW9uKCkgPT0gMCA/IDAgOiAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBwZXJtaXNzaW9uID0gUE5vdGlmeS5kZXNrdG9wLmNoZWNrUGVybWlzc2lvbigpO1xuICByZXR1cm4gUE5vdGlmeTtcbn0pKTtcbiJdfQ==