'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Callbacks
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as a module.
    define('pnotify.callbacks', ['jquery', 'pnotify'], factory);
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
    // CommonJS
    module.exports = factory(require('jquery'), require('./pnotify'));
  } else {
    // Browser globals
    factory(root.jQuery, root.PNotify);
  }
})(typeof window !== "undefined" ? window : undefined, function ($, PNotify) {
  var _init = PNotify.prototype.init,
      _open = PNotify.prototype.open,
      _remove = PNotify.prototype.remove;
  PNotify.prototype.init = function () {
    if (this.options.before_init) {
      this.options.before_init(this.options);
    }
    _init.apply(this, arguments);
    if (this.options.after_init) {
      this.options.after_init(this);
    }
  };
  PNotify.prototype.open = function () {
    var ret;
    if (this.options.before_open) {
      ret = this.options.before_open(this);
    }
    if (ret !== false) {
      _open.apply(this, arguments);
      if (this.options.after_open) {
        this.options.after_open(this);
      }
    }
  };
  PNotify.prototype.remove = function (timer_hide) {
    var ret;
    if (this.options.before_close) {
      ret = this.options.before_close(this, timer_hide);
    }
    if (ret !== false) {
      _remove.apply(this, arguments);
      if (this.options.after_close) {
        this.options.after_close(this, timer_hide);
      }
    }
  };
  return PNotify;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBub3RpZnkuY2FsbGJhY2tzLmpzIl0sIm5hbWVzIjpbInJvb3QiLCJmYWN0b3J5IiwiZGVmaW5lIiwiYW1kIiwiZXhwb3J0cyIsIm1vZHVsZSIsInJlcXVpcmUiLCJqUXVlcnkiLCJQTm90aWZ5Iiwid2luZG93IiwiJCIsIl9pbml0IiwicHJvdG90eXBlIiwiaW5pdCIsIl9vcGVuIiwib3BlbiIsIl9yZW1vdmUiLCJyZW1vdmUiLCJvcHRpb25zIiwiYmVmb3JlX2luaXQiLCJhcHBseSIsImFyZ3VtZW50cyIsImFmdGVyX2luaXQiLCJyZXQiLCJiZWZvcmVfb3BlbiIsImFmdGVyX29wZW4iLCJ0aW1lcl9oaWRlIiwiYmVmb3JlX2Nsb3NlIiwiYWZ0ZXJfY2xvc2UiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNDLFdBQVVBLElBQVYsRUFBZ0JDLE9BQWhCLEVBQXlCO0FBQ3hCLE1BQUksT0FBT0MsTUFBUCxLQUFrQixVQUFsQixJQUFnQ0EsT0FBT0MsR0FBM0MsRUFBZ0Q7QUFDOUM7QUFDQUQsV0FBTyxtQkFBUCxFQUE0QixDQUFDLFFBQUQsRUFBVyxTQUFYLENBQTVCLEVBQW1ERCxPQUFuRDtBQUNELEdBSEQsTUFHTyxJQUFJLFFBQU9HLE9BQVAseUNBQU9BLE9BQVAsT0FBbUIsUUFBbkIsSUFBK0IsT0FBT0MsTUFBUCxLQUFrQixXQUFyRCxFQUFrRTtBQUN2RTtBQUNBQSxXQUFPRCxPQUFQLEdBQWlCSCxRQUFRSyxRQUFRLFFBQVIsQ0FBUixFQUEyQkEsUUFBUSxXQUFSLENBQTNCLENBQWpCO0FBQ0QsR0FITSxNQUdBO0FBQ0w7QUFDQUwsWUFBUUQsS0FBS08sTUFBYixFQUFxQlAsS0FBS1EsT0FBMUI7QUFDRDtBQUNGLENBWEEsRUFXQyxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQSxNQUFoQyxZQVhELEVBV2dELFVBQVNDLENBQVQsRUFBWUYsT0FBWixFQUFvQjtBQUNuRSxNQUFJRyxRQUFVSCxRQUFRSSxTQUFSLENBQWtCQyxJQUFoQztBQUFBLE1BQ0lDLFFBQVVOLFFBQVFJLFNBQVIsQ0FBa0JHLElBRGhDO0FBQUEsTUFFSUMsVUFBVVIsUUFBUUksU0FBUixDQUFrQkssTUFGaEM7QUFHQVQsVUFBUUksU0FBUixDQUFrQkMsSUFBbEIsR0FBeUIsWUFBVTtBQUNqQyxRQUFJLEtBQUtLLE9BQUwsQ0FBYUMsV0FBakIsRUFBOEI7QUFDNUIsV0FBS0QsT0FBTCxDQUFhQyxXQUFiLENBQXlCLEtBQUtELE9BQTlCO0FBQ0Q7QUFDRFAsVUFBTVMsS0FBTixDQUFZLElBQVosRUFBa0JDLFNBQWxCO0FBQ0EsUUFBSSxLQUFLSCxPQUFMLENBQWFJLFVBQWpCLEVBQTZCO0FBQzNCLFdBQUtKLE9BQUwsQ0FBYUksVUFBYixDQUF3QixJQUF4QjtBQUNEO0FBQ0YsR0FSRDtBQVNBZCxVQUFRSSxTQUFSLENBQWtCRyxJQUFsQixHQUF5QixZQUFVO0FBQ2pDLFFBQUlRLEdBQUo7QUFDQSxRQUFJLEtBQUtMLE9BQUwsQ0FBYU0sV0FBakIsRUFBOEI7QUFDNUJELFlBQU0sS0FBS0wsT0FBTCxDQUFhTSxXQUFiLENBQXlCLElBQXpCLENBQU47QUFDRDtBQUNELFFBQUlELFFBQVEsS0FBWixFQUFtQjtBQUNqQlQsWUFBTU0sS0FBTixDQUFZLElBQVosRUFBa0JDLFNBQWxCO0FBQ0EsVUFBSSxLQUFLSCxPQUFMLENBQWFPLFVBQWpCLEVBQTZCO0FBQzNCLGFBQUtQLE9BQUwsQ0FBYU8sVUFBYixDQUF3QixJQUF4QjtBQUNEO0FBQ0Y7QUFDRixHQVhEO0FBWUFqQixVQUFRSSxTQUFSLENBQWtCSyxNQUFsQixHQUEyQixVQUFTUyxVQUFULEVBQW9CO0FBQzdDLFFBQUlILEdBQUo7QUFDQSxRQUFJLEtBQUtMLE9BQUwsQ0FBYVMsWUFBakIsRUFBK0I7QUFDN0JKLFlBQU0sS0FBS0wsT0FBTCxDQUFhUyxZQUFiLENBQTBCLElBQTFCLEVBQWdDRCxVQUFoQyxDQUFOO0FBQ0Q7QUFDRCxRQUFJSCxRQUFRLEtBQVosRUFBbUI7QUFDakJQLGNBQVFJLEtBQVIsQ0FBYyxJQUFkLEVBQW9CQyxTQUFwQjtBQUNBLFVBQUksS0FBS0gsT0FBTCxDQUFhVSxXQUFqQixFQUE4QjtBQUM1QixhQUFLVixPQUFMLENBQWFVLFdBQWIsQ0FBeUIsSUFBekIsRUFBK0JGLFVBQS9CO0FBQ0Q7QUFDRjtBQUNGLEdBWEQ7QUFZQSxTQUFPbEIsT0FBUDtBQUNELENBakRBLENBQUQiLCJmaWxlIjoic3JjL3Bub3RpZnkuY2FsbGJhY2tzLmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENhbGxiYWNrc1xuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGEgbW9kdWxlLlxuICAgIGRlZmluZSgncG5vdGlmeS5jYWxsYmFja3MnLCBbJ2pxdWVyeScsICdwbm90aWZ5J10sIGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ2pxdWVyeScpLCByZXF1aXJlKCcuL3Bub3RpZnknKSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gQnJvd3NlciBnbG9iYWxzXG4gICAgZmFjdG9yeShyb290LmpRdWVyeSwgcm9vdC5QTm90aWZ5KTtcbiAgfVxufSh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdGhpcywgZnVuY3Rpb24oJCwgUE5vdGlmeSl7XG4gIHZhciBfaW5pdCAgID0gUE5vdGlmeS5wcm90b3R5cGUuaW5pdCxcbiAgICAgIF9vcGVuICAgPSBQTm90aWZ5LnByb3RvdHlwZS5vcGVuLFxuICAgICAgX3JlbW92ZSA9IFBOb3RpZnkucHJvdG90eXBlLnJlbW92ZTtcbiAgUE5vdGlmeS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCl7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5iZWZvcmVfaW5pdCkge1xuICAgICAgdGhpcy5vcHRpb25zLmJlZm9yZV9pbml0KHRoaXMub3B0aW9ucyk7XG4gICAgfVxuICAgIF9pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5hZnRlcl9pbml0KSB7XG4gICAgICB0aGlzLm9wdGlvbnMuYWZ0ZXJfaW5pdCh0aGlzKTtcbiAgICB9XG4gIH07XG4gIFBOb3RpZnkucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbigpe1xuICAgIHZhciByZXQ7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5iZWZvcmVfb3Blbikge1xuICAgICAgcmV0ID0gdGhpcy5vcHRpb25zLmJlZm9yZV9vcGVuKHRoaXMpO1xuICAgIH1cbiAgICBpZiAocmV0ICE9PSBmYWxzZSkge1xuICAgICAgX29wZW4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuYWZ0ZXJfb3Blbikge1xuICAgICAgICB0aGlzLm9wdGlvbnMuYWZ0ZXJfb3Blbih0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIFBOb3RpZnkucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKHRpbWVyX2hpZGUpe1xuICAgIHZhciByZXQ7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5iZWZvcmVfY2xvc2UpIHtcbiAgICAgIHJldCA9IHRoaXMub3B0aW9ucy5iZWZvcmVfY2xvc2UodGhpcywgdGltZXJfaGlkZSk7XG4gICAgfVxuICAgIGlmIChyZXQgIT09IGZhbHNlKSB7XG4gICAgICBfcmVtb3ZlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmFmdGVyX2Nsb3NlKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5hZnRlcl9jbG9zZSh0aGlzLCB0aW1lcl9oaWRlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIHJldHVybiBQTm90aWZ5O1xufSkpO1xuIl19