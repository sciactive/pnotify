'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Animate
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as a module.
    define('pnotify.animate', ['jquery', 'pnotify'], factory);
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
    // CommonJS
    module.exports = factory(require('jquery'), require('./pnotify'));
  } else {
    // Browser globals
    factory(root.jQuery, root.PNotify);
  }
})(typeof window !== "undefined" ? window : undefined, function ($, PNotify) {
  PNotify.prototype.options.animate = {
    // Use animate.css to animate the notice.
    animate: false,
    // The class to use to animate the notice in.
    in_class: "",
    // The class to use to animate the notice out.
    out_class: ""
  };
  PNotify.prototype.modules.animate = {
    init: function init(notice, options) {
      this.setUpAnimations(notice, options);

      notice.attention = function (aniClass, callback) {
        notice.elem.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
          notice.elem.removeClass(aniClass);
          if (callback) {
            callback.call(notice);
          }
        }).addClass("animated " + aniClass);
      };
    },

    update: function update(notice, options, oldOpts) {
      if (options.animate != oldOpts.animate) {
        this.setUpAnimations(notice, options);
      }
    },

    setUpAnimations: function setUpAnimations(notice, options) {
      if (options.animate) {
        notice.options.animation = "none";
        notice.elem.removeClass("ui-pnotify-fade-slow ui-pnotify-fade-normal ui-pnotify-fade-fast");
        if (!notice._animateIn) {
          notice._animateIn = notice.animateIn;
        }
        if (!notice._animateOut) {
          notice._animateOut = notice.animateOut;
        }
        notice.animateIn = this.animateIn.bind(this);
        notice.animateOut = this.animateOut.bind(this);
        var animSpeed = 400;
        if (notice.options.animate_speed === "slow") {
          animSpeed = 600;
        } else if (notice.options.animate_speed === "fast") {
          animSpeed = 200;
        } else if (notice.options.animate_speed > 0) {
          animSpeed = notice.options.animate_speed;
        }
        animSpeed = animSpeed / 1000;
        notice.elem.addClass("animated").css({
          "-webkit-animation-duration": animSpeed + "s",
          "-moz-animation-duration": animSpeed + "s",
          "animation-duration": animSpeed + "s"
        });
      } else if (notice._animateIn && notice._animateOut) {
        notice.animateIn = notice._animateIn;
        delete notice._animateIn;
        notice.animateOut = notice._animateOut;
        delete notice._animateOut;
        notice.elem.addClass("animated");
      }
    },

    animateIn: function animateIn(callback) {
      // Declare that the notice is animating in.
      this.notice.animating = "in";
      var that = this;
      callback = function () {
        that.notice.elem.removeClass(that.options.in_class);
        if (this) {
          this.call();
        }
        // Declare that the notice has completed animating.
        that.notice.animating = false;
      }.bind(callback);

      this.notice.elem.show().one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', callback).removeClass(this.options.out_class).addClass("ui-pnotify-in").addClass(this.options.in_class);
    },

    animateOut: function animateOut(callback) {
      // Declare that the notice is animating out.
      this.notice.animating = "out";
      var that = this;
      callback = function () {
        that.notice.elem.removeClass("ui-pnotify-in " + that.options.out_class);
        if (this) {
          this.call();
        }
        // Declare that the notice has completed animating.
        that.notice.animating = false;
      }.bind(callback);

      this.notice.elem.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', callback).removeClass(this.options.in_class).addClass(this.options.out_class);
    }
  };
  return PNotify;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBub3RpZnkuYW5pbWF0ZS5qcyJdLCJuYW1lcyI6WyJyb290IiwiZmFjdG9yeSIsImRlZmluZSIsImFtZCIsImV4cG9ydHMiLCJtb2R1bGUiLCJyZXF1aXJlIiwialF1ZXJ5IiwiUE5vdGlmeSIsIndpbmRvdyIsIiQiLCJwcm90b3R5cGUiLCJvcHRpb25zIiwiYW5pbWF0ZSIsImluX2NsYXNzIiwib3V0X2NsYXNzIiwibW9kdWxlcyIsImluaXQiLCJub3RpY2UiLCJzZXRVcEFuaW1hdGlvbnMiLCJhdHRlbnRpb24iLCJhbmlDbGFzcyIsImNhbGxiYWNrIiwiZWxlbSIsIm9uZSIsInJlbW92ZUNsYXNzIiwiY2FsbCIsImFkZENsYXNzIiwidXBkYXRlIiwib2xkT3B0cyIsImFuaW1hdGlvbiIsIl9hbmltYXRlSW4iLCJhbmltYXRlSW4iLCJfYW5pbWF0ZU91dCIsImFuaW1hdGVPdXQiLCJiaW5kIiwiYW5pbVNwZWVkIiwiYW5pbWF0ZV9zcGVlZCIsImNzcyIsImFuaW1hdGluZyIsInRoYXQiLCJzaG93Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQyxXQUFVQSxJQUFWLEVBQWdCQyxPQUFoQixFQUF5QjtBQUN4QixNQUFJLE9BQU9DLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0NBLE9BQU9DLEdBQTNDLEVBQWdEO0FBQzlDO0FBQ0FELFdBQU8saUJBQVAsRUFBMEIsQ0FBQyxRQUFELEVBQVcsU0FBWCxDQUExQixFQUFpREQsT0FBakQ7QUFDRCxHQUhELE1BR08sSUFBSSxRQUFPRyxPQUFQLHlDQUFPQSxPQUFQLE9BQW1CLFFBQW5CLElBQStCLE9BQU9DLE1BQVAsS0FBa0IsV0FBckQsRUFBa0U7QUFDdkU7QUFDQUEsV0FBT0QsT0FBUCxHQUFpQkgsUUFBUUssUUFBUSxRQUFSLENBQVIsRUFBMkJBLFFBQVEsV0FBUixDQUEzQixDQUFqQjtBQUNELEdBSE0sTUFHQTtBQUNMO0FBQ0FMLFlBQVFELEtBQUtPLE1BQWIsRUFBcUJQLEtBQUtRLE9BQTFCO0FBQ0Q7QUFD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QXdCLEtBQXhCO0FBQ0QsT0FQVSxDQU9SSixJQVBRLENBT0hiLFFBUEcsQ0FBWDs7QUFTQSxXQUFLSixNQUFMLENBQVlLLElBQVosQ0FBaUJDLEdBQWpCLENBQXFCLDhFQUFyQixFQUFxR0YsUUFBckcsRUFBK0dHLFdBQS9HLENBQTJILEtBQUtiLE9BQUwsQ0FBYUUsUUFBeEksRUFBa0phLFFBQWxKLENBQTJKLEtBQUtmLE9BQUwsQ0FBYUcsU0FBeEs7QUFDRDtBQXJGaUMsR0FBcEM7QUF1RkEsU0FBT1AsT0FBUDtBQUNELENBNUdBLENBQUQiLCJmaWxlIjoic3JjL3Bub3RpZnkuYW5pbWF0ZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBbmltYXRlXG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYSBtb2R1bGUuXG4gICAgZGVmaW5lKCdwbm90aWZ5LmFuaW1hdGUnLCBbJ2pxdWVyeScsICdwbm90aWZ5J10sIGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ2pxdWVyeScpLCByZXF1aXJlKCcuL3Bub3RpZnknKSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gQnJvd3NlciBnbG9iYWxzXG4gICAgZmFjdG9yeShyb290LmpRdWVyeSwgcm9vdC5QTm90aWZ5KTtcbiAgfVxufSh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdGhpcywgZnVuY3Rpb24oJCwgUE5vdGlmeSl7XG4gIFBOb3RpZnkucHJvdG90eXBlLm9wdGlvbnMuYW5pbWF0ZSA9IHtcbiAgICAvLyBVc2UgYW5pbWF0ZS5jc3MgdG8gYW5pbWF0ZSB0aGUgbm90aWNlLlxuICAgIGFuaW1hdGU6IGZhbHNlLFxuICAgIC8vIFRoZSBjbGFzcyB0byB1c2UgdG8gYW5pbWF0ZSB0aGUgbm90aWNlIGluLlxuICAgIGluX2NsYXNzOiBcIlwiLFxuICAgIC8vIFRoZSBjbGFzcyB0byB1c2UgdG8gYW5pbWF0ZSB0aGUgbm90aWNlIG91dC5cbiAgICBvdXRfY2xhc3M6IFwiXCJcbiAgfTtcbiAgUE5vdGlmeS5wcm90b3R5cGUubW9kdWxlcy5hbmltYXRlID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uKG5vdGljZSwgb3B0aW9ucyl7XG4gICAgICB0aGlzLnNldFVwQW5pbWF0aW9ucyhub3RpY2UsIG9wdGlvbnMpO1xuXG4gICAgICBub3RpY2UuYXR0ZW50aW9uID0gZnVuY3Rpb24oYW5pQ2xhc3MsIGNhbGxiYWNrKXtcbiAgICAgICAgbm90aWNlLmVsZW0ub25lKCd3ZWJraXRBbmltYXRpb25FbmQgbW96QW5pbWF0aW9uRW5kIE1TQW5pbWF0aW9uRW5kIG9hbmltYXRpb25lbmQgYW5pbWF0aW9uZW5kJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICBub3RpY2UuZWxlbS5yZW1vdmVDbGFzcyhhbmlDbGFzcyk7XG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKG5vdGljZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KS5hZGRDbGFzcyhcImFuaW1hdGVkIFwiK2FuaUNsYXNzKTtcbiAgICAgIH07XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24obm90aWNlLCBvcHRpb25zLCBvbGRPcHRzKXtcbiAgICAgIGlmIChvcHRpb25zLmFuaW1hdGUgIT0gb2xkT3B0cy5hbmltYXRlKSB7XG4gICAgICAgIHRoaXMuc2V0VXBBbmltYXRpb25zKG5vdGljZSwgb3B0aW9ucylcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0VXBBbmltYXRpb25zOiBmdW5jdGlvbihub3RpY2UsIG9wdGlvbnMpe1xuICAgICAgaWYgKG9wdGlvbnMuYW5pbWF0ZSkge1xuICAgICAgICBub3RpY2Uub3B0aW9ucy5hbmltYXRpb24gPSBcIm5vbmVcIjtcbiAgICAgICAgbm90aWNlLmVsZW0ucmVtb3ZlQ2xhc3MoXCJ1aS1wbm90aWZ5LWZhZGUtc2xvdyB1aS1wbm90aWZ5LWZhZGUtbm9ybWFsIHVpLXBub3RpZnktZmFkZS1mYXN0XCIpO1xuICAgICAgICBpZiAoIW5vdGljZS5fYW5pbWF0ZUluKSB7XG4gICAgICAgICAgbm90aWNlLl9hbmltYXRlSW4gPSBub3RpY2UuYW5pbWF0ZUluO1xuICAgICAgICB9XG4gICAgICAgIGlmICghbm90aWNlLl9hbmltYXRlT3V0KSB7XG4gICAgICAgICAgbm90aWNlLl9hbmltYXRlT3V0ID0gbm90aWNlLmFuaW1hdGVPdXQ7XG4gICAgICAgIH1cbiAgICAgICAgbm90aWNlLmFuaW1hdGVJbiA9IHRoaXMuYW5pbWF0ZUluLmJpbmQodGhpcyk7XG4gICAgICAgIG5vdGljZS5hbmltYXRlT3V0ID0gdGhpcy5hbmltYXRlT3V0LmJpbmQodGhpcyk7XG4gICAgICAgIHZhciBhbmltU3BlZWQgPSA0MDA7XG4gICAgICAgIGlmIChub3RpY2Uub3B0aW9ucy5hbmltYXRlX3NwZWVkID09PSBcInNsb3dcIikge1xuICAgICAgICAgIGFuaW1TcGVlZCA9IDYwMDtcbiAgICAgICAgfSBlbHNlIGlmIChub3RpY2Uub3B0aW9ucy5hbmltYXRlX3NwZWVkID09PSBcImZhc3RcIikge1xuICAgICAgICAgIGFuaW1TcGVlZCA9IDIwMDtcbiAgICAgICAgfSBlbHNlIGlmIChub3RpY2Uub3B0aW9ucy5hbmltYXRlX3NwZWVkID4gMCkge1xuICAgICAgICAgIGFuaW1TcGVlZCA9IG5vdGljZS5vcHRpb25zLmFuaW1hdGVfc3BlZWQ7XG4gICAgICAgIH1cbiAgICAgICAgYW5pbVNwZWVkID0gYW5pbVNwZWVkIC8gMTAwMDtcbiAgICAgICAgbm90aWNlLmVsZW0uYWRkQ2xhc3MoXCJhbmltYXRlZFwiKS5jc3Moe1xuICAgICAgICAgIFwiLXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb25cIjogYW5pbVNwZWVkK1wic1wiLFxuICAgICAgICAgIFwiLW1vei1hbmltYXRpb24tZHVyYXRpb25cIjogYW5pbVNwZWVkK1wic1wiLFxuICAgICAgICAgIFwiYW5pbWF0aW9uLWR1cmF0aW9uXCI6IGFuaW1TcGVlZCtcInNcIlxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAobm90aWNlLl9hbmltYXRlSW4gJiYgbm90aWNlLl9hbmltYXRlT3V0KSB7XG4gICAgICAgIG5vdGljZS5hbmltYXRlSW4gPSBub3RpY2UuX2FuaW1hdGVJbjtcbiAgICAgICAgZGVsZXRlIG5vdGljZS5fYW5pbWF0ZUluO1xuICAgICAgICBub3RpY2UuYW5pbWF0ZU91dCA9IG5vdGljZS5fYW5pbWF0ZU91dDtcbiAgICAgICAgZGVsZXRlIG5vdGljZS5fYW5pbWF0ZU91dDtcbiAgICAgICAgbm90aWNlLmVsZW0uYWRkQ2xhc3MoXCJhbmltYXRlZFwiKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYW5pbWF0ZUluOiBmdW5jdGlvbihjYWxsYmFjayl7XG4gICAgICAvLyBEZWNsYXJlIHRoYXQgdGhlIG5vdGljZSBpcyBhbmltYXRpbmcgaW4uXG4gICAgICB0aGlzLm5vdGljZS5hbmltYXRpbmcgPSBcImluXCI7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBjYWxsYmFjayA9IChmdW5jdGlvbigpe1xuICAgICAgICB0aGF0Lm5vdGljZS5lbGVtLnJlbW92ZUNsYXNzKHRoYXQub3B0aW9ucy5pbl9jbGFzcyk7XG4gICAgICAgIGlmICh0aGlzKSB7XG4gICAgICAgICAgdGhpcy5jYWxsKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRGVjbGFyZSB0aGF0IHRoZSBub3RpY2UgaGFzIGNvbXBsZXRlZCBhbmltYXRpbmcuXG4gICAgICAgIHRoYXQubm90aWNlLmFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgfSkuYmluZChjYWxsYmFjayk7XG5cbiAgICAgIHRoaXMubm90aWNlLmVsZW0uc2hvdygpLm9uZSgnd2Via2l0QW5pbWF0aW9uRW5kIG1vekFuaW1hdGlvbkVuZCBNU0FuaW1hdGlvbkVuZCBvYW5pbWF0aW9uZW5kIGFuaW1hdGlvbmVuZCcsIGNhbGxiYWNrKS5yZW1vdmVDbGFzcyh0aGlzLm9wdGlvbnMub3V0X2NsYXNzKS5hZGRDbGFzcyhcInVpLXBub3RpZnktaW5cIikuYWRkQ2xhc3ModGhpcy5vcHRpb25zLmluX2NsYXNzKTtcbiAgICB9LFxuXG4gICAgYW5pbWF0ZU91dDogZnVuY3Rpb24oY2FsbGJhY2spe1xuICAgICAgLy8gRGVjbGFyZSB0aGF0IHRoZSBub3RpY2UgaXMgYW5pbWF0aW5nIG91dC5cbiAgICAgIHRoaXMubm90aWNlLmFuaW1hdGluZyA9IFwib3V0XCI7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBjYWxsYmFjayA9IChmdW5jdGlvbigpe1xuICAgICAgICB0aGF0Lm5vdGljZS5lbGVtLnJlbW92ZUNsYXNzKFwidWktcG5vdGlmeS1pbiBcIiArIHRoYXQub3B0aW9ucy5vdXRfY2xhc3MpO1xuICAgICAgICBpZiAodGhpcykge1xuICAgICAgICAgIHRoaXMuY2FsbCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIERlY2xhcmUgdGhhdCB0aGUgbm90aWNlIGhhcyBjb21wbGV0ZWQgYW5pbWF0aW5nLlxuICAgICAgICB0aGF0Lm5vdGljZS5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgIH0pLmJpbmQoY2FsbGJhY2spO1xuXG4gICAgICB0aGlzLm5vdGljZS5lbGVtLm9uZSgnd2Via2l0QW5pbWF0aW9uRW5kIG1vekFuaW1hdGlvbkVuZCBNU0FuaW1hdGlvbkVuZCBvYW5pbWF0aW9uZW5kIGFuaW1hdGlvbmVuZCcsIGNhbGxiYWNrKS5yZW1vdmVDbGFzcyh0aGlzLm9wdGlvbnMuaW5fY2xhc3MpLmFkZENsYXNzKHRoaXMub3B0aW9ucy5vdXRfY2xhc3MpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIFBOb3RpZnk7XG59KSk7XG4iXX0=