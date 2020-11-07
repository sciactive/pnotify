(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.PNotifyMobile = {}));
}(this, (function (exports) { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function noop() {}

  function run(fn) {
    return fn();
  }

  function blank_object() {
    return Object.create(null);
  }

  function run_all(fns) {
    fns.forEach(run);
  }

  function is_function(thing) {
    return typeof thing === 'function';
  }

  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || a && _typeof(a) === 'object' || typeof a === 'function';
  }

  function is_empty(obj) {
    return Object.keys(obj).length === 0;
  }

  function detach(node) {
    node.parentNode.removeChild(node);
  }

  function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return function () {
      return node.removeEventListener(event, handler, options);
    };
  }

  function children(element) {
    return Array.from(element.childNodes);
  }

  var current_component;

  function set_current_component(component) {
    current_component = component;
  }

  function get_current_component() {
    if (!current_component) throw new Error('Function called outside component initialization');
    return current_component;
  }

  function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
  }

  function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
  }

  var dirty_components = [];
  var binding_callbacks = [];
  var render_callbacks = [];
  var flush_callbacks = [];
  var resolved_promise = Promise.resolve();
  var update_scheduled = false;

  function schedule_update() {
    if (!update_scheduled) {
      update_scheduled = true;
      resolved_promise.then(flush);
    }
  }

  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }

  var flushing = false;
  var seen_callbacks = new Set();

  function flush() {
    if (flushing) return;
    flushing = true;

    do {
      // first, call beforeUpdate functions
      // and update components
      for (var i = 0; i < dirty_components.length; i += 1) {
        var component = dirty_components[i];
        set_current_component(component);
        update(component.$$);
      }

      set_current_component(null);
      dirty_components.length = 0;

      while (binding_callbacks.length) {
        binding_callbacks.pop()();
      } // then, once components are updated, call
      // afterUpdate functions. This may cause
      // subsequent updates...


      for (var _i = 0; _i < render_callbacks.length; _i += 1) {
        var callback = render_callbacks[_i];

        if (!seen_callbacks.has(callback)) {
          // ...so guard against infinite loops
          seen_callbacks.add(callback);
          callback();
        }
      }

      render_callbacks.length = 0;
    } while (dirty_components.length);

    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }

    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
  }

  function update($$) {
    if ($$.fragment !== null) {
      $$.update();
      run_all($$.before_update);
      var dirty = $$.dirty;
      $$.dirty = [-1];
      $$.fragment && $$.fragment.p($$.ctx, dirty);
      $$.after_update.forEach(add_render_callback);
    }
  }

  var outroing = new Set();

  function transition_in(block, local) {
    if (block && block.i) {
      outroing["delete"](block);
      block.i(local);
    }
  }

  var globals = typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : global;

  function mount_component(component, target, anchor) {
    var _component$$$ = component.$$,
        fragment = _component$$$.fragment,
        on_mount = _component$$$.on_mount,
        on_destroy = _component$$$.on_destroy,
        after_update = _component$$$.after_update;
    fragment && fragment.m(target, anchor); // onMount happens before the initial afterUpdate

    add_render_callback(function () {
      var new_on_destroy = on_mount.map(run).filter(is_function);

      if (on_destroy) {
        on_destroy.push.apply(on_destroy, _toConsumableArray(new_on_destroy));
      } else {
        // Edge case - component was destroyed immediately,
        // most likely as a result of a binding initialising
        run_all(new_on_destroy);
      }

      component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
  }

  function destroy_component(component, detaching) {
    var $$ = component.$$;

    if ($$.fragment !== null) {
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching); // TODO null out other refs, including component.$$ (but need to
      // preserve final state?)

      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }

  function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
      dirty_components.push(component);
      schedule_update();
      component.$$.dirty.fill(0);
    }

    component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
  }

  function init(component, options, instance, create_fragment, not_equal, props) {
    var dirty = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [-1];
    var parent_component = current_component;
    set_current_component(component);
    var prop_values = options.props || {};
    var $$ = component.$$ = {
      fragment: null,
      ctx: null,
      // state
      props: props,
      update: noop,
      not_equal: not_equal,
      bound: blank_object(),
      // lifecycle
      on_mount: [],
      on_destroy: [],
      before_update: [],
      after_update: [],
      context: new Map(parent_component ? parent_component.$$.context : []),
      // everything else
      callbacks: blank_object(),
      dirty: dirty,
      skip_bound: false
    };
    var ready = false;
    $$.ctx = instance ? instance(component, prop_values, function (i, ret) {
      var value = (arguments.length <= 2 ? 0 : arguments.length - 2) ? arguments.length <= 2 ? undefined : arguments[2] : ret;

      if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
        if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
        if (ready) make_dirty(component, i);
      }

      return ret;
    }) : [];
    $$.update();
    ready = true;
    run_all($$.before_update); // `false` as a special case of no DOM component

    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;

    if (options.target) {
      if (options.hydrate) {
        var nodes = children(options.target); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

        $$.fragment && $$.fragment.l(nodes);
        nodes.forEach(detach);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        $$.fragment && $$.fragment.c();
      }

      if (options.intro) transition_in(component.$$.fragment);
      mount_component(component, options.target, options.anchor);
      flush();
    }

    set_current_component(parent_component);
  }

  var SvelteComponent = /*#__PURE__*/function () {
    function SvelteComponent() {
      _classCallCheck(this, SvelteComponent);
    }

    _createClass(SvelteComponent, [{
      key: "$destroy",
      value: function $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
      }
    }, {
      key: "$on",
      value: function $on(type, callback) {
        var callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
        callbacks.push(callback);
        return function () {
          var index = callbacks.indexOf(callback);
          if (index !== -1) callbacks.splice(index, 1);
        };
      }
    }, {
      key: "$set",
      value: function $set($$props) {
        if (this.$$set && !is_empty($$props)) {
          this.$$.skip_bound = true;
          this.$$set($$props);
          this.$$.skip_bound = false;
        }
      }
    }]);

    return SvelteComponent;
  }();

  var window_1 = globals.window;

  function create_fragment(ctx) {
    var mounted;
    var dispose;
    return {
      c: noop,
      m: function m(target, anchor) {
        if (!mounted) {
          dispose = listen(window_1, "resize",
          /*resize_handler*/
          ctx[3]);
          mounted = true;
        }
      },
      p: noop,
      i: noop,
      o: noop,
      d: function d(detaching) {
        mounted = false;
        dispose();
      }
    };
  }

  var position = "PrependContainer";
  var defaults = {
    swipeDismiss: true
  };

  function instance($$self, $$props, $$invalidate) {
    var _$$props$self = $$props.self,
        self = _$$props$self === void 0 ? null : _$$props$self;
    var _$$props$swipeDismiss = $$props.swipeDismiss,
        swipeDismiss = _$$props$swipeDismiss === void 0 ? defaults.swipeDismiss : _$$props$swipeDismiss;
    var origXY = null;
    var diffXY = null;
    var noticeWidthHeight = null;
    var noticeOpacity = null;
    var csspos = "left";
    var direction = "X";
    var span = "Width";
    var windowInnerWidth = window.innerWidth;
    var offs = [];
    onMount(function () {
      offs = [self.on("touchstart", function (e) {
        if (!swipeDismiss) {
          return;
        }

        var stack = self.stack;

        if (stack) {
          switch (stack.dir1) {
            case "up":
            case "down":
              csspos = "left";
              direction = "X";
              span = "Width";
              break;

            case "left":
            case "right":
              csspos = "top";
              direction = "Y";
              span = "Height";
              break;
          }
        }

        origXY = e.touches[0]["screen".concat(direction)];
        noticeWidthHeight = self.refs.elem["scroll".concat(span)];
        noticeOpacity = window.getComputedStyle(self.refs.elem)["opacity"];
        $$invalidate(1, self.refs.container.style[csspos] = 0, self);
      }), self.on("touchmove", function (e) {
        if (!origXY || !swipeDismiss) {
          return;
        }

        var curXY = e.touches[0]["screen".concat(direction)];
        diffXY = curXY - origXY;
        var opacity = (1 - Math.abs(diffXY) / noticeWidthHeight) * noticeOpacity;
        $$invalidate(1, self.refs.elem.style.opacity = opacity, self);
        $$invalidate(1, self.refs.container.style[csspos] = "".concat(diffXY, "px"), self);
      }), self.on("touchend", function () {
        if (!origXY || !swipeDismiss) {
          return;
        }

        self.refs.container.classList.add("pnotify-mobile-animate-left");

        if (Math.abs(diffXY) > 40) {
          var goLeft = diffXY < 0 ? noticeWidthHeight * -2 : noticeWidthHeight * 2;
          $$invalidate(1, self.refs.elem.style.opacity = 0, self);
          $$invalidate(1, self.refs.container.style[csspos] = "".concat(goLeft, "px"), self);
          self.close();
        } else {
          self.refs.elem.style.removeProperty("opacity");
          self.refs.container.style.removeProperty(csspos);
        }

        origXY = null;
        diffXY = null;
        noticeWidthHeight = null;
        noticeOpacity = null;
      }), self.on("touchcancel", function () {
        if (!origXY || !swipeDismiss) {
          return;
        }

        self.refs.elem.style.removeProperty("opacity");
        self.refs.container.style.removeProperty(csspos);
        origXY = null;
        diffXY = null;
        noticeWidthHeight = null;
        noticeOpacity = null;
      }), self.on("pnotify:afterClose", function () {
        // Remove any styling we added to close it.
        if (!swipeDismiss) {
          return;
        }

        self.refs.elem.style.removeProperty("opacity");
        self.refs.container.style.removeProperty("left");
        self.refs.container.style.removeProperty("top");
      })];
    });
    onDestroy(function () {
      offs.forEach(function (off) {
        return off();
      });
    });

    var resize_handler = function resize_handler() {
      return $$invalidate(0, windowInnerWidth = window.innerWidth);
    };

    $$self.$$set = function ($$props) {
      if ("self" in $$props) $$invalidate(1, self = $$props.self);
      if ("swipeDismiss" in $$props) $$invalidate(2, swipeDismiss = $$props.swipeDismiss);
    };

    $$self.$$.update = function () {
      if ($$self.$$.dirty &
      /*self, windowInnerWidth*/
      3) {
         {
          var stack = self.stack;

          if (stack) {
            if (windowInnerWidth <= 480) {
              if (!("_m_spacing1" in stack)) {
                stack._m_spacing1 = stack.spacing1;
                stack._m_firstpos1 = stack.firstpos1;
                stack._m_spacing2 = stack.spacing2;
                stack._m_firstpos2 = stack.firstpos2;
                stack.spacing1 = 0;
                stack.firstpos1 = 0;
                stack.spacing2 = 0;
                stack.firstpos2 = 0;
                stack.queuePosition();
              }
            } else {
              if ("_m_spacing1" in stack) {
                stack.spacing1 = stack._m_spacing1;
                delete stack._m_spacing1;
                stack.firstpos1 = stack._m_firstpos1;
                delete stack._m_firstpos1;
                stack.spacing2 = stack._m_spacing2;
                delete stack._m_spacing2;
                stack.firstpos2 = stack._m_firstpos2;
                delete stack._m_firstpos2;
                stack.queuePosition();
              }
            }
          }
        }
      }
    };

    return [windowInnerWidth, self, swipeDismiss, resize_handler];
  }

  var Mobile = /*#__PURE__*/function (_SvelteComponent) {
    _inherits(Mobile, _SvelteComponent);

    var _super = _createSuper(Mobile);

    function Mobile(options) {
      var _this;

      _classCallCheck(this, Mobile);

      _this = _super.call(this);
      init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
        self: 1,
        swipeDismiss: 2
      });
      return _this;
    }

    return Mobile;
  }(SvelteComponent);

  exports.default = Mobile;
  exports.defaults = defaults;
  exports.position = position;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
