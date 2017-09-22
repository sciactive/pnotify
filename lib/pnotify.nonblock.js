'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Nonblock
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as a module.
    define('pnotify.nonblock', ['jquery', 'pnotify'], factory);
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
    // CommonJS
    module.exports = factory(require('jquery'), require('./pnotify'));
  } else {
    // Browser globals
    factory(root.jQuery, root.PNotify);
  }
})(typeof window !== "undefined" ? window : undefined, function ($, PNotify) {
  // Some useful regexes.
  var re_on = /^on/,
      re_mouse_events = /^(dbl)?click$|^mouse(move|down|up|over|out|enter|leave)$|^contextmenu$/,
      re_ui_events = /^(focus|blur|select|change|reset)$|^key(press|down|up)$/,
      re_html_events = /^(scroll|resize|(un)?load|abort|error)$/;
  // Fire a DOM event.
  var dom_event = function dom_event(e, orig_e) {
    var event_object;
    e = e.toLowerCase();
    if (document.createEvent && this.dispatchEvent) {
      // FireFox, Opera, Safari, Chrome
      e = e.replace(re_on, '');
      if (e.match(re_mouse_events)) {
        // This allows the click event to fire on the notice. There is
        // probably a much better way to do it.
        $(this).offset();
        event_object = document.createEvent("MouseEvents");
        event_object.initMouseEvent(e, orig_e.bubbles, orig_e.cancelable, orig_e.view, orig_e.detail, orig_e.screenX, orig_e.screenY, orig_e.clientX, orig_e.clientY, orig_e.ctrlKey, orig_e.altKey, orig_e.shiftKey, orig_e.metaKey, orig_e.button, orig_e.relatedTarget);
      } else if (e.match(re_ui_events)) {
        event_object = document.createEvent("UIEvents");
        event_object.initUIEvent(e, orig_e.bubbles, orig_e.cancelable, orig_e.view, orig_e.detail);
      } else if (e.match(re_html_events)) {
        event_object = document.createEvent("HTMLEvents");
        event_object.initEvent(e, orig_e.bubbles, orig_e.cancelable);
      }
      if (!event_object) return;
      this.dispatchEvent(event_object);
    } else {
      // Internet Explorer
      if (!e.match(re_on)) e = "on" + e;
      event_object = document.createEventObject(orig_e);
      this.fireEvent(e, event_object);
    }
  };

  // This keeps track of the last element the mouse was over, so
  // mouseleave, mouseenter, etc can be called.
  var nonblock_last_elem;
  // This is used to pass events through the notice if it is non-blocking.
  var nonblock_pass = function nonblock_pass(notice, e, e_name) {
    notice.elem.addClass("ui-pnotify-nonblock-hide");
    var element_below = document.elementFromPoint(e.clientX, e.clientY);
    notice.elem.removeClass("ui-pnotify-nonblock-hide");
    var jelement_below = $(element_below);
    var cursor_style = jelement_below.css("cursor");
    if (cursor_style === "auto" && element_below.tagName === "A") {
      cursor_style = "pointer";
    }
    notice.elem.css("cursor", cursor_style !== "auto" ? cursor_style : "default");
    // If the element changed, call mouseenter, mouseleave, etc.
    if (!nonblock_last_elem || nonblock_last_elem.get(0) != element_below) {
      if (nonblock_last_elem) {
        dom_event.call(nonblock_last_elem.get(0), "mouseleave", e.originalEvent);
        dom_event.call(nonblock_last_elem.get(0), "mouseout", e.originalEvent);
      }
      dom_event.call(element_below, "mouseenter", e.originalEvent);
      dom_event.call(element_below, "mouseover", e.originalEvent);
    }
    dom_event.call(element_below, e_name, e.originalEvent);
    // Remember the latest element the mouse was over.
    nonblock_last_elem = jelement_below;
  };

  PNotify.prototype.options.nonblock = {
    // Create a non-blocking notice. It lets the user click elements underneath it.
    nonblock: false
  };
  PNotify.prototype.modules.nonblock = {
    init: function init(notice, options) {
      var that = this;
      notice.elem.on({
        "mouseenter": function mouseenter(e) {
          if (that.options.nonblock) {
            e.stopPropagation();
          }
          if (that.options.nonblock) {
            // If it's non-blocking, animate to the other opacity.
            notice.elem.addClass("ui-pnotify-nonblock-fade");
          }
        },
        "mouseleave": function mouseleave(e) {
          if (that.options.nonblock) {
            e.stopPropagation();
          }
          nonblock_last_elem = null;
          notice.elem.css("cursor", "auto");
          // Animate back to the normal opacity.
          if (that.options.nonblock && notice.animating !== "out") {
            notice.elem.removeClass("ui-pnotify-nonblock-fade");
          }
        },
        "mouseover": function mouseover(e) {
          if (that.options.nonblock) {
            e.stopPropagation();
          }
        },
        "mouseout": function mouseout(e) {
          if (that.options.nonblock) {
            e.stopPropagation();
          }
        },
        "mousemove": function mousemove(e) {
          if (that.options.nonblock) {
            e.stopPropagation();
            nonblock_pass(notice, e, "onmousemove");
          }
        },
        "mousedown": function mousedown(e) {
          if (that.options.nonblock) {
            e.stopPropagation();
            e.preventDefault();
            nonblock_pass(notice, e, "onmousedown");
          }
        },
        "mouseup": function mouseup(e) {
          if (that.options.nonblock) {
            e.stopPropagation();
            e.preventDefault();
            nonblock_pass(notice, e, "onmouseup");
          }
        },
        "click": function click(e) {
          if (that.options.nonblock) {
            e.stopPropagation();
            nonblock_pass(notice, e, "onclick");
          }
        },
        "dblclick": function dblclick(e) {
          if (that.options.nonblock) {
            e.stopPropagation();
            nonblock_pass(notice, e, "ondblclick");
          }
        }
      });
    }
  };
  return PNotify;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBub3RpZnkubm9uYmxvY2suanMiXSwibmFtZXMiOlsicm9vdCIsImZhY3RvcnkiLCJkZWZpbmUiLCJhbWQiLCJleHBvcnRzIiwibW9kdWxlIiwicmVxdWlyZSIsImpRdWVyeSIsIlBOb3RpZnkiLCJ3aW5kb3ciLCIkIiwicmVfb24iLCJyZV9tb3VzZV9ldmVudHMiLCJyZV91aV9ldmVudHMiLCJyZV9odG1sX2V2ZW50cyIsImRvbV9ldmVudCIsImUiLCJvcmlnX2UiLCJldmVudF9vYmplY3QiLCJ0b0xvd2VyQ2FzZSIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwicmVwbGFjZSIsIm1hdGNoIiwib2Zmc2V0IiwiaW5pdE1vdXNlRXZlbnQiLCJidWJibGVzIiwiY2FuY2VsYWJsZSIsInZpZXciLCJkZXRhaWwiLCJzY3JlZW5YIiwic2NyZWVuWSIsImNsaWVudFgiLCJjbGllbnRZIiwiY3RybEtleSIsImFsdEtleSIsInNoaWZ0S2V5IiwibWV0YUtleSIsImJ1dHRvbiIsInJlbGF0ZWRUYXJnZXQiLCJpbml0VUlFdmVudCIsImluaXRFdmVudCIsImNyZWF0ZUV2ZW50T2JqZWN0IiwiZmlyZUV2ZW50Iiwibm9uYmxvY2tfbGFzdF9lbGVtIiwibm9uYmxvY2tfcGFzcyIsIm5vdGljZSIsImVfbmFtZSIsImVsZW0iLCJhZGRDbGFzcyIsImVsZW1lbnRfYmVsb3ciLCJlbGVtZW50RnJvbVBvaW50IiwicmVtb3ZlQ2xhc3MiLCJqZWxlbWVudF9iZWxvdyIsImN1cnNvcl9zdHlsZSIsImNzcyIsInRhZ05hbWUiLCJnZXQiLCJjYWxsIiwib3JpZ2luYWxFdmVudCIsInByb3RvdHlwZSIsIm9wdGlvbnMiLCJub25ibG9jayIsIm1vZHVsZXMiLCJpbml0IiwidGhhdCIsIm9uIiwic3RvcFByb3BhZ2F0aW9uIiwiYW5pbWF0aW5nIiwicHJldmVudERlZmF1bHQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNDLFdBQVVBLElBQVYsRUFBZ0JD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VCxFQUFXO0FBQ3JCLGNBQUlrRCxLQUFLSixPQUFMLENBQWFDLFFBQWpCLEVBQTJCO0FBQ3pCL0MsY0FBRW9ELGVBQUY7QUFDQXRCLDBCQUFjQyxNQUFkLEVBQXNCL0IsQ0FBdEIsRUFBeUIsWUFBekI7QUFDRDtBQUNGO0FBOURZLE9BQWY7QUFnRUQ7QUFuRWtDLEdBQXJDO0FBcUVBLFNBQU9SLE9BQVA7QUFDRCxDQTNKQSxDQUFEIiwiZmlsZSI6InNyYy9wbm90aWZ5Lm5vbmJsb2NrLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE5vbmJsb2NrXG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYSBtb2R1bGUuXG4gICAgZGVmaW5lKCdwbm90aWZ5Lm5vbmJsb2NrJywgWydqcXVlcnknLCAncG5vdGlmeSddLCBmYWN0b3J5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCdqcXVlcnknKSwgcmVxdWlyZSgnLi9wbm90aWZ5JykpO1xuICB9IGVsc2Uge1xuICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xuICAgIGZhY3Rvcnkocm9vdC5qUXVlcnksIHJvb3QuUE5vdGlmeSk7XG4gIH1cbn0odHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHRoaXMsIGZ1bmN0aW9uKCQsIFBOb3RpZnkpe1xuICAvLyBTb21lIHVzZWZ1bCByZWdleGVzLlxuICB2YXIgcmVfb24gPSAvXm9uLyxcbiAgICAgIHJlX21vdXNlX2V2ZW50cyA9IC9eKGRibCk/Y2xpY2skfF5tb3VzZShtb3ZlfGRvd258dXB8b3ZlcnxvdXR8ZW50ZXJ8bGVhdmUpJHxeY29udGV4dG1lbnUkLyxcbiAgICAgIHJlX3VpX2V2ZW50cyA9IC9eKGZvY3VzfGJsdXJ8c2VsZWN0fGNoYW5nZXxyZXNldCkkfF5rZXkocHJlc3N8ZG93bnx1cCkkLyxcbiAgICAgIHJlX2h0bWxfZXZlbnRzID0gL14oc2Nyb2xsfHJlc2l6ZXwodW4pP2xvYWR8YWJvcnR8ZXJyb3IpJC87XG4gIC8vIEZpcmUgYSBET00gZXZlbnQuXG4gIHZhciBkb21fZXZlbnQgPSBmdW5jdGlvbihlLCBvcmlnX2Upe1xuICAgIHZhciBldmVudF9vYmplY3Q7XG4gICAgZSA9IGUudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnQgJiYgdGhpcy5kaXNwYXRjaEV2ZW50KSB7XG4gICAgICAvLyBGaXJlRm94LCBPcGVyYSwgU2FmYXJpLCBDaHJvbWVcbiAgICAgIGUgPSBlLnJlcGxhY2UocmVfb24sICcnKTtcbiAgICAgIGlmIChlLm1hdGNoKHJlX21vdXNlX2V2ZW50cykpIHtcbiAgICAgICAgLy8gVGhpcyBhbGxvd3MgdGhlIGNsaWNrIGV2ZW50IHRvIGZpcmUgb24gdGhlIG5vdGljZS4gVGhlcmUgaXNcbiAgICAgICAgLy8gcHJvYmFibHkgYSBtdWNoIGJldHRlciB3YXkgdG8gZG8gaXQuXG4gICAgICAgICQodGhpcykub2Zmc2V0KCk7XG4gICAgICAgIGV2ZW50X29iamVjdCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudHNcIik7XG4gICAgICAgIGV2ZW50X29iamVjdC5pbml0TW91c2VFdmVudChcbiAgICAgICAgICBlLCBvcmlnX2UuYnViYmxlcywgb3JpZ19lLmNhbmNlbGFibGUsIG9yaWdfZS52aWV3LCBvcmlnX2UuZGV0YWlsLFxuICAgICAgICAgIG9yaWdfZS5zY3JlZW5YLCBvcmlnX2Uuc2NyZWVuWSwgb3JpZ19lLmNsaWVudFgsIG9yaWdfZS5jbGllbnRZLFxuICAgICAgICAgIG9yaWdfZS5jdHJsS2V5LCBvcmlnX2UuYWx0S2V5LCBvcmlnX2Uuc2hpZnRLZXksIG9yaWdfZS5tZXRhS2V5LCBvcmlnX2UuYnV0dG9uLCBvcmlnX2UucmVsYXRlZFRhcmdldFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChlLm1hdGNoKHJlX3VpX2V2ZW50cykpIHtcbiAgICAgICAgZXZlbnRfb2JqZWN0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJVSUV2ZW50c1wiKTtcbiAgICAgICAgZXZlbnRfb2JqZWN0LmluaXRVSUV2ZW50KGUsIG9yaWdfZS5idWJibGVzLCBvcmlnX2UuY2FuY2VsYWJsZSwgb3JpZ19lLnZpZXcsIG9yaWdfZS5kZXRhaWwpO1xuICAgICAgfSBlbHNlIGlmIChlLm1hdGNoKHJlX2h0bWxfZXZlbnRzKSkge1xuICAgICAgICBldmVudF9vYmplY3QgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIkhUTUxFdmVudHNcIik7XG4gICAgICAgIGV2ZW50X29iamVjdC5pbml0RXZlbnQoZSwgb3JpZ19lLmJ1YmJsZXMsIG9yaWdfZS5jYW5jZWxhYmxlKTtcbiAgICAgIH1cbiAgICAgIGlmICghZXZlbnRfb2JqZWN0KSByZXR1cm47XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnRfb2JqZWN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSW50ZXJuZXQgRXhwbG9yZXJcbiAgICAgIGlmICghZS5tYXRjaChyZV9vbikpIGUgPSBcIm9uXCIrZTtcbiAgICAgIGV2ZW50X29iamVjdCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0KG9yaWdfZSk7XG4gICAgICB0aGlzLmZpcmVFdmVudChlLCBldmVudF9vYmplY3QpO1xuICAgIH1cbiAgfTtcblxuXG4gIC8vIFRoaXMga2VlcHMgdHJhY2sgb2YgdGhlIGxhc3QgZWxlbWVudCB0aGUgbW91c2Ugd2FzIG92ZXIsIHNvXG4gIC8vIG1vdXNlbGVhdmUsIG1vdXNlZW50ZXIsIGV0YyBjYW4gYmUgY2FsbGVkLlxuICB2YXIgbm9uYmxvY2tfbGFzdF9lbGVtO1xuICAvLyBUaGlzIGlzIHVzZWQgdG8gcGFzcyBldmVudHMgdGhyb3VnaCB0aGUgbm90aWNlIGlmIGl0IGlzIG5vbi1ibG9ja2luZy5cbiAgdmFyIG5vbmJsb2NrX3Bhc3MgPSBmdW5jdGlvbihub3RpY2UsIGUsIGVfbmFtZSl7XG4gICAgbm90aWNlLmVsZW0uYWRkQ2xhc3MoXCJ1aS1wbm90aWZ5LW5vbmJsb2NrLWhpZGVcIik7XG4gICAgdmFyIGVsZW1lbnRfYmVsb3cgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGUuY2xpZW50WCwgZS5jbGllbnRZKTtcbiAgICBub3RpY2UuZWxlbS5yZW1vdmVDbGFzcyhcInVpLXBub3RpZnktbm9uYmxvY2staGlkZVwiKTtcbiAgICB2YXIgamVsZW1lbnRfYmVsb3cgPSAkKGVsZW1lbnRfYmVsb3cpO1xuICAgIHZhciBjdXJzb3Jfc3R5bGUgPSBqZWxlbWVudF9iZWxvdy5jc3MoXCJjdXJzb3JcIik7XG4gICAgaWYgKGN1cnNvcl9zdHlsZSA9PT0gXCJhdXRvXCIgJiYgZWxlbWVudF9iZWxvdy50YWdOYW1lID09PSBcIkFcIikge1xuICAgICAgY3Vyc29yX3N0eWxlID0gXCJwb2ludGVyXCI7XG4gICAgfVxuICAgIG5vdGljZS5lbGVtLmNzcyhcImN1cnNvclwiLCBjdXJzb3Jfc3R5bGUgIT09IFwiYXV0b1wiID8gY3Vyc29yX3N0eWxlIDogXCJkZWZhdWx0XCIpO1xuICAgIC8vIElmIHRoZSBlbGVtZW50IGNoYW5nZWQsIGNhbGwgbW91c2VlbnRlciwgbW91c2VsZWF2ZSwgZXRjLlxuICAgIGlmICghbm9uYmxvY2tfbGFzdF9lbGVtIHx8IG5vbmJsb2NrX2xhc3RfZWxlbS5nZXQoMCkgIT0gZWxlbWVudF9iZWxvdykge1xuICAgICAgaWYgKG5vbmJsb2NrX2xhc3RfZWxlbSkge1xuICAgICAgICBkb21fZXZlbnQuY2FsbChub25ibG9ja19sYXN0X2VsZW0uZ2V0KDApLCBcIm1vdXNlbGVhdmVcIiwgZS5vcmlnaW5hbEV2ZW50KTtcbiAgICAgICAgZG9tX2V2ZW50LmNhbGwobm9uYmxvY2tfbGFzdF9lbGVtLmdldCgwKSwgXCJtb3VzZW91dFwiLCBlLm9yaWdpbmFsRXZlbnQpO1xuICAgICAgfVxuICAgICAgZG9tX2V2ZW50LmNhbGwoZWxlbWVudF9iZWxvdywgXCJtb3VzZWVudGVyXCIsIGUub3JpZ2luYWxFdmVudCk7XG4gICAgICBkb21fZXZlbnQuY2FsbChlbGVtZW50X2JlbG93LCBcIm1vdXNlb3ZlclwiLCBlLm9yaWdpbmFsRXZlbnQpO1xuICAgIH1cbiAgICBkb21fZXZlbnQuY2FsbChlbGVtZW50X2JlbG93LCBlX25hbWUsIGUub3JpZ2luYWxFdmVudCk7XG4gICAgLy8gUmVtZW1iZXIgdGhlIGxhdGVzdCBlbGVtZW50IHRoZSBtb3VzZSB3YXMgb3Zlci5cbiAgICBub25ibG9ja19sYXN0X2VsZW0gPSBqZWxlbWVudF9iZWxvdztcbiAgfTtcblxuXG4gIFBOb3RpZnkucHJvdG90eXBlLm9wdGlvbnMubm9uYmxvY2sgPSB7XG4gICAgLy8gQ3JlYXRlIGEgbm9uLWJsb2NraW5nIG5vdGljZS4gSXQgbGV0cyB0aGUgdXNlciBjbGljayBlbGVtZW50cyB1bmRlcm5lYXRoIGl0LlxuICAgIG5vbmJsb2NrOiBmYWxzZVxuICB9O1xuICBQTm90aWZ5LnByb3RvdHlwZS5tb2R1bGVzLm5vbmJsb2NrID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uKG5vdGljZSwgb3B0aW9ucyl7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBub3RpY2UuZWxlbS5vbih7XG4gICAgICAgIFwibW91c2VlbnRlclwiOiBmdW5jdGlvbihlKXtcbiAgICAgICAgICBpZiAodGhhdC5vcHRpb25zLm5vbmJsb2NrKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhhdC5vcHRpb25zLm5vbmJsb2NrKSB7XG4gICAgICAgICAgICAvLyBJZiBpdCdzIG5vbi1ibG9ja2luZywgYW5pbWF0ZSB0byB0aGUgb3RoZXIgb3BhY2l0eS5cbiAgICAgICAgICAgIG5vdGljZS5lbGVtLmFkZENsYXNzKFwidWktcG5vdGlmeS1ub25ibG9jay1mYWRlXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJtb3VzZWxlYXZlXCI6IGZ1bmN0aW9uKGUpe1xuICAgICAgICAgIGlmICh0aGF0Lm9wdGlvbnMubm9uYmxvY2spIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG5vbmJsb2NrX2xhc3RfZWxlbSA9IG51bGw7XG4gICAgICAgICAgbm90aWNlLmVsZW0uY3NzKFwiY3Vyc29yXCIsIFwiYXV0b1wiKTtcbiAgICAgICAgICAvLyBBbmltYXRlIGJhY2sgdG8gdGhlIG5vcm1hbCBvcGFjaXR5LlxuICAgICAgICAgIGlmICh0aGF0Lm9wdGlvbnMubm9uYmxvY2sgJiYgbm90aWNlLmFuaW1hdGluZyAhPT0gXCJvdXRcIikge1xuICAgICAgICAgICAgbm90aWNlLmVsZW0ucmVtb3ZlQ2xhc3MoXCJ1aS1wbm90aWZ5LW5vbmJsb2NrLWZhZGVcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm1vdXNlb3ZlclwiOiBmdW5jdGlvbihlKXtcbiAgICAgICAgICBpZiAodGhhdC5vcHRpb25zLm5vbmJsb2NrKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJtb3VzZW91dFwiOiBmdW5jdGlvbihlKXtcbiAgICAgICAgICBpZiAodGhhdC5vcHRpb25zLm5vbmJsb2NrKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJtb3VzZW1vdmVcIjogZnVuY3Rpb24oZSl7XG4gICAgICAgICAgaWYgKHRoYXQub3B0aW9ucy5ub25ibG9jaykge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIG5vbmJsb2NrX3Bhc3Mobm90aWNlLCBlLCBcIm9ubW91c2Vtb3ZlXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJtb3VzZWRvd25cIjogZnVuY3Rpb24oZSl7XG4gICAgICAgICAgaWYgKHRoYXQub3B0aW9ucy5ub25ibG9jaykge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIG5vbmJsb2NrX3Bhc3Mobm90aWNlLCBlLCBcIm9ubW91c2Vkb3duXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJtb3VzZXVwXCI6IGZ1bmN0aW9uKGUpe1xuICAgICAgICAgIGlmICh0aGF0Lm9wdGlvbnMubm9uYmxvY2spIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBub25ibG9ja19wYXNzKG5vdGljZSwgZSwgXCJvbm1vdXNldXBcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNsaWNrXCI6IGZ1bmN0aW9uKGUpe1xuICAgICAgICAgIGlmICh0aGF0Lm9wdGlvbnMubm9uYmxvY2spIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBub25ibG9ja19wYXNzKG5vdGljZSwgZSwgXCJvbmNsaWNrXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJkYmxjbGlja1wiOiBmdW5jdGlvbihlKXtcbiAgICAgICAgICBpZiAodGhhdC5vcHRpb25zLm5vbmJsb2NrKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgbm9uYmxvY2tfcGFzcyhub3RpY2UsIGUsIFwib25kYmxjbGlja1wiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIFBOb3RpZnk7XG59KSk7XG4iXX0=