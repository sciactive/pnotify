'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Confirm
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as a module.
    define('pnotify.confirm', ['jquery', 'pnotify'], factory);
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
    // CommonJS
    module.exports = factory(require('jquery'), require('./pnotify'));
  } else {
    // Browser globals
    factory(root.jQuery, root.PNotify);
  }
})(typeof window !== "undefined" ? window : undefined, function ($, PNotify) {
  PNotify.prototype.options.confirm = {
    // Make a confirmation box.
    confirm: false,
    // Make a prompt.
    prompt: false,
    // Classes to add to the input element of the prompt.
    prompt_class: "",
    // The default value of the prompt.
    prompt_default: "",
    // Whether the prompt should accept multiple lines of text.
    prompt_multi_line: false,
    // Where to align the buttons. (right, center, left, justify)
    align: "right",
    // The buttons to display, and their callbacks.
    buttons: [{
      text: "Ok",
      addClass: "",
      // Whether to trigger this button when the user hits enter in a single line prompt.
      promptTrigger: true,
      click: function click(notice, value) {
        notice.remove();
        notice.get().trigger("pnotify.confirm", [notice, value]);
      }
    }, {
      text: "Cancel",
      addClass: "",
      click: function click(notice) {
        notice.remove();
        notice.get().trigger("pnotify.cancel", notice);
      }
    }]
  };
  PNotify.prototype.modules.confirm = {
    init: function init(notice, options) {
      // The div that contains the buttons.
      this.container = $('<div class="ui-pnotify-action-bar" style="margin-top:5px;clear:both;" />').css('text-align', options.align).appendTo(notice.container);

      if (options.confirm || options.prompt) this.makeDialog(notice, options);else this.container.hide();
    },

    update: function update(notice, options) {
      if (options.confirm) {
        this.makeDialog(notice, options);
        this.container.show();
      } else {
        this.container.hide().empty();
      }
    },

    afterOpen: function afterOpen(notice, options) {
      if (options.prompt) {
        this.prompt.focus();
      }
    },

    makeDialog: function makeDialog(notice, options) {
      var already = false,
          that = this,
          btn,
          elem;
      this.container.empty();
      if (options.prompt) {
        // The input element of a prompt.
        this.prompt = $('<' + (options.prompt_multi_line ? 'textarea rows="5"' : 'input type="text"') + ' style="margin-bottom:5px;clear:both;" />').addClass((typeof notice.styles.input === "undefined" ? "" : notice.styles.input) + " " + (typeof options.prompt_class === "undefined" ? "" : options.prompt_class)).val(options.prompt_default).appendTo(this.container);
      }
      var customButtons = options.buttons[0] && options.buttons[0] !== PNotify.prototype.options.confirm.buttons[0];
      for (var i = 0; i < options.buttons.length; i++) {
        if (options.buttons[i] === null || customButtons && PNotify.prototype.options.confirm.buttons[i] && PNotify.prototype.options.confirm.buttons[i] === options.buttons[i]) {
          continue;
        }
        btn = options.buttons[i];
        if (already) {
          this.container.append(' ');
        } else {
          already = true;
        }
        elem = $('<button type="button" class="ui-pnotify-action-button" />').addClass((typeof notice.styles.btn === "undefined" ? "" : notice.styles.btn) + " " + (typeof btn.addClass === "undefined" ? "" : btn.addClass)).text(btn.text).appendTo(this.container).on("click", function (btn) {
          return function () {
            if (typeof btn.click == "function") {
              btn.click(notice, options.prompt ? that.prompt.val() : null);
            }
          };
        }(btn));
        if (options.prompt && !options.prompt_multi_line && btn.promptTrigger) this.prompt.keypress(function (elem) {
          return function (e) {
            if (e.keyCode == 13) elem.click();
          };
        }(elem));
        if (notice.styles.text) {
          elem.wrapInner('<span class="' + notice.styles.text + '"></span>');
        }
        if (notice.styles.btnhover) {
          elem.hover(function (elem) {
            return function () {
              elem.addClass(notice.styles.btnhover);
            };
          }(elem), function (elem) {
            return function () {
              elem.removeClass(notice.styles.btnhover);
            };
          }(elem));
        }
        if (notice.styles.btnactive) {
          elem.on("mousedown", function (elem) {
            return function () {
              elem.addClass(notice.styles.btnactive);
            };
          }(elem)).on("mouseup", function (elem) {
            return function () {
              elem.removeClass(notice.styles.btnactive);
            };
          }(elem));
        }
        if (notice.styles.btnfocus) {
          elem.on("focus", function (elem) {
            return function () {
              elem.addClass(notice.styles.btnfocus);
            };
          }(elem)).on("blur", function (elem) {
            return function () {
              elem.removeClass(notice.styles.btnfocus);
            };
          }(elem));
        }
      }
    }
  };
  $.extend(PNotify.styling.bootstrap3, {
    btn: "btn btn-default",
    input: "form-control"
  });
  $.extend(PNotify.styling.fontawesome, {
    btn: "btn btn-default",
    input: "form-control"
  });
  return PNotify;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBub3RpZnkuY29uZmlybS5qcyJdLCJuYW1lcyI6WyJyb290IiwiZmFjdG9yeSIsImRlZmluZSIsImFtZCIsImV4cG9ydHMiLCJtb2R1bGUiLCJyZXF1aXJlIiwialF1ZXJ5IiwiUE5vdGlmeSIsIndpbmRvdyIsIiQiLCJwcm90b3R5cGUiLCJvcHRpb25zIiwiY29uZmlybSIsInByb21wdCIsInByb21wdF9jbGFzcyIsInByb21wdF9kZWZhdWx0IiwicHJvbXB0X211bHRpX2xpbmUiLCJhbGlnbiIsImJ1dHRvbnMiLCJ0ZXh0IiwiYWRkQ2xhc3MiLCJwcm9tcHRUcmlnZ2VyIiwiY2xpY2siLCJub3RpY2UiLCJ2YWx1ZSIsInJlbW92ZSIsImdldCIsInRyaWdnZXIiLCJtb2R1bGVzIiwiaW5pdCIsImNvbnRhaW5lciIsImNzcyIsImFwcGVuZFRvIiwibWFrZURpYWxvZyIsImhpZGUiLCJ1cGRhdGUiLCJzaG93IiwiZW1wdHkiLCJhZnRlck9wZW4iLCJmb2N1cyIsImFscmVhZHkiLCJ0aGF0IiwiYnRuIiwiZWxlbSIsInN0eWxlcyIsImlucHV0IiwidmFsIiwiY3VzdG9tQnV0dG9ucyIsImkiLCJsZW5ndGgiLCJhcHBlbmQiLCJvbiIsImtleXByZXNzIiwiZSIsImtleUNvZGUiLCJ3cmFwSW5uZXIiLCJidG5ob3ZlciIsImhvdmVyIiwicmVtb3ZlQ2xhc3MiLCJidG5hY3RpdmUiLCJidG5mb2N1cyIsImV4dGVuZCIsInN0eWxpbmciLCJib290c3RyYXAzIiwiZm9udGF3ZXNvbWUiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNDLFdBQVVBLElBQVYsRUFBZ0JDLE9BQWhCLEVBQXlCO0FBQ3hCLE1BQUksT0FBT0MsTUFBUCxLQUFrQixVQUFsQixJQUFnQ0EsT0FBT0MsR0FBM0MsRUFBZ0Q7QUFDOUM7QUFDQUQsV0FBTyxpQkFBUCxFQUEwQixDQUFDLFFBQUQsRUFBVyxTQUFYLENBQTFCLEVBQWlERCxPQUFqRDtBQUNELEdBSEQsTUFHTyxJQUFJLFFBQU9HLE9B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RmEsQ0FBakIsRUFFV1EsRUFGWCxDQUVjLE1BRmQsRUFFdUIsVUFBU1IsSUFBVCxFQUFjO0FBQUUsbUJBQU8sWUFBVTtBQUN0REEsbUJBQUtlLFdBQUwsQ0FBaUJuQyxPQUFPcUIsTUFBUCxDQUFjZ0IsUUFBL0I7QUFDRCxhQUZzQztBQUVyQyxXQUZvQixDQUVsQmpCLElBRmtCLENBRnRCO0FBS0Q7QUFDRjtBQUNGO0FBdEZpQyxHQUFwQztBQXdGQWxDLElBQUVvRCxNQUFGLENBQVN0RCxRQUFRdUQsT0FBUixDQUFnQkMsVUFBekIsRUFBcUM7QUFDbkNyQixTQUFLLGlCQUQ4QjtBQUVuQ0csV0FBTztBQUY0QixHQUFyQztBQUlBcEMsSUFBRW9ELE1BQUYsQ0FBU3RELFFBQVF1RCxPQUFSLENBQWdCRSxXQUF6QixFQUFzQztBQUNwQ3RCLFNBQUssaUJBRCtCO0FBRXBDRyxXQUFPO0FBRjZCLEdBQXRDO0FBSUEsU0FBT3RDLE9BQVA7QUFDRCxDQWhKQSxDQUFEIiwiZmlsZSI6InNyYy9wbm90aWZ5LmNvbmZpcm0uanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29uZmlybVxuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGEgbW9kdWxlLlxuICAgIGRlZmluZSgncG5vdGlmeS5jb25maXJtJywgWydqcXVlcnknLCAncG5vdGlmeSddLCBmYWN0b3J5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCdqcXVlcnknKSwgcmVxdWlyZSgnLi9wbm90aWZ5JykpO1xuICB9IGVsc2Uge1xuICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xuICAgIGZhY3Rvcnkocm9vdC5qUXVlcnksIHJvb3QuUE5vdGlmeSk7XG4gIH1cbn0odHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHRoaXMsIGZ1bmN0aW9uKCQsIFBOb3RpZnkpe1xuICBQTm90aWZ5LnByb3RvdHlwZS5vcHRpb25zLmNvbmZpcm0gPSB7XG4gICAgLy8gTWFrZSBhIGNvbmZpcm1hdGlvbiBib3guXG4gICAgY29uZmlybTogZmFsc2UsXG4gICAgLy8gTWFrZSBhIHByb21wdC5cbiAgICBwcm9tcHQ6IGZhbHNlLFxuICAgIC8vIENsYXNzZXMgdG8gYWRkIHRvIHRoZSBpbnB1dCBlbGVtZW50IG9mIHRoZSBwcm9tcHQuXG4gICAgcHJvbXB0X2NsYXNzOiBcIlwiLFxuICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIG9mIHRoZSBwcm9tcHQuXG4gICAgcHJvbXB0X2RlZmF1bHQ6IFwiXCIsXG4gICAgLy8gV2hldGhlciB0aGUgcHJvbXB0IHNob3VsZCBhY2NlcHQgbXVsdGlwbGUgbGluZXMgb2YgdGV4dC5cbiAgICBwcm9tcHRfbXVsdGlfbGluZTogZmFsc2UsXG4gICAgLy8gV2hlcmUgdG8gYWxpZ24gdGhlIGJ1dHRvbnMuIChyaWdodCwgY2VudGVyLCBsZWZ0LCBqdXN0aWZ5KVxuICAgIGFsaWduOiBcInJpZ2h0XCIsXG4gICAgLy8gVGhlIGJ1dHRvbnMgdG8gZGlzcGxheSwgYW5kIHRoZWlyIGNhbGxiYWNrcy5cbiAgICBidXR0b25zOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiT2tcIixcbiAgICAgICAgYWRkQ2xhc3M6IFwiXCIsXG4gICAgICAgIC8vIFdoZXRoZXIgdG8gdHJpZ2dlciB0aGlzIGJ1dHRvbiB3aGVuIHRoZSB1c2VyIGhpdHMgZW50ZXIgaW4gYSBzaW5nbGUgbGluZSBwcm9tcHQuXG4gICAgICAgIHByb21wdFRyaWdnZXI6IHRydWUsXG4gICAgICAgIGNsaWNrOiBmdW5jdGlvbihub3RpY2UsIHZhbHVlKXtcbiAgICAgICAgICBub3RpY2UucmVtb3ZlKCk7XG4gICAgICAgICAgbm90aWNlLmdldCgpLnRyaWdnZXIoXCJwbm90aWZ5LmNvbmZpcm1cIiwgW25vdGljZSwgdmFsdWVdKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJDYW5jZWxcIixcbiAgICAgICAgYWRkQ2xhc3M6IFwiXCIsXG4gICAgICAgIGNsaWNrOiBmdW5jdGlvbihub3RpY2Upe1xuICAgICAgICAgIG5vdGljZS5yZW1vdmUoKTtcbiAgICAgICAgICBub3RpY2UuZ2V0KCkudHJpZ2dlcihcInBub3RpZnkuY2FuY2VsXCIsIG5vdGljZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdXG4gIH07XG4gIFBOb3RpZnkucHJvdG90eXBlLm1vZHVsZXMuY29uZmlybSA9IHtcbiAgICBpbml0OiBmdW5jdGlvbihub3RpY2UsIG9wdGlvbnMpe1xuICAgICAgLy8gVGhlIGRpdiB0aGF0IGNvbnRhaW5zIHRoZSBidXR0b25zLlxuICAgICAgdGhpcy5jb250YWluZXIgPSAkKCc8ZGl2IGNsYXNzPVwidWktcG5vdGlmeS1hY3Rpb24tYmFyXCIgc3R5bGU9XCJtYXJnaW4tdG9wOjVweDtjbGVhcjpib3RoO1wiIC8+JykuY3NzKCd0ZXh0LWFsaWduJywgb3B0aW9ucy5hbGlnbikuYXBwZW5kVG8obm90aWNlLmNvbnRhaW5lcik7XG5cbiAgICAgIGlmIChvcHRpb25zLmNvbmZpcm0gfHwgb3B0aW9ucy5wcm9tcHQpXG4gICAgICAgIHRoaXMubWFrZURpYWxvZyhub3RpY2UsIG9wdGlvbnMpO1xuICAgICAgZWxzZVxuICAgICAgICB0aGlzLmNvbnRhaW5lci5oaWRlKCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24obm90aWNlLCBvcHRpb25zKXtcbiAgICAgIGlmIChvcHRpb25zLmNvbmZpcm0pIHtcbiAgICAgICAgdGhpcy5tYWtlRGlhbG9nKG5vdGljZSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnNob3coKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmhpZGUoKS5lbXB0eSgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBhZnRlck9wZW46IGZ1bmN0aW9uKG5vdGljZSwgb3B0aW9ucyl7XG4gICAgICBpZiAob3B0aW9ucy5wcm9tcHQpIHtcbiAgICAgICAgdGhpcy5wcm9tcHQuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgbWFrZURpYWxvZzogZnVuY3Rpb24obm90aWNlLCBvcHRpb25zKSB7XG4gICAgICB2YXIgYWxyZWFkeSA9IGZhbHNlLCB0aGF0ID0gdGhpcywgYnRuLCBlbGVtO1xuICAgICAgdGhpcy5jb250YWluZXIuZW1wdHkoKTtcbiAgICAgIGlmIChvcHRpb25zLnByb21wdCkge1xuICAgICAgICAvLyBUaGUgaW5wdXQgZWxlbWVudCBvZiBhIHByb21wdC5cbiAgICAgICAgdGhpcy5wcm9tcHQgPSAkKCc8Jysob3B0aW9ucy5wcm9tcHRfbXVsdGlfbGluZSA/ICd0ZXh0YXJlYSByb3dzPVwiNVwiJyA6ICdpbnB1dCB0eXBlPVwidGV4dFwiJykrJyBzdHlsZT1cIm1hcmdpbi1ib3R0b206NXB4O2NsZWFyOmJvdGg7XCIgLz4nKVxuICAgICAgICAuYWRkQ2xhc3MoKHR5cGVvZiBub3RpY2Uuc3R5bGVzLmlucHV0ID09PSBcInVuZGVmaW5lZFwiID8gXCJcIiA6IG5vdGljZS5zdHlsZXMuaW5wdXQpK1wiIFwiKyh0eXBlb2Ygb3B0aW9ucy5wcm9tcHRfY2xhc3MgPT09IFwidW5kZWZpbmVkXCIgPyBcIlwiIDogb3B0aW9ucy5wcm9tcHRfY2xhc3MpKVxuICAgICAgICAudmFsKG9wdGlvbnMucHJvbXB0X2RlZmF1bHQpXG4gICAgICAgIC5hcHBlbmRUbyh0aGlzLmNvbnRhaW5lcik7XG4gICAgICB9XG4gICAgICB2YXIgY3VzdG9tQnV0dG9ucyA9IChvcHRpb25zLmJ1dHRvbnNbMF0gJiYgb3B0aW9ucy5idXR0b25zWzBdICE9PSBQTm90aWZ5LnByb3RvdHlwZS5vcHRpb25zLmNvbmZpcm0uYnV0dG9uc1swXSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9wdGlvbnMuYnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAob3B0aW9ucy5idXR0b25zW2ldID09PSBudWxsIHx8IChjdXN0b21CdXR0b25zICYmIFBOb3RpZnkucHJvdG90eXBlLm9wdGlvbnMuY29uZmlybS5idXR0b25zW2ldICYmIFBOb3RpZnkucHJvdG90eXBlLm9wdGlvbnMuY29uZmlybS5idXR0b25zW2ldID09PSBvcHRpb25zLmJ1dHRvbnNbaV0pKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgYnRuID0gb3B0aW9ucy5idXR0b25zW2ldO1xuICAgICAgICBpZiAoYWxyZWFkeSkge1xuICAgICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZCgnICcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFscmVhZHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsZW0gPSAkKCc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInVpLXBub3RpZnktYWN0aW9uLWJ1dHRvblwiIC8+JylcbiAgICAgICAgLmFkZENsYXNzKCh0eXBlb2Ygbm90aWNlLnN0eWxlcy5idG4gPT09IFwidW5kZWZpbmVkXCIgPyBcIlwiIDogbm90aWNlLnN0eWxlcy5idG4pK1wiIFwiKyh0eXBlb2YgYnRuLmFkZENsYXNzID09PSBcInVuZGVmaW5lZFwiID8gXCJcIiA6IGJ0bi5hZGRDbGFzcykpXG4gICAgICAgIC50ZXh0KGJ0bi50ZXh0KVxuICAgICAgICAuYXBwZW5kVG8odGhpcy5jb250YWluZXIpXG4gICAgICAgIC5vbihcImNsaWNrXCIsIChmdW5jdGlvbihidG4peyByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICAgICAgICBpZiAodHlwZW9mIGJ0bi5jbGljayA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGJ0bi5jbGljayhub3RpY2UsIG9wdGlvbnMucHJvbXB0ID8gdGhhdC5wcm9tcHQudmFsKCkgOiBudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH19KShidG4pKTtcbiAgICAgICAgaWYgKG9wdGlvbnMucHJvbXB0ICYmICFvcHRpb25zLnByb21wdF9tdWx0aV9saW5lICYmIGJ0bi5wcm9tcHRUcmlnZ2VyKVxuICAgICAgICAgIHRoaXMucHJvbXB0LmtleXByZXNzKChmdW5jdGlvbihlbGVtKXsgcmV0dXJuIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAxMylcbiAgICAgICAgICAgICAgZWxlbS5jbGljaygpO1xuICAgICAgICAgIH19KShlbGVtKSk7XG4gICAgICAgIGlmIChub3RpY2Uuc3R5bGVzLnRleHQpIHtcbiAgICAgICAgICBlbGVtLndyYXBJbm5lcignPHNwYW4gY2xhc3M9XCInK25vdGljZS5zdHlsZXMudGV4dCsnXCI+PC9zcGFuPicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub3RpY2Uuc3R5bGVzLmJ0bmhvdmVyKSB7XG4gICAgICAgICAgZWxlbS5ob3ZlcigoZnVuY3Rpb24oZWxlbSl7IHJldHVybiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgZWxlbS5hZGRDbGFzcyhub3RpY2Uuc3R5bGVzLmJ0bmhvdmVyKTtcbiAgICAgICAgICB9fSkoZWxlbSksIChmdW5jdGlvbihlbGVtKXsgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBlbGVtLnJlbW92ZUNsYXNzKG5vdGljZS5zdHlsZXMuYnRuaG92ZXIpO1xuICAgICAgICAgIH19KShlbGVtKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vdGljZS5zdHlsZXMuYnRuYWN0aXZlKSB7XG4gICAgICAgICAgZWxlbS5vbihcIm1vdXNlZG93blwiLCAoZnVuY3Rpb24oZWxlbSl7IHJldHVybiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgZWxlbS5hZGRDbGFzcyhub3RpY2Uuc3R5bGVzLmJ0bmFjdGl2ZSk7XG4gICAgICAgICAgfX0pKGVsZW0pKS5vbihcIm1vdXNldXBcIiwgKGZ1bmN0aW9uKGVsZW0peyByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGVsZW0ucmVtb3ZlQ2xhc3Mobm90aWNlLnN0eWxlcy5idG5hY3RpdmUpO1xuICAgICAgICAgIH19KShlbGVtKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vdGljZS5zdHlsZXMuYnRuZm9jdXMpIHtcbiAgICAgICAgICBlbGVtLm9uKFwiZm9jdXNcIiwgKGZ1bmN0aW9uKGVsZW0peyByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGVsZW0uYWRkQ2xhc3Mobm90aWNlLnN0eWxlcy5idG5mb2N1cyk7XG4gICAgICAgICAgfX0pKGVsZW0pKS5vbihcImJsdXJcIiwgKGZ1bmN0aW9uKGVsZW0peyByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGVsZW0ucmVtb3ZlQ2xhc3Mobm90aWNlLnN0eWxlcy5idG5mb2N1cyk7XG4gICAgICAgICAgfX0pKGVsZW0pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgJC5leHRlbmQoUE5vdGlmeS5zdHlsaW5nLmJvb3RzdHJhcDMsIHtcbiAgICBidG46IFwiYnRuIGJ0bi1kZWZhdWx0XCIsXG4gICAgaW5wdXQ6IFwiZm9ybS1jb250cm9sXCJcbiAgfSk7XG4gICQuZXh0ZW5kKFBOb3RpZnkuc3R5bGluZy5mb250YXdlc29tZSwge1xuICAgIGJ0bjogXCJidG4gYnRuLWRlZmF1bHRcIixcbiAgICBpbnB1dDogXCJmb3JtLWNvbnRyb2xcIlxuICB9KTtcbiAgcmV0dXJuIFBOb3RpZnk7XG59KSk7XG4iXX0=