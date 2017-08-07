'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Mobile
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as a module.
    define('pnotify.mobile', ['jquery', 'pnotify'], factory);
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
    // CommonJS
    module.exports = factory(require('jquery'), require('./pnotify'));
  } else {
    // Browser globals
    factory(root.jQuery, root.PNotify);
  }
})(typeof window !== "undefined" ? window : undefined, function ($, PNotify) {
  PNotify.prototype.options.mobile = {
    // Let the user swipe the notice away.
    swipe_dismiss: true,
    // Styles the notice to look good on mobile.
    styling: true
  };
  PNotify.prototype.modules.mobile = {
    init: function init(notice, options) {
      var that = this,
          origX = null,
          diffX = null,
          noticeWidth = null;

      this.swipe_dismiss = options.swipe_dismiss;
      this.doMobileStyling(notice, options);

      notice.elem.on({
        "touchstart": function touchstart(e) {
          if (!that.swipe_dismiss) {
            return;
          }

          origX = e.originalEvent.touches[0].screenX;
          noticeWidth = notice.elem.width();
          notice.container.css("left", "0");
        },
        "touchmove": function touchmove(e) {
          if (!origX || !that.swipe_dismiss) {
            return;
          }

          var curX = e.originalEvent.touches[0].screenX;

          diffX = curX - origX;
          var opacity = (1 - Math.abs(diffX) / noticeWidth) * notice.options.opacity;

          notice.elem.css("opacity", opacity);
          notice.container.css("left", diffX);
        },
        "touchend": function touchend() {
          if (!origX || !that.swipe_dismiss) {
            return;
          }

          if (Math.abs(diffX) > 40) {
            var goLeft = diffX < 0 ? noticeWidth * -2 : noticeWidth * 2;
            notice.elem.animate({ "opacity": 0 }, 100);
            notice.container.animate({ "left": goLeft }, 100);
            notice.remove();
          } else {
            notice.elem.animate({ "opacity": notice.options.opacity }, 100);
            notice.container.animate({ "left": 0 }, 100);
          }
          origX = null;
          diffX = null;
          noticeWidth = null;
        },
        "touchcancel": function touchcancel() {
          if (!origX || !that.swipe_dismiss) {
            return;
          }

          notice.elem.animate({ "opacity": notice.options.opacity }, 100);
          notice.container.animate({ "left": 0 }, 100);
          origX = null;
          diffX = null;
          noticeWidth = null;
        }
      });
    },
    update: function update(notice, options) {
      this.swipe_dismiss = options.swipe_dismiss;
      this.doMobileStyling(notice, options);
    },
    doMobileStyling: function doMobileStyling(notice, options) {
      if (options.styling) {
        notice.elem.addClass("ui-pnotify-mobile-able");

        if ($(window).width() <= 480) {
          if (!notice.options.stack.mobileOrigSpacing1) {
            notice.options.stack.mobileOrigSpacing1 = notice.options.stack.spacing1;
            notice.options.stack.mobileOrigSpacing2 = notice.options.stack.spacing2;
          }
          notice.options.stack.spacing1 = 0;
          notice.options.stack.spacing2 = 0;
        } else if (notice.options.stack.mobileOrigSpacing1 || notice.options.stack.mobileOrigSpacing2) {
          notice.options.stack.spacing1 = notice.options.stack.mobileOrigSpacing1;
          delete notice.options.stack.mobileOrigSpacing1;
          notice.options.stack.spacing2 = notice.options.stack.mobileOrigSpacing2;
          delete notice.options.stack.mobileOrigSpacing2;
        }
      } else {
        notice.elem.removeClass("ui-pnotify-mobile-able");

        if (notice.options.stack.mobileOrigSpacing1) {
          notice.options.stack.spacing1 = notice.options.stack.mobileOrigSpacing1;
          delete notice.options.stack.mobileOrigSpacing1;
        }
        if (notice.options.stack.mobileOrigSpacing2) {
          notice.options.stack.spacing2 = notice.options.stack.mobileOrigSpacing2;
          delete notice.options.stack.mobileOrigSpacing2;
        }
      }
    }
  };
  return PNotify;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBub3RpZnkubW9iaWxlLmpzIl0sIm5hbWVzIjpbInJvb3QiLCJmYWN0b3J5IiwiZGVmaW5lIiwiYW1kIiwiZXhwb3J0cyIsIm1vZHVsZSIsInJlcXVpcmUiLCJqUXVlcnkiLCJQTm90aWZ5Iiwid2luZG93IiwiJCIsInByb3RvdHlwZSIsIm9wdGlvbnMiLCJtb2JpbGUiLCJzd2lwZV9kaXNtaXNzIiwic3R5bGluZyIsIm1vZHVsZXMiLCJpbml0Iiwibm90aWNlIiwidGhhdCIsIm9yaWdYIiwiZGlmZlgiLCJub3RpY2VXaWR0aCIsImRvTW9iaWxlU3R5bGluZyIsImVsZW0iLCJvbiIsImUiLCJvcmlnaW5hbEV2ZW50IiwidG91Y2hlcyIsInNjcmVlblgiLCJ3aWR0aCIsImNvbnRhaW5lciIsImNzcyIsImN1clgiLCJvcGFjaXR5IiwiTWF0aCIsImFicyIsImdvTGVmdCIsImFuaW1hdGUiLCJyZW1vdmUiLCJ1cGRhdGUiLCJhZGRDbGFzcyIsInN0YWNrIiwibW9iaWxlT3JpZ1NwYWNpbmcxIiwic3BhY2luZzEiLCJtb2JpbGVPcmlnU3BhY2luZzIiLCJzcGFjaW5nMiIsInJlbW92ZUNsYXNzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQyxXQUFVQSxJQUFWLEVBQWdCQyxPQUFoQixFQUF5QjtBQUN4QixNQUFJLE9BQU9DLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0NBLE9BQU9DLEdBQTNDLEVBQWdEO0FBQzlDO0FBQ0FELFdBQU8sZ0JBQVAsRUFBeUIsQ0FBQyxRQUFELEVBQVcsU0FBWCxDQUF6QixFQUFnREQsT0FBaEQ7QUFDRCxHQUhELE1BR08sSUFBSSxRQUFPRyxPQUFQLHlDQUFPQSxPQUFQLE9BQW1CLFFBQW5CLElBQStCLE9BQU9DLE1BQVAsS0FBa0IsV0FBckQsRUFBa0U7QUFDdkU7QUFDQUEsV0FBT0QsT0FBUCxHQUFpQkgsUUFBUUssUUFBUSxRQUFSLENBQVIsRUFBMkJBLFFBQVEsV0FBUixDQUEzQixDQUFqQjtBQUNELEdBSE0sTUFHQTtBQUNMO0FBQ0FMLFlBQVFELEtBQUtPLE1BQWIsRUFBcUJQLEtBQUtRLE9BQTFCO0FBQ0Q7QUFDRixDQVhBLEVBV0MsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixHQUFnQ0EsTUFBaEMsWUFYRCxFQVdnRCxVQUFTQyxDQUFULEVBQVlGLE9BQVosRUFBb0I7QUFDbkVBLFVBQVFHLFNBQVIsQ0FBa0JDLE9BQWxCLENBQTBCQyxNQUExQixHQUFtQztBQUNqQztBQUNBQyxtQkFBZSxJQUZrQjtBQUdqQztBQUNBQyxhQUFTO0FBSndCLEdBQW5DO0FBTUFQLFVBQVFHLFNBQVIsQ0FBa0JLLE9BQWxCLENBQTBCSCxNQUExQixHQUFtQztBQUNqQ0ksVUFBTSxjQUFTQyxNQUFULEVBQWlCTixPQUFqQixFQUF5QjtBQUM3QixVQUFJTyxPQUFPLElBQVg7QUFBQSxVQUNJQyxRQUFRLElBRFo7QUFBQSxVQUVJQyxRQUFRLElBRlo7QUFBQSxVQUdJQyxjQUFjLElBSGxCOztBQUtBLFdBQUtSLGFBQUwsR0FBcUJGLFFBQVFFLGFBQTdCO0FBQ0EsV0FBS1MsZUFBTCxDQUFxQkwsTUFBckIsRUFBNkJOLE9BQTdCOztBQUVBTSxhQUFPTSxJQUFQLENBQVlDLEVBQVosQ0FBZTtBQUNiLHNCQUFjLG9CQUFTQyxDQUFULEVBQVc7QUFDdkIsY0FBSSxDQUFDUCxLQUFLTCxhQUFWLEVBQXlCO0FBQ3ZCO0FBQ0Q7O0FBRURNLGtCQUFRTSxFQUFFQyxhQUFGLENBQWdCQyxPQUFoQixDQUF3QixDQUF4QixFQUEyQkMsT0FBbkM7QUFDQVAsd0JBQWNKLE9BQU9NLElBQVAsQ0FBWU0sS0FBWixFQUFkO0FBQ0FaLGlCQUFPYSxTQUFQLENBQWlCQyxHQUFqQixDQUFxQixNQUFyQixFQUE2QixHQUE3QjtBQUNELFNBVFk7QUFVYixxQkFBYSxtQkFBU04sQ0FBVCxFQUFXO0FBQ3RCLGNBQUksQ0FBQ04sS0FBRCxJQUFVLENBQUNELEtBQUtMLGFBQXBCLEVBQW1DO0FBQ2pDO0FBQ0Q7O0FBRUQsY0FBSW1CLE9BQU9QLEVBQUVDLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCLENBQXhCLEVBQTJCQyxPQUF0Qzs7QUFFQVIsa0JBQVFZLE9BQU9iLEtBQWY7QUFDQSxjQUFJYyxVQUFVLENBQUMsSUFBS0MsS0FBS0MsR0FBTCxDQUFTZixLQUFULElBQWtCQyxXQUF4QixJQUF3Q0osT0FBT04sT0FBUCxDQUFlc0IsT0FBckU7O0FBRUFoQixpQkFBT00sSUFBUCxDQUFZUSxHQUFaLENBQWdCLFNBQWhCLEVBQTJCRSxPQUEzQjtBQUNBaEIsaUJBQU9hLFNBQVAsQ0FBaUJDLEdBQWpCLENBQXFCLE1BQXJCLEVBQTZCWCxLQUE3QjtBQUNELFNBdEJZO0FBdUJiLG9CQUFZLG9CQUFXO0FBQ3JCLGNBQUksQ0FBQ0QsS0FBRCxJQUFVLENBQUNELEtBQUtMLGFBQXBCLEVBQW1DO0FBQ2pDO0FBQ0Q7O0FBRUQsY0FBSXFCLEtBQUtDLEdBQUwsQ0FBU2YsS0FBVCxJQUFrQixFQUF0QixFQUEwQjtBQUN4QixnQkFBSWdCLFNBQVVoQixRQUFRLENBQVQsR0FBY0MsY0FBYyxDQUFDLENBQTdCLEdBQWlDQSxjQUFjLENBQTVEO0FBQ0FKLG1CQUFPTSxJQUFQLENBQVljLE9BQVosQ0FBb0IsRUFBQyxXQUFXLENBQVosRUFBcEIsRUFBb0MsR0FBcEM7QUFDQXBCLG1CQUFPYSxTQUFQLENBQWlCTyxPQUFqQixDQUF5QixFQUFDLFFBQVFELE1BQVQsRUFBekIsRUFBMkMsR0FBM0M7QUFDQW5CLG1CQUFPcUIsTUFBUDtBQUNELFdBTEQsTUFLTztBQUNMckIsbUJBQU9NLElBQVAsQ0FBWWMsT0FBWixDQUFvQixFQUFDLFdBQVdwQixPQUFPTixPQUFQLENBQWVzQixPQUEzQixFQUFwQixFQUF5RCxHQUF6RDtBQUNBaEIsbUJBQU9hLFNBQVAsQ0FBaUJPLE9BQWpCLENBQXlCLEVBQUMsUUFBUSxDQUFULEVBQXpCLEVBQXNDLEdBQXRDO0FBQ0Q7QUFDRGxCLGtCQUFRLElBQVI7QUFDQUMsa0JBQVEsSUFBUjtBQUNBQyx3QkFBYyxJQUFkO0FBQ0QsU0F4Q1k7QUF5Q2IsdUJBQWUsdUJBQVU7QUFDdkIsY0FBSSxDQUFDRixLQUFELElBQVUsQ0FBQ0QsS0FBS0wsYUFBcEIsRUFBbUM7QUFDakM7QUFDRDs7QUFFREksaUJBQU9NLElBQVAsQ0FBWWMsT0FBWixDQUFvQixFQUFDLFdBQVdwQixPQUFPTixPQUFQLENBQWVzQixPQUEzQixFQUFwQixFQUF5RCxHQUF6RDtBQUNBaEIsaUJBQU9hLFNBQVAsQ0FBaUJPLE9BQWpCLENBQXlCLEVBQUMsUUFBUSxDQUFULEVBQXpCLEVBQXNDLEdBQXRDO0FBQ0FsQixrQkFBUSxJQUFSO0FBQ0FDLGtCQUFRLElBQVI7QUFDQUMsd0JBQWMsSUFBZDtBQUNEO0FBbkRZLE9BQWY7QUFxREQsS0EvRGdDO0FBZ0VqQ2tCLFlBQVEsZ0JBQVN0QixNQUFULEVBQWlCTixPQUFqQixFQUF5QjtBQUMvQixXQUFLRSxhQUFMLEdBQXFCRixRQUFRRSxhQUE3QjtBQUNBLFdBQUtTLGVBQUwsQ0FBcUJMLE1BQXJCLEVBQTZCTixPQUE3QjtBQUNELEtBbkVnQztBQW9FakNXLHFCQUFpQix5QkFBU0wsTUFBVCxFQUFpQk4sT0FBakIsRUFBeUI7QUFDeEMsVUFBSUEsUUFBUUcsT0FBWixFQUFxQjtBQUNuQkcsZUFBT00sSUFBUCxDQUFZaUIsUUFBWixDQUFxQix3QkFBckI7O0FBRUEsWUFBSS9CLEVBQUVELE1BQUYsRUFBVXFCLEtBQVYsTUFBcUIsR0FBekIsRUFBOEI7QUFDNUIsY0FBSSxDQUFDWixPQUFPTixPQUFQLENBQWU4QixLQUFmLENBQXFCQyxrQkFBMUIsRUFBOEM7QUFDNUN6QixtQkFBT04sT0FBUCxDQUFlOEIsS0FBZixDQUFxQkMsa0JBQXJCLEdBQTBDekIsT0FBT04sT0FBUCxDQUFlOEIsS0FBZixDQUFxQkUsUUFBL0Q7QUFDQTFCLG1CQUFPTixPQUFQLENBQWU4QixLQUFmLENBQXFCRyxrQkFBckIsR0FBMEMzQixPQUFPTixPQUFQLENBQWU4QixLQUFmLENBQXFCSSxRQUEvRDtBQUNEO0FBQ0Q1QixpQkFBT04sT0FBUCxDQUFlOEIsS0FBZixDQUFxQkUsUUFBckIsR0FBZ0MsQ0FBaEM7QUFDQTFCLGlCQUFPTixPQUFQLENBQWU4QixLQUFmLENBQXFCSSxRQUFyQixHQUFnQyxDQUFoQztBQUNELFNBUEQsTUFPTyxJQUFJNUIsT0FBT04sT0FBUCxDQUFlOEIsS0FBZixDQUFxQkMsa0JBQXJCLElBQTJDekIsT0FBT04sT0FBUCxDQUFlOEIsS0FBZixDQUFxQkcsa0JBQXBFLEVBQXdGO0FBQzdGM0IsaUJBQU9OLE9BQVAsQ0FBZThCLEtBQWYsQ0FBcUJFLFFBQXJCLEdBQWdDMUIsT0FBT04sT0FBUCxDQUFlOEIsS0FBZixDQUFxQkMsa0JBQXJEO0FBQ0EsaUJBQU96QixPQUFPTixPQUFQLENBQWU4QixLQUFmLENBQXFCQyxrQkFBNUI7QUFDQXpCLGlCQUFPTixPQUFQLENBQWU4QixLQUFmLENBQXFCSSxRQUFyQixHQUFnQzVCLE9BQU9OLE9BQVAsQ0FBZThCLEtBQWYsQ0FBcUJHLGtCQUFyRDtBQUNBLGlCQUFPM0IsT0FBT04sT0FBUCxDQUFlOEIsS0FBZixDQUFxQkcsa0JBQTVCO0FBQ0Q7QUFDRixPQWhCRCxNQWdCTztBQUNMM0IsZUFBT00sSUFBUCxDQUFZdUIsV0FBWixDQUF3Qix3QkFBeEI7O0FBRUEsWUFBSTdCLE9BQU9OLE9BQVAsQ0FBZThCLEtBQWYsQ0FBcUJDLGtCQUF6QixFQUE2QztBQUMzQ3pCLGlCQUFPTixPQUFQLENBQWU4QixLQUFmLENBQXFCRSxRQUFyQixHQUFnQzFCLE9BQU9OLE9BQVAsQ0FBZThCLEtBQWYsQ0FBcUJDLGtCQUFyRDtBQUNBLGlCQUFPekIsT0FBT04sT0FBUCxDQUFlOEIsS0FBZixDQUFxQkMsa0JBQTVCO0FBQ0Q7QUFDRCxZQUFJekIsT0FBT04sT0FBUCxDQUFlOEIsS0FBZixDQUFxQkcsa0JBQXpCLEVBQTZDO0FBQzNDM0IsaUJBQU9OLE9BQVAsQ0FBZThCLEtBQWYsQ0FBcUJJLFFBQXJCLEdBQWdDNUIsT0FBT04sT0FBUCxDQUFlOEIsS0FBZixDQUFxQkcsa0JBQXJEO0FBQ0EsaUJBQU8zQixPQUFPTixPQUFQLENBQWU4QixLQUFmLENBQXFCRyxrQkFBNUI7QUFDRDtBQUNGO0FBQ0Y7QUFqR2dDLEdBQW5DO0FBbUdBLFNBQU9yQyxPQUFQO0FBQ0QsQ0F0SEEsQ0FBRCIsImZpbGUiOiJzcmMvcG5vdGlmeS5tb2JpbGUuanMiLCJzb3VyY2VSb290IjoiLi4vIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTW9iaWxlXG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYSBtb2R1bGUuXG4gICAgZGVmaW5lKCdwbm90aWZ5Lm1vYmlsZScsIFsnanF1ZXJ5JywgJ3Bub3RpZnknXSwgZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JyksIHJlcXVpcmUoJy4vcG5vdGlmeScpKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbHNcbiAgICBmYWN0b3J5KHJvb3QualF1ZXJ5LCByb290LlBOb3RpZnkpO1xuICB9XG59KHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB0aGlzLCBmdW5jdGlvbigkLCBQTm90aWZ5KXtcbiAgUE5vdGlmeS5wcm90b3R5cGUub3B0aW9ucy5tb2JpbGUgPSB7XG4gICAgLy8gTGV0IHRoZSB1c2VyIHN3aXBlIHRoZSBub3RpY2UgYXdheS5cbiAgICBzd2lwZV9kaXNtaXNzOiB0cnVlLFxuICAgIC8vIFN0eWxlcyB0aGUgbm90aWNlIHRvIGxvb2sgZ29vZCBvbiBtb2JpbGUuXG4gICAgc3R5bGluZzogdHJ1ZVxuICB9O1xuICBQTm90aWZ5LnByb3RvdHlwZS5tb2R1bGVzLm1vYmlsZSA9IHtcbiAgICBpbml0OiBmdW5jdGlvbihub3RpY2UsIG9wdGlvbnMpe1xuICAgICAgdmFyIHRoYXQgPSB0aGlzLFxuICAgICAgICAgIG9yaWdYID0gbnVsbCxcbiAgICAgICAgICBkaWZmWCA9IG51bGwsXG4gICAgICAgICAgbm90aWNlV2lkdGggPSBudWxsO1xuXG4gICAgICB0aGlzLnN3aXBlX2Rpc21pc3MgPSBvcHRpb25zLnN3aXBlX2Rpc21pc3M7XG4gICAgICB0aGlzLmRvTW9iaWxlU3R5bGluZyhub3RpY2UsIG9wdGlvbnMpO1xuXG4gICAgICBub3RpY2UuZWxlbS5vbih7XG4gICAgICAgIFwidG91Y2hzdGFydFwiOiBmdW5jdGlvbihlKXtcbiAgICAgICAgICBpZiAoIXRoYXQuc3dpcGVfZGlzbWlzcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG9yaWdYID0gZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0uc2NyZWVuWDtcbiAgICAgICAgICBub3RpY2VXaWR0aCA9IG5vdGljZS5lbGVtLndpZHRoKCk7XG4gICAgICAgICAgbm90aWNlLmNvbnRhaW5lci5jc3MoXCJsZWZ0XCIsIFwiMFwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0b3VjaG1vdmVcIjogZnVuY3Rpb24oZSl7XG4gICAgICAgICAgaWYgKCFvcmlnWCB8fCAhdGhhdC5zd2lwZV9kaXNtaXNzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGN1clggPSBlLm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXS5zY3JlZW5YO1xuXG4gICAgICAgICAgZGlmZlggPSBjdXJYIC0gb3JpZ1g7XG4gICAgICAgICAgdmFyIG9wYWNpdHkgPSAoMSAtIChNYXRoLmFicyhkaWZmWCkgLyBub3RpY2VXaWR0aCkpICogbm90aWNlLm9wdGlvbnMub3BhY2l0eTtcblxuICAgICAgICAgIG5vdGljZS5lbGVtLmNzcyhcIm9wYWNpdHlcIiwgb3BhY2l0eSk7XG4gICAgICAgICAgbm90aWNlLmNvbnRhaW5lci5jc3MoXCJsZWZ0XCIsIGRpZmZYKTtcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0b3VjaGVuZFwiOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoIW9yaWdYIHx8ICF0aGF0LnN3aXBlX2Rpc21pc3MpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoTWF0aC5hYnMoZGlmZlgpID4gNDApIHtcbiAgICAgICAgICAgIHZhciBnb0xlZnQgPSAoZGlmZlggPCAwKSA/IG5vdGljZVdpZHRoICogLTIgOiBub3RpY2VXaWR0aCAqIDI7XG4gICAgICAgICAgICBub3RpY2UuZWxlbS5hbmltYXRlKHtcIm9wYWNpdHlcIjogMH0sIDEwMCk7XG4gICAgICAgICAgICBub3RpY2UuY29udGFpbmVyLmFuaW1hdGUoe1wibGVmdFwiOiBnb0xlZnR9LCAxMDApO1xuICAgICAgICAgICAgbm90aWNlLnJlbW92ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub3RpY2UuZWxlbS5hbmltYXRlKHtcIm9wYWNpdHlcIjogbm90aWNlLm9wdGlvbnMub3BhY2l0eX0sIDEwMCk7XG4gICAgICAgICAgICBub3RpY2UuY29udGFpbmVyLmFuaW1hdGUoe1wibGVmdFwiOiAwfSwgMTAwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb3JpZ1ggPSBudWxsO1xuICAgICAgICAgIGRpZmZYID0gbnVsbDtcbiAgICAgICAgICBub3RpY2VXaWR0aCA9IG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIFwidG91Y2hjYW5jZWxcIjogZnVuY3Rpb24oKXtcbiAgICAgICAgICBpZiAoIW9yaWdYIHx8ICF0aGF0LnN3aXBlX2Rpc21pc3MpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBub3RpY2UuZWxlbS5hbmltYXRlKHtcIm9wYWNpdHlcIjogbm90aWNlLm9wdGlvbnMub3BhY2l0eX0sIDEwMCk7XG4gICAgICAgICAgbm90aWNlLmNvbnRhaW5lci5hbmltYXRlKHtcImxlZnRcIjogMH0sIDEwMCk7XG4gICAgICAgICAgb3JpZ1ggPSBudWxsO1xuICAgICAgICAgIGRpZmZYID0gbnVsbDtcbiAgICAgICAgICBub3RpY2VXaWR0aCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG4gICAgdXBkYXRlOiBmdW5jdGlvbihub3RpY2UsIG9wdGlvbnMpe1xuICAgICAgdGhpcy5zd2lwZV9kaXNtaXNzID0gb3B0aW9ucy5zd2lwZV9kaXNtaXNzO1xuICAgICAgdGhpcy5kb01vYmlsZVN0eWxpbmcobm90aWNlLCBvcHRpb25zKTtcbiAgICB9LFxuICAgIGRvTW9iaWxlU3R5bGluZzogZnVuY3Rpb24obm90aWNlLCBvcHRpb25zKXtcbiAgICAgIGlmIChvcHRpb25zLnN0eWxpbmcpIHtcbiAgICAgICAgbm90aWNlLmVsZW0uYWRkQ2xhc3MoXCJ1aS1wbm90aWZ5LW1vYmlsZS1hYmxlXCIpO1xuXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcbiAgICAgICAgICBpZiAoIW5vdGljZS5vcHRpb25zLnN0YWNrLm1vYmlsZU9yaWdTcGFjaW5nMSkge1xuICAgICAgICAgICAgbm90aWNlLm9wdGlvbnMuc3RhY2subW9iaWxlT3JpZ1NwYWNpbmcxID0gbm90aWNlLm9wdGlvbnMuc3RhY2suc3BhY2luZzE7XG4gICAgICAgICAgICBub3RpY2Uub3B0aW9ucy5zdGFjay5tb2JpbGVPcmlnU3BhY2luZzIgPSBub3RpY2Uub3B0aW9ucy5zdGFjay5zcGFjaW5nMjtcbiAgICAgICAgICB9XG4gICAgICAgICAgbm90aWNlLm9wdGlvbnMuc3RhY2suc3BhY2luZzEgPSAwO1xuICAgICAgICAgIG5vdGljZS5vcHRpb25zLnN0YWNrLnNwYWNpbmcyID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChub3RpY2Uub3B0aW9ucy5zdGFjay5tb2JpbGVPcmlnU3BhY2luZzEgfHwgbm90aWNlLm9wdGlvbnMuc3RhY2subW9iaWxlT3JpZ1NwYWNpbmcyKSB7XG4gICAgICAgICAgbm90aWNlLm9wdGlvbnMuc3RhY2suc3BhY2luZzEgPSBub3RpY2Uub3B0aW9ucy5zdGFjay5tb2JpbGVPcmlnU3BhY2luZzE7XG4gICAgICAgICAgZGVsZXRlIG5vdGljZS5vcHRpb25zLnN0YWNrLm1vYmlsZU9yaWdTcGFjaW5nMTtcbiAgICAgICAgICBub3RpY2Uub3B0aW9ucy5zdGFjay5zcGFjaW5nMiA9IG5vdGljZS5vcHRpb25zLnN0YWNrLm1vYmlsZU9yaWdTcGFjaW5nMjtcbiAgICAgICAgICBkZWxldGUgbm90aWNlLm9wdGlvbnMuc3RhY2subW9iaWxlT3JpZ1NwYWNpbmcyO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub3RpY2UuZWxlbS5yZW1vdmVDbGFzcyhcInVpLXBub3RpZnktbW9iaWxlLWFibGVcIik7XG5cbiAgICAgICAgaWYgKG5vdGljZS5vcHRpb25zLnN0YWNrLm1vYmlsZU9yaWdTcGFjaW5nMSkge1xuICAgICAgICAgIG5vdGljZS5vcHRpb25zLnN0YWNrLnNwYWNpbmcxID0gbm90aWNlLm9wdGlvbnMuc3RhY2subW9iaWxlT3JpZ1NwYWNpbmcxO1xuICAgICAgICAgIGRlbGV0ZSBub3RpY2Uub3B0aW9ucy5zdGFjay5tb2JpbGVPcmlnU3BhY2luZzE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vdGljZS5vcHRpb25zLnN0YWNrLm1vYmlsZU9yaWdTcGFjaW5nMikge1xuICAgICAgICAgIG5vdGljZS5vcHRpb25zLnN0YWNrLnNwYWNpbmcyID0gbm90aWNlLm9wdGlvbnMuc3RhY2subW9iaWxlT3JpZ1NwYWNpbmcyO1xuICAgICAgICAgIGRlbGV0ZSBub3RpY2Uub3B0aW9ucy5zdGFjay5tb2JpbGVPcmlnU3BhY2luZzI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIHJldHVybiBQTm90aWZ5O1xufSkpO1xuIl19