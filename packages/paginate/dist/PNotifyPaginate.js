(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.PNotifyPaginate = {}));
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

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
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

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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

  function append(target, node) {
    target.appendChild(node);
  }

  function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
  }

  function detach(node) {
    node.parentNode.removeChild(node);
  }

  function element(name) {
    return document.createElement(name);
  }

  function text(data) {
    return document.createTextNode(data);
  }

  function space() {
    return text(' ');
  }

  function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return function () {
      return node.removeEventListener(event, handler, options);
    };
  }

  function attr(node, attribute, value) {
    if (value == null) node.removeAttribute(attribute);else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
  }

  function children(element) {
    return Array.from(element.childNodes);
  }

  function set_data(text, data) {
    data = '' + data;
    if (text.wholeText !== data) text.data = data;
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

  function create_if_block_1(ctx) {
    var div2;
    var div0;
    var div0_tabindex_value;
    var div0_aria_disabled_value;
    var div0_class_value;
    var div0_title_value;
    var t;
    var div1;
    var div1_tabindex_value;
    var div1_aria_disabled_value;
    var div1_class_value;
    var div1_title_value;
    var div2_class_value;
    var mounted;
    var dispose;
    return {
      c: function c() {
        div2 = element("div");
        div0 = element("div");
        t = space();
        div1 = element("div");
        attr(div0, "role", "button");
        attr(div0, "tabindex", div0_tabindex_value =
        /*currentIndex*/
        ctx[4] === 1 ? "-1" : "0");
        attr(div0, "aria-disabled", div0_aria_disabled_value =
        /*currentIndex*/
        ctx[4] === 1);
        attr(div0, "class", div0_class_value = "pnotify-paginate-button ".concat(
        /*self*/
        ctx[0].getStyle("paginate-btn"), " ").concat(
        /*self*/
        ctx[0].getStyle("paginate-previous")));
        attr(div0, "title", div0_title_value =
        /*labels*/
        ctx[3].previous);
        attr(div1, "role", "button");
        attr(div1, "tabindex", div1_tabindex_value =
        /*currentIndex*/
        ctx[4] ===
        /*stackLength*/
        ctx[5] ? "-1" : "0");
        attr(div1, "aria-disabled", div1_aria_disabled_value =
        /*currentIndex*/
        ctx[4] ===
        /*stackLength*/
        ctx[5]);
        attr(div1, "class", div1_class_value = "pnotify-paginate-button ".concat(
        /*self*/
        ctx[0].getStyle("paginate-btn"), " ").concat(
        /*self*/
        ctx[0].getStyle("paginate-next")));
        attr(div1, "title", div1_title_value =
        /*labels*/
        ctx[3].next);
        attr(div2, "class", div2_class_value = "pnotify-paginate-buttons ".concat(
        /*self*/
        ctx[0].getStyle("paginate-buttons")));
      },
      m: function m(target, anchor) {
        insert(target, div2, anchor);
        append(div2, div0);
        append(div2, t);
        append(div2, div1);

        if (!mounted) {
          dispose = [listen(div0, "click",
          /*click_handler*/
          ctx[10]), listen(div1, "click",
          /*click_handler_1*/
          ctx[11])];
          mounted = true;
        }
      },
      p: function p(ctx, dirty) {
        if (dirty &
        /*currentIndex*/
        16 && div0_tabindex_value !== (div0_tabindex_value =
        /*currentIndex*/
        ctx[4] === 1 ? "-1" : "0")) {
          attr(div0, "tabindex", div0_tabindex_value);
        }

        if (dirty &
        /*currentIndex*/
        16 && div0_aria_disabled_value !== (div0_aria_disabled_value =
        /*currentIndex*/
        ctx[4] === 1)) {
          attr(div0, "aria-disabled", div0_aria_disabled_value);
        }

        if (dirty &
        /*self*/
        1 && div0_class_value !== (div0_class_value = "pnotify-paginate-button ".concat(
        /*self*/
        ctx[0].getStyle("paginate-btn"), " ").concat(
        /*self*/
        ctx[0].getStyle("paginate-previous")))) {
          attr(div0, "class", div0_class_value);
        }

        if (dirty &
        /*labels*/
        8 && div0_title_value !== (div0_title_value =
        /*labels*/
        ctx[3].previous)) {
          attr(div0, "title", div0_title_value);
        }

        if (dirty &
        /*currentIndex, stackLength*/
        48 && div1_tabindex_value !== (div1_tabindex_value =
        /*currentIndex*/
        ctx[4] ===
        /*stackLength*/
        ctx[5] ? "-1" : "0")) {
          attr(div1, "tabindex", div1_tabindex_value);
        }

        if (dirty &
        /*currentIndex, stackLength*/
        48 && div1_aria_disabled_value !== (div1_aria_disabled_value =
        /*currentIndex*/
        ctx[4] ===
        /*stackLength*/
        ctx[5])) {
          attr(div1, "aria-disabled", div1_aria_disabled_value);
        }

        if (dirty &
        /*self*/
        1 && div1_class_value !== (div1_class_value = "pnotify-paginate-button ".concat(
        /*self*/
        ctx[0].getStyle("paginate-btn"), " ").concat(
        /*self*/
        ctx[0].getStyle("paginate-next")))) {
          attr(div1, "class", div1_class_value);
        }

        if (dirty &
        /*labels*/
        8 && div1_title_value !== (div1_title_value =
        /*labels*/
        ctx[3].next)) {
          attr(div1, "title", div1_title_value);
        }

        if (dirty &
        /*self*/
        1 && div2_class_value !== (div2_class_value = "pnotify-paginate-buttons ".concat(
        /*self*/
        ctx[0].getStyle("paginate-buttons")))) {
          attr(div2, "class", div2_class_value);
        }
      },
      d: function d(detaching) {
        if (detaching) detach(div2);
        mounted = false;
        run_all(dispose);
      }
    };
  } // (121:2) {#if count}


  function create_if_block(ctx) {
    var div;
    var span0;
    var t0;
    var span0_class_value;
    var t1;
    var span1;
    var t2_value =
    /*labels*/
    ctx[3].of + "";
    var t2;
    var span1_class_value;
    var t3;
    var span2;
    var t4;
    var span2_class_value;
    var div_class_value;
    return {
      c: function c() {
        div = element("div");
        span0 = element("span");
        t0 = text(
        /*currentIndex*/
        ctx[4]);
        t1 = space();
        span1 = element("span");
        t2 = text(t2_value);
        t3 = space();
        span2 = element("span");
        t4 = text(
        /*stackLength*/
        ctx[5]);
        attr(span0, "class", span0_class_value = "pnotify-paginate-count-current ".concat(
        /*self*/
        ctx[0].getStyle("paginate-count-current")));
        attr(span1, "class", span1_class_value = "pnotify-paginate-count-of ".concat(
        /*self*/
        ctx[0].getStyle("paginate-count-of")));
        attr(span2, "class", span2_class_value = "pnotify-paginate-count-total ".concat(
        /*self*/
        ctx[0].getStyle("paginate-count-total")));
        attr(div, "class", div_class_value = "pnotify-paginate-count ".concat(
        /*self*/
        ctx[0].getStyle("paginate-count")));
      },
      m: function m(target, anchor) {
        insert(target, div, anchor);
        append(div, span0);
        append(span0, t0);
        append(div, t1);
        append(div, span1);
        append(span1, t2);
        append(div, t3);
        append(div, span2);
        append(span2, t4);
      },
      p: function p(ctx, dirty) {
        if (dirty &
        /*currentIndex*/
        16) set_data(t0,
        /*currentIndex*/
        ctx[4]);

        if (dirty &
        /*self*/
        1 && span0_class_value !== (span0_class_value = "pnotify-paginate-count-current ".concat(
        /*self*/
        ctx[0].getStyle("paginate-count-current")))) {
          attr(span0, "class", span0_class_value);
        }

        if (dirty &
        /*labels*/
        8 && t2_value !== (t2_value =
        /*labels*/
        ctx[3].of + "")) set_data(t2, t2_value);

        if (dirty &
        /*self*/
        1 && span1_class_value !== (span1_class_value = "pnotify-paginate-count-of ".concat(
        /*self*/
        ctx[0].getStyle("paginate-count-of")))) {
          attr(span1, "class", span1_class_value);
        }

        if (dirty &
        /*stackLength*/
        32) set_data(t4,
        /*stackLength*/
        ctx[5]);

        if (dirty &
        /*self*/
        1 && span2_class_value !== (span2_class_value = "pnotify-paginate-count-total ".concat(
        /*self*/
        ctx[0].getStyle("paginate-count-total")))) {
          attr(span2, "class", span2_class_value);
        }

        if (dirty &
        /*self*/
        1 && div_class_value !== (div_class_value = "pnotify-paginate-count ".concat(
        /*self*/
        ctx[0].getStyle("paginate-count")))) {
          attr(div, "class", div_class_value);
        }
      },
      d: function d(detaching) {
        if (detaching) detach(div);
      }
    };
  }

  function create_fragment(ctx) {
    var div;
    var t;
    var div_class_value;
    var if_block0 =
    /*buttons*/
    ctx[1] && create_if_block_1(ctx);
    var if_block1 =
    /*count*/
    ctx[2] && create_if_block(ctx);
    return {
      c: function c() {
        div = element("div");
        if (if_block0) if_block0.c();
        t = space();
        if (if_block1) if_block1.c();
        attr(div, "class", div_class_value = "pnotify-paginate ".concat(
        /*self*/
        ctx[0].getStyle("paginate")));
      },
      m: function m(target, anchor) {
        insert(target, div, anchor);
        if (if_block0) if_block0.m(div, null);
        append(div, t);
        if (if_block1) if_block1.m(div, null);
      },
      p: function p(ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            dirty = _ref2[0];

        if (
        /*buttons*/
        ctx[1]) {
          if (if_block0) {
            if_block0.p(ctx, dirty);
          } else {
            if_block0 = create_if_block_1(ctx);
            if_block0.c();
            if_block0.m(div, t);
          }
        } else if (if_block0) {
          if_block0.d(1);
          if_block0 = null;
        }

        if (
        /*count*/
        ctx[2]) {
          if (if_block1) {
            if_block1.p(ctx, dirty);
          } else {
            if_block1 = create_if_block(ctx);
            if_block1.c();
            if_block1.m(div, null);
          }
        } else if (if_block1) {
          if_block1.d(1);
          if_block1 = null;
        }

        if (dirty &
        /*self*/
        1 && div_class_value !== (div_class_value = "pnotify-paginate ".concat(
        /*self*/
        ctx[0].getStyle("paginate")))) {
          attr(div, "class", div_class_value);
        }
      },
      i: noop,
      o: noop,
      d: function d(detaching) {
        if (detaching) detach(div);
        if (if_block0) if_block0.d();
        if (if_block1) if_block1.d();
      }
    };
  }

  var position = "PrependContainer";
  var defaults = {
    buttons: true,
    count: true,
    immediateTransition: true,
    waiting: true,
    labels: {
      previous: "Previous",
      next: "Next",
      of: "of"
    }
  };

  function instance($$self, $$props, $$invalidate) {
    var _$$props$self = $$props.self,
        self = _$$props$self === void 0 ? null : _$$props$self;
    var _$$props$buttons = $$props.buttons,
        buttons = _$$props$buttons === void 0 ? defaults.buttons : _$$props$buttons;
    var _$$props$count = $$props.count,
        count = _$$props$count === void 0 ? defaults.count : _$$props$count;
    var _$$props$immediateTra = $$props.immediateTransition,
        immediateTransition = _$$props$immediateTra === void 0 ? defaults.immediateTransition : _$$props$immediateTra;
    var _$$props$waiting = $$props.waiting,
        waiting = _$$props$waiting === void 0 ? defaults.waiting : _$$props$waiting;
    var _$$props$labels = $$props.labels,
        labels = _$$props$labels === void 0 ? defaults.labels : _$$props$labels;
    var currentIndex;
    var stackLength;

    var handlerCallback = function handlerCallback() {
      $$invalidate(4, currentIndex = 0);

      try {
        self.stack.forEach(function (notice) {
          return $$invalidate(4, currentIndex++, currentIndex);
        }, {
          start: self,
          dir: "prev"
        });
      } catch (e) {
        if (e.message !== "Invalid start param.") {
          throw e;
        }
      }

      $$invalidate(5, stackLength = self.stack.length);
    };

    var addHandlerOff;
    var removeHandlerOff;
    var beforeOpenHandlerOff;
    onMount(function () {
      handlerCallback();
      addHandlerOff = self.stack.on("afterAddNotice", handlerCallback);
      removeHandlerOff = self.stack.on("afterRemoveNotice", handlerCallback);
      beforeOpenHandlerOff = self.on("beforeOpen", handlerCallback);
    });
    onDestroy(function () {
      addHandlerOff();
      removeHandlerOff();
      beforeOpenHandlerOff();
    });

    function handleNext() {
      self.stack.forEach(function (notice) {
        if (notice !== self && (notice.getState() === "waiting" || !waiting && notice.getState() === "closed")) {
          self.stack.swap(self, notice, immediateTransition, waiting);
          return false;
        }
      }, {
        start: self,
        dir: "next"
      });
    }

    function handlePrevious() {
      self.stack.forEach(function (notice) {
        if (notice !== self && notice.getState() === "waiting") {
          self.stack.swap(self, notice, immediateTransition, true);
          return false;
        }
      }, {
        start: self,
        dir: "prev"
      });
    }

    var click_handler = function click_handler(event) {
      return handlePrevious();
    };

    var click_handler_1 = function click_handler_1(event) {
      return handleNext();
    };

    $$self.$$set = function ($$props) {
      if ("self" in $$props) $$invalidate(0, self = $$props.self);
      if ("buttons" in $$props) $$invalidate(1, buttons = $$props.buttons);
      if ("count" in $$props) $$invalidate(2, count = $$props.count);
      if ("immediateTransition" in $$props) $$invalidate(8, immediateTransition = $$props.immediateTransition);
      if ("waiting" in $$props) $$invalidate(9, waiting = $$props.waiting);
      if ("labels" in $$props) $$invalidate(3, labels = $$props.labels);
    };

    return [self, buttons, count, labels, currentIndex, stackLength, handleNext, handlePrevious, immediateTransition, waiting, click_handler, click_handler_1];
  }

  var Paginate = /*#__PURE__*/function (_SvelteComponent) {
    _inherits(Paginate, _SvelteComponent);

    var _super = _createSuper(Paginate);

    function Paginate(options) {
      var _this;

      _classCallCheck(this, Paginate);

      _this = _super.call(this);
      init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
        self: 0,
        buttons: 1,
        count: 2,
        immediateTransition: 8,
        waiting: 9,
        labels: 3
      });
      return _this;
    }

    return Paginate;
  }(SvelteComponent);

  exports.default = Paginate;
  exports.defaults = defaults;
  exports.position = position;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
