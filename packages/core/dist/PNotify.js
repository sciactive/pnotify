(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.PNotify = {}));
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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
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

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
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
    return function () {
      var Super = _getPrototypeOf(Derived),
          result;

      if (_isNativeReflectConstruct()) {
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
    if (n === "Map" || n === "Set") return Array.from(n);
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

  function assign(tar, src) {
    // @ts-ignore
    for (var k in src) {
      tar[k] = src[k];
    }

    return tar;
  }

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

  function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
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

  function empty() {
    return text('');
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
    if (text.data !== data) text.data = data;
  }

  function custom_event(type, detail) {
    var e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, false, false, detail);
    return e;
  }

  var HtmlTag = /*#__PURE__*/function () {
    function HtmlTag(html) {
      var anchor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      _classCallCheck(this, HtmlTag);

      this.e = element('div');
      this.a = anchor;
      this.u(html);
    }

    _createClass(HtmlTag, [{
      key: "m",
      value: function m(target) {
        var anchor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        for (var i = 0; i < this.n.length; i += 1) {
          insert(target, this.n[i], anchor);
        }

        this.t = target;
      }
    }, {
      key: "u",
      value: function u(html) {
        this.e.innerHTML = html;
        this.n = Array.from(this.e.childNodes);
      }
    }, {
      key: "p",
      value: function p(html) {
        this.d();
        this.u(html);
        this.m(this.t, this.a);
      }
    }, {
      key: "d",
      value: function d() {
        this.n.forEach(detach);
      }
    }]);

    return HtmlTag;
  }();

  var current_component;

  function set_current_component(component) {
    current_component = component;
  }

  function get_current_component() {
    if (!current_component) throw new Error("Function called outside component initialization");
    return current_component;
  }

  function beforeUpdate(fn) {
    get_current_component().$$.before_update.push(fn);
  }

  function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
  }

  function createEventDispatcher() {
    var component = get_current_component();
    return function (type, detail) {
      var callbacks = component.$$.callbacks[type];

      if (callbacks) {
        // TODO are there situations where events could be dispatched
        // in a server (non-DOM) environment?
        var event = custom_event(type, detail);
        callbacks.slice().forEach(function (fn) {
          fn.call(component, event);
        });
      }
    };
  }
  // shorthand events, or if we want to implement
  // a real bubbling mechanism


  function bubble(component, event) {
    var callbacks = component.$$.callbacks[event.type];

    if (callbacks) {
      callbacks.slice().forEach(function (fn) {
        return fn(event);
      });
    }
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

  function tick() {
    schedule_update();
    return resolved_promise;
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
  var outros;

  function group_outros() {
    outros = {
      r: 0,
      c: [],
      p: outros // parent group

    };
  }

  function check_outros() {
    if (!outros.r) {
      run_all(outros.c);
    }

    outros = outros.p;
  }

  function transition_in(block, local) {
    if (block && block.i) {
      outroing["delete"](block);
      block.i(local);
    }
  }

  function transition_out(block, local, detach, callback) {
    if (block && block.o) {
      if (outroing.has(block)) return;
      outroing.add(block);
      outros.c.push(function () {
        outroing["delete"](block);

        if (callback) {
          if (detach) block.d(1);
          callback();
        }
      });
      block.o(local);
    }
  }

  var globals = typeof window !== 'undefined' ? window : global;

  function outro_and_destroy_block(block, lookup) {
    transition_out(block, 1, 1, function () {
      lookup["delete"](block.key);
    });
  }

  function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
    var o = old_blocks.length;
    var n = list.length;
    var i = o;
    var old_indexes = {};

    while (i--) {
      old_indexes[old_blocks[i].key] = i;
    }

    var new_blocks = [];
    var new_lookup = new Map();
    var deltas = new Map();
    i = n;

    while (i--) {
      var child_ctx = get_context(ctx, list, i);
      var key = get_key(child_ctx);
      var block = lookup.get(key);

      if (!block) {
        block = create_each_block(key, child_ctx);
        block.c();
      } else if (dynamic) {
        block.p(child_ctx, dirty);
      }

      new_lookup.set(key, new_blocks[i] = block);
      if (key in old_indexes) deltas.set(key, Math.abs(i - old_indexes[key]));
    }

    var will_move = new Set();
    var did_move = new Set();

    function insert(block) {
      transition_in(block, 1);
      block.m(node, next, lookup.has(block.key));
      lookup.set(block.key, block);
      next = block.first;
      n--;
    }

    while (o && n) {
      var new_block = new_blocks[n - 1];
      var old_block = old_blocks[o - 1];
      var new_key = new_block.key;
      var old_key = old_block.key;

      if (new_block === old_block) {
        // do nothing
        next = new_block.first;
        o--;
        n--;
      } else if (!new_lookup.has(old_key)) {
        // remove old block
        destroy(old_block, lookup);
        o--;
      } else if (!lookup.has(new_key) || will_move.has(new_key)) {
        insert(new_block);
      } else if (did_move.has(old_key)) {
        o--;
      } else if (deltas.get(new_key) > deltas.get(old_key)) {
        did_move.add(new_key);
        insert(new_block);
      } else {
        will_move.add(old_key);
        o--;
      }
    }

    while (o--) {
      var _old_block = old_blocks[o];
      if (!new_lookup.has(_old_block.key)) destroy(_old_block, lookup);
    }

    while (n) {
      insert(new_blocks[n - 1]);
    }

    return new_blocks;
  }

  function get_spread_update(levels, updates) {
    var update = {};
    var to_null_out = {};
    var accounted_for = {
      $$scope: 1
    };
    var i = levels.length;

    while (i--) {
      var o = levels[i];
      var n = updates[i];

      if (n) {
        for (var key in o) {
          if (!(key in n)) to_null_out[key] = 1;
        }

        for (var _key3 in n) {
          if (!accounted_for[_key3]) {
            update[_key3] = n[_key3];
            accounted_for[_key3] = 1;
          }
        }

        levels[i] = n;
      } else {
        for (var _key4 in o) {
          accounted_for[_key4] = 1;
        }
      }
    }

    for (var _key5 in to_null_out) {
      if (!(_key5 in update)) update[_key5] = undefined;
    }

    return update;
  }

  function get_spread_object(spread_props) {
    return _typeof(spread_props) === 'object' && spread_props !== null ? spread_props : {};
  } // source: https://html.spec.whatwg.org/multipage/indices.html

  function create_component(block) {
    block && block.c();
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
      dirty: dirty
    };
    var ready = false;
    $$.ctx = instance ? instance(component, prop_values, function (i, ret) {
      var value = (arguments.length <= 2 ? 0 : arguments.length - 2) ? arguments.length <= 2 ? undefined : arguments[2] : ret;

      if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
        if ($$.bound[i]) $$.bound[i](value);
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
      value: function $set() {// overridden by instance, if it has props
      }
    }]);

    return SvelteComponent;
  }();

  var Stack = /*#__PURE__*/function () {
    function Stack(options) {
      _classCallCheck(this, Stack);

      // TODO: label for close all button
      Object.assign(this, {
        dir1: null,
        dir2: null,
        firstpos1: null,
        firstpos2: null,
        spacing1: 25,
        spacing2: 25,
        push: 'bottom',
        maxOpen: 1,
        maxStrategy: 'wait',
        maxClosureCausesWait: true,
        modal: 'ish',
        modalishFlash: true,
        overlayClose: true,
        overlayClosesPinned: false,
        context: window && document.body || null
      }, options); // Validate the options.

      if (this.modal === 'ish' && this.maxOpen !== 1) {
        throw new Error('A modalish stack must have a maxOpen value of 1.');
      }

      if (this.modal === 'ish' && !this.dir1) {
        throw new Error('A modalish stack must have a direction.');
      }

      if (this.push === 'top' && this.modal === 'ish' && this.maxStrategy !== 'close') {
        throw new Error('A modalish stack that pushes to the top must use the close maxStrategy.');
      } // -- Private properties.
      // The head of the notice double linked list.


      this._noticeHead = {
        notice: null,
        prev: null,
        next: null
      }; // The tail of the notice double linked list.

      this._noticeTail = {
        notice: null,
        prev: this._noticeHead,
        next: null
      };
      this._noticeHead.next = this._noticeTail; // The map of notices to nodes.

      this._noticeMap = new WeakMap(); // The number of notices in the stack.

      this._length = 0; // How much space to add along the secondary axis when moving notices to the
      // next column/row.

      this._addpos2 = 0; // Whether the stack's notices should animate while moving.

      this._animation = true; // A timer to debounce positioning.

      this._posTimer = null; // The number of open notices.

      this._openNotices = 0; // A listener for positioning events.

      this._listener = null; // Whether the overlay is currently open.

      this._overlayOpen = false; // Whether the overlay is currently inserted into the DOM.

      this._overlayInserted = false; // Whether the modal state is collapsing. (Notices go back to waiting and shouldn't resposition.)

      this._collapsingModalState = false; // The leader is the first open notice in a modalish stack.

      this._leader = null;
      this._leaderOff = null; // The next waiting notice that is masking.

      this._masking = null;
      this._maskingOff = null;
    }

    _createClass(Stack, [{
      key: "forEach",
      value: function forEach(callback) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref$start = _ref.start,
            start = _ref$start === void 0 ? 'oldest' : _ref$start,
            _ref$dir = _ref.dir,
            dir = _ref$dir === void 0 ? 'newer' : _ref$dir,
            _ref$skipModuleHandle = _ref.skipModuleHandled,
            skipModuleHandled = _ref$skipModuleHandle === void 0 ? false : _ref$skipModuleHandle;

        var node;

        if (start === 'head' || start === 'newest' && this.push === 'top' || start === 'oldest' && this.push === 'bottom') {
          node = this._noticeHead.next;
        } else if (start === 'tail' || start === 'newest' && this.push === 'bottom' || start === 'oldest' && this.push === 'top') {
          node = this._noticeTail.prev;
        } else if (this._noticeMap.has(start)) {
          node = this._noticeMap.get(start);
        } else {
          throw new Error('Invalid start param.');
        }

        while (node.notice) {
          var _notice = node.notice; // Get the next node first.

          if (dir === 'prev' || this.push === 'top' && dir === 'newer' || this.push === 'bottom' && dir === 'older') {
            node = node.prev;
          } else if (dir === 'next' || this.push === 'top' && dir === 'older' || this.push === 'bottom' && dir === 'newer') {
            node = node.next;
          } else {
            throw new Error('Invalid dir param.');
          } // Call the callback last, just in case the callback removes the notice.


          if ((!skipModuleHandled || !_notice.getModuleHandled()) && callback(_notice) === false) {
            break;
          }
        }
      }
    }, {
      key: "close",
      value: function close(immediate) {
        this.forEach(function (notice) {
          return notice.close(immediate, false, false);
        });
      }
    }, {
      key: "open",
      value: function open(immediate) {
        this.forEach(function (notice) {
          return notice.open(immediate);
        });
      }
    }, {
      key: "openLast",
      value: function openLast() {
        // Look up the last notice, and display it.
        this.forEach(function (notice) {
          if (['opening', 'open', 'waiting'].indexOf(notice.getState()) === -1) {
            notice.open();
            return false;
          }
        }, {
          start: 'newest',
          dir: 'older'
        });
      }
    }, {
      key: "position",
      value: function position() {
        var _this = this;

        // Reset the next position data.
        if (this._length > 0) {
          this._resetPositionData();

          this.forEach(function (notice) {
            _this._positionNotice(notice);
          }, {
            start: 'head',
            dir: 'next',
            skipModuleHandled: true
          });
        } else {
          delete this._nextpos1;
          delete this._nextpos2;
        }
      } // Queue the position so it doesn't run repeatedly and use up resources.

    }, {
      key: "queuePosition",
      value: function queuePosition() {
        var _this2 = this;

        var milliseconds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

        if (this._posTimer) {
          clearTimeout(this._posTimer);
        }

        this._posTimer = setTimeout(function () {
          return _this2.position();
        }, milliseconds);
      }
    }, {
      key: "_resetPositionData",
      value: function _resetPositionData() {
        this._nextpos1 = this.firstpos1;
        this._nextpos2 = this.firstpos2;
        this._addpos2 = 0;
      } // Position the notice.

    }, {
      key: "_positionNotice",
      value: function _positionNotice(notice) {
        var masking = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : notice === this._masking;
        // Get the notice's stack.
        var elem = notice.refs.elem;

        if (!elem) {
          return;
        } // Skip this notice if it's not shown.


        if (!elem.classList.contains('pnotify-in') && !elem.classList.contains('pnotify-initial') && !masking) {
          return;
        } // Use local variables, since a masking notice position shouldn't update the
        // stack.


        var _ref2 = [this.firstpos1, this.firstpos2, this._nextpos1, this._nextpos2, this._addpos2],
            firstpos1 = _ref2[0],
            firstpos2 = _ref2[1],
            _nextpos1 = _ref2[2],
            _nextpos2 = _ref2[3],
            _addpos2 = _ref2[4]; // Read from the DOM to cause refresh.

        elem.getBoundingClientRect();

        if (this._animation && !masking && !this._collapsingModalState) {
          // Add animate class.
          notice._setMoveClass('pnotify-move');
        } else {
          notice._setMoveClass('');
        }

        var spaceY = this.context === document.body ? window.innerHeight : this.context.scrollHeight;
        var spaceX = this.context === document.body ? window.innerWidth : this.context.scrollWidth;
        var csspos1;

        if (this.dir1) {
          csspos1 = {
            down: 'top',
            up: 'bottom',
            left: 'right',
            right: 'left'
          }[this.dir1]; // Calculate the current pos1 value.

          var curpos1;

          switch (this.dir1) {
            case 'down':
              curpos1 = elem.offsetTop;
              break;

            case 'up':
              curpos1 = spaceY - elem.scrollHeight - elem.offsetTop;
              break;

            case 'left':
              curpos1 = spaceX - elem.scrollWidth - elem.offsetLeft;
              break;

            case 'right':
              curpos1 = elem.offsetLeft;
              break;
          } // Remember the first pos1, so the first notice goes there.


          if (firstpos1 == null) {
            firstpos1 = curpos1;
            _nextpos1 = firstpos1;
          }
        }

        if (this.dir1 && this.dir2) {
          var csspos2 = {
            down: 'top',
            up: 'bottom',
            left: 'right',
            right: 'left'
          }[this.dir2]; // Calculate the current pos2 value.

          var curpos2;

          switch (this.dir2) {
            case 'down':
              curpos2 = elem.offsetTop;
              break;

            case 'up':
              curpos2 = spaceY - elem.scrollHeight - elem.offsetTop;
              break;

            case 'left':
              curpos2 = spaceX - elem.scrollWidth - elem.offsetLeft;
              break;

            case 'right':
              curpos2 = elem.offsetLeft;
              break;
          } // Remember the first pos2, so the first notice goes there.


          if (firstpos2 == null) {
            firstpos2 = curpos2;
            _nextpos2 = firstpos2;
          } // Don't move masking notices along dir2. They should always be beside the
          // leader along dir1.


          if (!masking) {
            // Check that it's not beyond the viewport edge.
            var endY = _nextpos1 + elem.offsetHeight + this.spacing1;
            var endX = _nextpos1 + elem.offsetWidth + this.spacing1;

            if ((this.dir1 === 'down' || this.dir1 === 'up') && endY > spaceY || (this.dir1 === 'left' || this.dir1 === 'right') && endX > spaceX) {
              // If it is, it needs to go back to the first pos1, and over on pos2.
              _nextpos1 = firstpos1;
              _nextpos2 += _addpos2 + this.spacing2;
              _addpos2 = 0;
            }
          } // Move the notice on dir2.


          if (_nextpos2 != null) {
            elem.style[csspos2] = "".concat(_nextpos2, "px");

            if (!this._animation) {
              elem.style[csspos2]; // Read from the DOM for update.
            }
          } // Keep track of the widest/tallest notice in the column/row, so we can push the next column/row.


          switch (this.dir2) {
            case 'down':
            case 'up':
              if (elem.offsetHeight + (parseFloat(elem.style.marginTop, 10) || 0) + (parseFloat(elem.style.marginBottom, 10) || 0) > _addpos2) {
                _addpos2 = elem.offsetHeight;
              }

              break;

            case 'left':
            case 'right':
              if (elem.offsetWidth + (parseFloat(elem.style.marginLeft, 10) || 0) + (parseFloat(elem.style.marginRight, 10) || 0) > _addpos2) {
                _addpos2 = elem.offsetWidth;
              }

              break;
          }
        } else if (this.dir1) {
          // Center the notice along dir1 axis, because the stack has no dir2.
          var cssMiddle, cssposCross;

          switch (this.dir1) {
            case 'down':
            case 'up':
              cssposCross = ['left', 'right'];
              cssMiddle = this.context.scrollWidth / 2 - elem.offsetWidth / 2;
              break;

            case 'left':
            case 'right':
              cssposCross = ['top', 'bottom'];
              cssMiddle = spaceY / 2 - elem.offsetHeight / 2;
              break;
          }

          elem.style[cssposCross[0]] = "".concat(cssMiddle, "px");
          elem.style[cssposCross[1]] = 'auto';

          if (!this._animation) {
            elem.style[cssposCross[0]]; // Read from the DOM for update.
          }
        }

        if (this.dir1) {
          // Move the notice on dir1.
          if (_nextpos1 != null) {
            elem.style[csspos1] = "".concat(_nextpos1, "px");

            if (!this._animation) {
              elem.style[csspos1]; // Read from the DOM for update.
            }
          } // Calculate the next dir1 position.


          switch (this.dir1) {
            case 'down':
            case 'up':
              _nextpos1 += elem.offsetHeight + this.spacing1;
              break;

            case 'left':
            case 'right':
              _nextpos1 += elem.offsetWidth + this.spacing1;
              break;
          }
        } else {
          // Center the notice on the screen, because the stack has no dir1.
          var cssMiddleLeft = spaceX / 2 - elem.offsetWidth / 2;
          var cssMiddleTop = spaceY / 2 - elem.offsetHeight / 2;
          elem.style.left = "".concat(cssMiddleLeft, "px");
          elem.style.top = "".concat(cssMiddleTop, "px");

          if (!this._animation) {
            elem.style.left; // Read from the DOM for update.
          }
        } // If we're not positioning the masking notice, update the stack properties.


        if (!masking) {
          this.firstpos1 = firstpos1;
          this.firstpos2 = firstpos2;
          this._nextpos1 = _nextpos1;
          this._nextpos2 = _nextpos2;
          this._addpos2 = _addpos2;
        }
      }
    }, {
      key: "_addNotice",
      value: function _addNotice(notice) {
        var _this3 = this;

        // This is the linked list node.
        var node = {
          notice: notice,
          prev: null,
          next: null
        }; // Push to the correct side of the linked list.

        if (this.push === 'top') {
          node.next = this._noticeHead.next;
          node.prev = this._noticeHead;
          node.next.prev = node;
          node.prev.next = node;
        } else {
          node.prev = this._noticeTail.prev;
          node.next = this._noticeTail;
          node.prev.next = node;
          node.next.prev = node;
        } // Add to the map.


        this._noticeMap.set(notice, node); // Increment the length to match.


        this._length++;

        if (!this._listener) {
          this._listener = function () {
            return _this3.position();
          };

          this.context.addEventListener('pnotify:position', this._listener);
        }

        if (['open', 'opening', 'closing'].indexOf(notice.getState()) !== -1) {
          // If the notice is already open, handle it immediately.
          this._handleNoticeOpened(notice);
        } else if (this.modal === 'ish' && this.modalishFlash && this._shouldNoticeWait()) {
          // If it's not open, and it's going to be a waiting notice, flash it.
          var off = notice.on('pnotify:mount', function () {
            off();

            notice._setMasking(true, false, function () {
              notice._setMasking(false);
            });

            _this3._resetPositionData();

            _this3._positionNotice(_this3._leader);

            window.requestAnimationFrame(function () {
              _this3._positionNotice(notice, true);
            });
          });
        }
      }
    }, {
      key: "_removeNotice",
      value: function _removeNotice(notice) {
        if (!this._noticeMap.has(notice)) {
          return;
        }

        var node = this._noticeMap.get(notice);

        if (this._leader === notice) {
          // Clear the leader.
          this._setLeader(null);
        }

        if (this._masking === notice) {
          // Clear masking.
          this._setMasking(null);
        } // Remove the notice from the linked list.


        node.prev.next = node.next;
        node.next.prev = node.prev;
        node.prev = null;
        node.next = null; // Remove the notice from the map.

        this._noticeMap["delete"](notice); // Reduce the length to match.


        this._length--;

        if (!this._length && this._listener) {
          // Remove the listener.
          this.context.removeEventListener('pnotify:position', this._listener);
          this._listener = null;
        }

        if (!this._length && this._overlayOpen) {
          this._removeOverlay();
        } // If the notice is open, handle it as if it had closed.


        if (['open', 'opening', 'closing'].indexOf(notice.getState()) !== -1) {
          this._handleNoticeClosed(notice);
        }
      }
    }, {
      key: "_setLeader",
      value: function _setLeader(leader) {
        var _this4 = this;

        if (this._leaderOff) {
          this._leaderOff();

          this._leaderOff = null;
        }

        this._leader = leader;

        if (!this._leader) {
          return;
        } // If the mouse enters this notice while it's the leader, then the next
        // waiting notice should start masking.


        var leaderInteraction = function leaderInteraction() {
          // This is a workaround for leaving the modal state.
          var nextNoticeFromModalState = null; // If the leader is moused over:

          if (_this4._overlayOpen) {
            _this4._collapsingModalState = true;

            _this4.forEach(function (notice) {
              // Allow the notices to timed close.
              notice._preventTimerClose(false); // Close and set to wait any open notices other than the leader.


              if (notice !== _this4._leader && ['opening', 'open'].indexOf(notice.getState()) !== -1) {
                if (!nextNoticeFromModalState) {
                  nextNoticeFromModalState = notice;
                }

                notice.close(notice === nextNoticeFromModalState, false, true);
              }
            }, {
              start: _this4._leader,
              dir: 'next',
              skipModuleHandled: true
            }); // Remove the modal state overlay.


            _this4._removeOverlay();
          } // Turn off any masking off timer that may still be running.


          if (maskingOffTimer) {
            clearTimeout(maskingOffTimer);
            maskingOffTimer = null;
          } // Set the next waiting notice to be masking.


          _this4.forEach(function (notice) {
            if (notice === _this4._leader) {
              // Skip the leader, and start with the next one.
              return;
            } // The next notice that is "waiting" is usually fine, but if we're
            // leaving the modal state, it will still be "closing" here, so we have
            // to work around that. :P
            // Also, when coming back from modal state, the notice should
            // immediately be masking instead of fading in.


            if (notice.getState() === 'waiting' || notice === nextNoticeFromModalState) {
              _this4._setMasking(notice, !!nextNoticeFromModalState);

              return false;
            }
          }, {
            start: _this4._leader,
            dir: 'next',
            skipModuleHandled: true
          });
        }; // If the mouse leaves this notice while it's the leader, then the next
        // waiting notice should stop masking.


        var maskingOffTimer = null;

        var leaderLeaveInteraction = function leaderLeaveInteraction() {
          if (maskingOffTimer) {
            clearTimeout(maskingOffTimer);
            maskingOffTimer = null;
          } // TODO: Something wrong here when you come right back from the modal state.


          maskingOffTimer = setTimeout(function () {
            maskingOffTimer = null;

            _this4._setMasking(null);
          }, 750);
        };

        this._leaderOff = function (offs) {
          return function () {
            return offs.map(function (off) {
              return off();
            });
          };
        }([this._leader.on('mouseenter', leaderInteraction), this._leader.on('focusin', leaderInteraction), this._leader.on('mouseleave', leaderLeaveInteraction), this._leader.on('focusout', leaderLeaveInteraction)]);
      }
    }, {
      key: "_setMasking",
      value: function _setMasking(masking, immediate) {
        var _this5 = this;

        if (this._masking) {
          if (this._masking === masking) {
            // Nothing to do.
            return;
          }

          this._masking._setMasking(false, immediate);
        }

        if (this._maskingOff) {
          this._maskingOff();

          this._maskingOff = null;
        }

        this._masking = masking;

        if (!this._masking) {
          return;
        } // Reset the position data and position the leader.


        this._resetPositionData();

        if (this._leader) {
          this._positionNotice(this._leader);
        } // Get this notice ready for positioning.


        this._masking._setMasking(true, immediate); // Wait for the DOM to update.


        window.requestAnimationFrame(function () {
          if (_this5._masking) {
            _this5._positionNotice(_this5._masking);
          }
        });

        var maskingInteraction = function maskingInteraction() {
          // If the masked notice is moused over or focused, the stack enters the
          // modal state, and the notices appear.
          if (_this5.modal === 'ish') {
            _this5._insertOverlay();

            _this5._setMasking(null, true);

            _this5.forEach(function (notice) {
              // Prevent the notices from timed closing.
              notice._preventTimerClose(true);

              if (notice.getState() === 'waiting') {
                notice.open();
              }
            }, {
              start: _this5._leader,
              dir: 'next',
              skipModuleHandled: true
            });
          }
        };

        this._maskingOff = function (offs) {
          return function () {
            return offs.map(function (off) {
              return off();
            });
          };
        }([this._masking.on('mouseenter', maskingInteraction), this._masking.on('focusin', maskingInteraction)]);
      }
    }, {
      key: "_handleNoticeClosed",
      value: function _handleNoticeClosed(notice) {
        var _this6 = this;

        if (notice.getModuleHandled()) {
          // We don't deal with notices that are handled by a module.
          return;
        }

        this._openNotices--;

        if (this.modal === 'ish' && notice === this._leader) {
          this._setLeader(null);

          if (this._masking) {
            this._setMasking(null);
          }
        }

        if (this.maxOpen !== Infinity && this._openNotices < this.maxOpen) {
          var open = function open(notice) {
            if (notice.getState() === 'waiting') {
              notice.open();

              if (_this6._openNotices >= _this6.maxOpen) {
                return false;
              }
            }
          };

          if (this.maxStrategy === 'wait') {
            // Check for the next waiting notice and open it.
            this.forEach(open, {
              start: notice,
              dir: 'next'
            });
          } else if (this.maxStrategy === 'close' && this.maxClosureCausesWait) {
            // Check for the last closed notice and re-open it.
            this.forEach(open, {
              start: notice,
              dir: 'older'
            });
          }
        }

        if (this._openNotices <= 0) {
          this._openNotices = 0;

          if (this._overlayOpen) {
            this._removeOverlay();
          }
        } else if (!this._collapsingModalState) {
          this.queuePosition(0);
        }
      }
    }, {
      key: "_handleNoticeOpened",
      value: function _handleNoticeOpened(notice) {
        var _this7 = this;

        if (notice.getModuleHandled()) {
          // We don't deal with notices that are handled by a module.
          return;
        }

        this._openNotices++; // Check the max in stack.

        if (!(this.modal === 'ish' && this._overlayOpen) && this.maxOpen !== Infinity && this._openNotices > this.maxOpen && this.maxStrategy === 'close') {
          var toClose = this._openNotices - this.maxOpen;
          this.forEach(function (notice) {
            if (['opening', 'open'].indexOf(notice.getState()) !== -1) {
              // Close oldest notices, leaving only stack.maxOpen from the stack.
              notice.close(false, false, _this7.maxClosureCausesWait);

              if (notice === _this7._leader) {
                _this7._setLeader(null);
              }

              toClose--;
              return !!toClose;
            }
          });
        }

        if (this.modal === true) {
          this._insertOverlay();
        }

        if (this.modal === 'ish' && (!this._leader || ['opening', 'open', 'closing'].indexOf(this._leader.getState()) === -1)) {
          this._setLeader(notice);
        }

        if (this.modal === 'ish' && this._overlayOpen) {
          notice._preventTimerClose(true);
        }
      }
    }, {
      key: "_shouldNoticeWait",
      value: function _shouldNoticeWait() {
        return !(this.modal === 'ish' && this._overlayOpen) && this.maxOpen !== Infinity && this._openNotices >= this.maxOpen && this.maxStrategy === 'wait';
      }
    }, {
      key: "_insertOverlay",
      value: function _insertOverlay() {
        var _this8 = this;

        if (!this._overlay) {
          this._overlay = document.createElement('div');

          this._overlay.classList.add('pnotify-modal-overlay');

          if (this.dir1) {
            this._overlay.classList.add("pnotify-modal-overlay-".concat(this.dir1));
          }

          if (this.overlayClose) {
            this._overlay.classList.add('pnotify-modal-overlay-closes');
          }

          if (this.context !== document.body) {
            this._overlay.style.height = "".concat(this.context.scrollHeight, "px");
            this._overlay.style.width = "".concat(this.context.scrollWidth, "px");
          } // Close the notices on overlay click.


          this._overlay.addEventListener('click', function () {
            if (_this8.overlayClose) {
              if (_this8._leader) {
                // Clear the leader. A new one will be found while closing.
                _this8._setLeader(null);
              }

              _this8.forEach(function (notice) {
                if (['closed', 'closing', 'waiting'].indexOf(notice.getState()) !== -1) {
                  return;
                }

                if (notice.hide || _this8.overlayClosesPinned) {
                  notice.close();
                } else if (!notice.hide && _this8.modal === 'ish') {
                  if (_this8._leader) {
                    notice.close(false, false, true);
                  } else {
                    _this8._setLeader(notice);
                  }
                }
              }, {
                skipModuleHandled: true
              });

              if (_this8._overlayOpen) {
                _this8._removeOverlay();
              }
            }
          });
        }

        if (this._overlay.parentNode !== this.context) {
          this._overlay.classList.remove('pnotify-modal-overlay-in');

          this._overlay = this.context.insertBefore(this._overlay, this.context.firstChild);
          this._overlayOpen = true;
          this._overlayInserted = true;
          window.requestAnimationFrame(function () {
            _this8._overlay.classList.add('pnotify-modal-overlay-in');
          });
        }

        this._collapsingModalState = false;
      }
    }, {
      key: "_removeOverlay",
      value: function _removeOverlay() {
        var _this9 = this;

        if (this._overlay.parentNode) {
          this._overlay.classList.remove('pnotify-modal-overlay-in');

          this._overlayOpen = false;
          setTimeout(function () {
            _this9._overlayInserted = false;

            if (_this9._overlay.parentNode) {
              _this9._overlay.parentNode.removeChild(_this9._overlay);
            }
          }, 250);
          setTimeout(function () {
            _this9._collapsingModalState = false;
          }, 400);
        }
      }
    }, {
      key: "notices",
      get: function get() {
        var notices = [];
        this.forEach(function (notice) {
          return notices.push(notice);
        });
        return notices;
      }
    }, {
      key: "length",
      get: function get() {
        return this._length;
      }
    }, {
      key: "leader",
      get: function get() {
        return this._leader;
      }
    }]);

    return Stack;
  }();

  var component = function component() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _construct(Core, args);
  };

  function forwardEventsBuilder(component) {
    var additionalEvents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    // prettier-ignore
    var events = ['focus', 'blur', 'fullscreenchange', 'fullscreenerror', 'scroll', 'cut', 'copy', 'paste', 'keydown', 'keypress', 'keyup', 'auxclick', 'click', 'contextmenu', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mouseup', 'pointerlockchange', 'pointerlockerror', 'select', 'wheel', 'drag', 'dragend', 'dragenter', 'dragstart', 'dragleave', 'dragover', 'drop', 'touchcancel', 'touchend', 'touchmove', 'touchstart', 'pointerover', 'pointerenter', 'pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'pointerout', 'pointerleave', 'gotpointercapture', 'lostpointercapture'].concat(_toConsumableArray(additionalEvents));

    function forward(e) {
      bubble(component, e);
    }

    return function (node) {
      var destructors = [];

      for (var i = 0; i < events.length; i++) {
        destructors.push(listen(node, events[i], forward));
      }

      return {
        destroy: function destroy() {
          for (var _i = 0; _i < destructors.length; _i++) {
            destructors[_i]();
          }
        }
      };
    };
  }

  var Map_1 = globals.Map;

  function get_each_context(ctx, list, i) {
    var child_ctx = ctx.slice();
    child_ctx[106] = list[i][0];
    child_ctx[107] = list[i][1];
    return child_ctx;
  }

  function get_each_context_1(ctx, list, i) {
    var child_ctx = ctx.slice();
    child_ctx[106] = list[i][0];
    child_ctx[107] = list[i][1];
    return child_ctx;
  }

  function get_each_context_2(ctx, list, i) {
    var child_ctx = ctx.slice();
    child_ctx[106] = list[i][0];
    child_ctx[107] = list[i][1];
    return child_ctx;
  }

  function get_each_context_3(ctx, list, i) {
    var child_ctx = ctx.slice();
    child_ctx[106] = list[i][0];
    child_ctx[107] = list[i][1];
    return child_ctx;
  } // (887:4) {#each modulesPrependContainer as [module, options] (module)}


  function create_each_block_3(key_1, ctx) {
    var first;
    var switch_instance_anchor;
    var current;
    var switch_instance_spread_levels = [{
      self:
      /*self*/
      ctx[41]
    },
    /*options*/
    ctx[107]];
    var switch_value =
    /*module*/
    ctx[106]["default"];

    function switch_props(ctx) {
      var switch_instance_props = {};

      for (var i = 0; i < switch_instance_spread_levels.length; i += 1) {
        switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
      }

      return {
        props: switch_instance_props
      };
    }

    if (switch_value) {
      var switch_instance = new switch_value(switch_props());
    }

    return {
      key: key_1,
      first: null,
      c: function c() {
        first = empty();
        if (switch_instance) create_component(switch_instance.$$.fragment);
        switch_instance_anchor = empty();
        this.first = first;
      },
      m: function m(target, anchor) {
        insert(target, first, anchor);

        if (switch_instance) {
          mount_component(switch_instance, target, anchor);
        }

        insert(target, switch_instance_anchor, anchor);
        current = true;
      },
      p: function p(ctx, dirty) {
        var switch_instance_changes = dirty[1] &
        /*self, modulesPrependContainer*/
        1088 ? get_spread_update(switch_instance_spread_levels, [dirty[1] &
        /*self*/
        1024 && {
          self:
          /*self*/
          ctx[41]
        }, dirty[1] &
        /*modulesPrependContainer*/
        64 && get_spread_object(
        /*options*/
        ctx[107])]) : {};

        if (switch_value !== (switch_value =
        /*module*/
        ctx[106]["default"])) {
          if (switch_instance) {
            group_outros();
            var old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, function () {
              destroy_component(old_component, 1);
            });
            check_outros();
          }

          if (switch_value) {
            switch_instance = new switch_value(switch_props());
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
          } else {
            switch_instance = null;
          }
        } else if (switch_value) {
          switch_instance.$set(switch_instance_changes);
        }
      },
      i: function i(local) {
        if (current) return;
        if (switch_instance) transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o: function o(local) {
        if (switch_instance) transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d: function d(detaching) {
        if (detaching) detach(first);
        if (detaching) detach(switch_instance_anchor);
        if (switch_instance) destroy_component(switch_instance, detaching);
      }
    };
  } // (890:4) {#if closer && !_nonBlock}


  function create_if_block_8(ctx) {
    var div;
    var span;
    var span_class_value;
    var div_class_value;
    var div_title_value;
    var dispose;
    return {
      c: function c() {
        div = element("div");
        span = element("span");
        attr(span, "class", span_class_value =
        /*getIcon*/
        ctx[21]("closer"));
        attr(div, "class", div_class_value = "pnotify-closer ".concat(
        /*getStyle*/
        ctx[20]("closer"), " ").concat(!
        /*closerHover*/
        ctx[16] ||
        /*_interacting*/
        ctx[25] ? "" : "pnotify-hidden"));
        attr(div, "role", "button");
        attr(div, "tabindex", "0");
        attr(div, "title", div_title_value =
        /*labels*/
        ctx[19].close);
      },
      m: function m(target, anchor, remount) {
        insert(target, div, anchor);
        append(div, span);
        if (remount) dispose();
        dispose = listen(div, "click",
        /*click_handler*/
        ctx[98]);
      },
      p: function p(ctx, dirty) {
        if (dirty[0] &
        /*closerHover, _interacting*/
        33619968 && div_class_value !== (div_class_value = "pnotify-closer ".concat(
        /*getStyle*/
        ctx[20]("closer"), " ").concat(!
        /*closerHover*/
        ctx[16] ||
        /*_interacting*/
        ctx[25] ? "" : "pnotify-hidden"))) {
          attr(div, "class", div_class_value);
        }

        if (dirty[0] &
        /*labels*/
        524288 && div_title_value !== (div_title_value =
        /*labels*/
        ctx[19].close)) {
          attr(div, "title", div_title_value);
        }
      },
      d: function d(detaching) {
        if (detaching) detach(div);
        dispose();
      }
    };
  } // (901:4) {#if sticker && !_nonBlock}


  function create_if_block_7(ctx) {
    var div;
    var span;
    var span_class_value;
    var div_class_value;
    var div_aria_pressed_value;
    var div_title_value;
    var dispose;
    return {
      c: function c() {
        div = element("div");
        span = element("span");
        attr(span, "class", span_class_value = "".concat(
        /*getIcon*/
        ctx[21]("sticker"), " ").concat(
        /*hide*/
        ctx[1] ?
        /*getIcon*/
        ctx[21]("unstuck") :
        /*getIcon*/
        ctx[21]("stuck")));
        attr(div, "class", div_class_value = "pnotify-sticker ".concat(
        /*getStyle*/
        ctx[20]("sticker"), " ").concat(!
        /*stickerHover*/
        ctx[18] ||
        /*_interacting*/
        ctx[25] ? "" : "pnotify-hidden"));
        attr(div, "role", "button");
        attr(div, "aria-pressed", div_aria_pressed_value = !
        /*hide*/
        ctx[1]);
        attr(div, "tabindex", "0");
        attr(div, "title", div_title_value =
        /*hide*/
        ctx[1] ?
        /*labels*/
        ctx[19].stick :
        /*labels*/
        ctx[19].unstick);
      },
      m: function m(target, anchor, remount) {
        insert(target, div, anchor);
        append(div, span);
        if (remount) dispose();
        dispose = listen(div, "click",
        /*click_handler_1*/
        ctx[99]);
      },
      p: function p(ctx, dirty) {
        if (dirty[0] &
        /*hide*/
        2 && span_class_value !== (span_class_value = "".concat(
        /*getIcon*/
        ctx[21]("sticker"), " ").concat(
        /*hide*/
        ctx[1] ?
        /*getIcon*/
        ctx[21]("unstuck") :
        /*getIcon*/
        ctx[21]("stuck")))) {
          attr(span, "class", span_class_value);
        }

        if (dirty[0] &
        /*stickerHover, _interacting*/
        33816576 && div_class_value !== (div_class_value = "pnotify-sticker ".concat(
        /*getStyle*/
        ctx[20]("sticker"), " ").concat(!
        /*stickerHover*/
        ctx[18] ||
        /*_interacting*/
        ctx[25] ? "" : "pnotify-hidden"))) {
          attr(div, "class", div_class_value);
        }

        if (dirty[0] &
        /*hide*/
        2 && div_aria_pressed_value !== (div_aria_pressed_value = !
        /*hide*/
        ctx[1])) {
          attr(div, "aria-pressed", div_aria_pressed_value);
        }

        if (dirty[0] &
        /*hide, labels*/
        524290 && div_title_value !== (div_title_value =
        /*hide*/
        ctx[1] ?
        /*labels*/
        ctx[19].stick :
        /*labels*/
        ctx[19].unstick)) {
          attr(div, "title", div_title_value);
        }
      },
      d: function d(detaching) {
        if (detaching) detach(div);
        dispose();
      }
    };
  } // (915:4) {#if icon !== false}


  function create_if_block_6(ctx) {
    var div;
    var span;
    var span_class_value;
    var div_class_value;
    return {
      c: function c() {
        div = element("div");
        span = element("span");
        attr(span, "class", span_class_value =
        /*icon*/
        ctx[11] === true ?
        /*getIcon*/
        ctx[21](
        /*type*/
        ctx[2]) :
        /*icon*/
        ctx[11]);
        attr(div, "class", div_class_value = "pnotify-icon ".concat(
        /*getStyle*/
        ctx[20]("icon")));
      },
      m: function m(target, anchor) {
        insert(target, div, anchor);
        append(div, span);
        /*div_binding*/

        ctx[100](div);
      },
      p: function p(ctx, dirty) {
        if (dirty[0] &
        /*icon, type*/
        2052 && span_class_value !== (span_class_value =
        /*icon*/
        ctx[11] === true ?
        /*getIcon*/
        ctx[21](
        /*type*/
        ctx[2]) :
        /*icon*/
        ctx[11])) {
          attr(span, "class", span_class_value);
        }
      },
      d: function d(detaching) {
        if (detaching) detach(div);
        /*div_binding*/

        ctx[100](null);
      }
    };
  } // (927:6) {#each modulesPrependContent as [module, options] (module)}


  function create_each_block_2(key_1, ctx) {
    var first;
    var switch_instance_anchor;
    var current;
    var switch_instance_spread_levels = [{
      self:
      /*self*/
      ctx[41]
    },
    /*options*/
    ctx[107]];
    var switch_value =
    /*module*/
    ctx[106]["default"];

    function switch_props(ctx) {
      var switch_instance_props = {};

      for (var i = 0; i < switch_instance_spread_levels.length; i += 1) {
        switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
      }

      return {
        props: switch_instance_props
      };
    }

    if (switch_value) {
      var switch_instance = new switch_value(switch_props());
    }

    return {
      key: key_1,
      first: null,
      c: function c() {
        first = empty();
        if (switch_instance) create_component(switch_instance.$$.fragment);
        switch_instance_anchor = empty();
        this.first = first;
      },
      m: function m(target, anchor) {
        insert(target, first, anchor);

        if (switch_instance) {
          mount_component(switch_instance, target, anchor);
        }

        insert(target, switch_instance_anchor, anchor);
        current = true;
      },
      p: function p(ctx, dirty) {
        var switch_instance_changes = dirty[1] &
        /*self, modulesPrependContent*/
        1152 ? get_spread_update(switch_instance_spread_levels, [dirty[1] &
        /*self*/
        1024 && {
          self:
          /*self*/
          ctx[41]
        }, dirty[1] &
        /*modulesPrependContent*/
        128 && get_spread_object(
        /*options*/
        ctx[107])]) : {};

        if (switch_value !== (switch_value =
        /*module*/
        ctx[106]["default"])) {
          if (switch_instance) {
            group_outros();
            var old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, function () {
              destroy_component(old_component, 1);
            });
            check_outros();
          }

          if (switch_value) {
            switch_instance = new switch_value(switch_props());
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
          } else {
            switch_instance = null;
          }
        } else if (switch_value) {
          switch_instance.$set(switch_instance_changes);
        }
      },
      i: function i(local) {
        if (current) return;
        if (switch_instance) transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o: function o(local) {
        if (switch_instance) transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d: function d(detaching) {
        if (detaching) detach(first);
        if (detaching) detach(switch_instance_anchor);
        if (switch_instance) destroy_component(switch_instance, detaching);
      }
    };
  } // (930:6) {#if title !== false}


  function create_if_block_3(ctx) {
    var div;
    var div_class_value;
    var if_block = !
    /*_titleElement*/
    ctx[32] && create_if_block_4(ctx);
    return {
      c: function c() {
        div = element("div");
        if (if_block) if_block.c();
        attr(div, "class", div_class_value = "pnotify-title ".concat(
        /*getStyle*/
        ctx[20]("title")));
      },
      m: function m(target, anchor) {
        insert(target, div, anchor);
        if (if_block) if_block.m(div, null);
        /*div_binding_1*/

        ctx[101](div);
      },
      p: function p(ctx, dirty) {
        if (!
        /*_titleElement*/
        ctx[32]) {
          if (if_block) {
            if_block.p(ctx, dirty);
          } else {
            if_block = create_if_block_4(ctx);
            if_block.c();
            if_block.m(div, null);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
      },
      d: function d(detaching) {
        if (detaching) detach(div);
        if (if_block) if_block.d();
        /*div_binding_1*/

        ctx[101](null);
      }
    };
  } // (935:10) {#if !_titleElement}


  function create_if_block_4(ctx) {
    var if_block_anchor;

    function select_block_type(ctx, dirty) {
      if (
      /*titleTrusted*/
      ctx[4]) return create_if_block_5;
      return create_else_block_1;
    }

    var current_block_type = select_block_type(ctx);
    var if_block = current_block_type(ctx);
    return {
      c: function c() {
        if_block.c();
        if_block_anchor = empty();
      },
      m: function m(target, anchor) {
        if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
      },
      p: function p(ctx, dirty) {
        if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block.d(1);
          if_block = current_block_type(ctx);

          if (if_block) {
            if_block.c();
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        }
      },
      d: function d(detaching) {
        if_block.d(detaching);
        if (detaching) detach(if_block_anchor);
      }
    };
  } // (938:12) {:else}


  function create_else_block_1(ctx) {
    var span;
    var t;
    return {
      c: function c() {
        span = element("span");
        t = text(
        /*title*/
        ctx[3]);
        attr(span, "class", "pnotify-pre-line");
      },
      m: function m(target, anchor) {
        insert(target, span, anchor);
        append(span, t);
      },
      p: function p(ctx, dirty) {
        if (dirty[0] &
        /*title*/
        8) set_data(t,
        /*title*/
        ctx[3]);
      },
      d: function d(detaching) {
        if (detaching) detach(span);
      }
    };
  } // (936:12) {#if titleTrusted}


  function create_if_block_5(ctx) {
    var html_tag;
    return {
      c: function c() {
        html_tag = new HtmlTag(
        /*title*/
        ctx[3], null);
      },
      m: function m(target, anchor) {
        html_tag.m(target, anchor);
      },
      p: function p(ctx, dirty) {
        if (dirty[0] &
        /*title*/
        8) html_tag.p(
        /*title*/
        ctx[3]);
      },
      d: function d(detaching) {
        if (detaching) html_tag.d();
      }
    };
  } // (944:6) {#if text !== false}


  function create_if_block(ctx) {
    var div;
    var div_class_value;
    var if_block = !
    /*_textElement*/
    ctx[33] && create_if_block_1(ctx);
    return {
      c: function c() {
        div = element("div");
        if (if_block) if_block.c();
        attr(div, "class", div_class_value = "pnotify-text ".concat(
        /*getStyle*/
        ctx[20]("text")));
        attr(div, "style",
        /*_maxTextHeightStyle*/
        ctx[31]);
        attr(div, "role", "alert");
      },
      m: function m(target, anchor) {
        insert(target, div, anchor);
        if (if_block) if_block.m(div, null);
        /*div_binding_2*/

        ctx[102](div);
      },
      p: function p(ctx, dirty) {
        if (!
        /*_textElement*/
        ctx[33]) {
          if (if_block) {
            if_block.p(ctx, dirty);
          } else {
            if_block = create_if_block_1(ctx);
            if_block.c();
            if_block.m(div, null);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }

        if (dirty[1] &
        /*_maxTextHeightStyle*/
        1) {
          attr(div, "style",
          /*_maxTextHeightStyle*/
          ctx[31]);
        }
      },
      d: function d(detaching) {
        if (detaching) detach(div);
        if (if_block) if_block.d();
        /*div_binding_2*/

        ctx[102](null);
      }
    };
  } // (951:10) {#if !_textElement}


  function create_if_block_1(ctx) {
    var if_block_anchor;

    function select_block_type_1(ctx, dirty) {
      if (
      /*textTrusted*/
      ctx[6]) return create_if_block_2;
      return create_else_block;
    }

    var current_block_type = select_block_type_1(ctx);
    var if_block = current_block_type(ctx);
    return {
      c: function c() {
        if_block.c();
        if_block_anchor = empty();
      },
      m: function m(target, anchor) {
        if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
      },
      p: function p(ctx, dirty) {
        if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block.d(1);
          if_block = current_block_type(ctx);

          if (if_block) {
            if_block.c();
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        }
      },
      d: function d(detaching) {
        if_block.d(detaching);
        if (detaching) detach(if_block_anchor);
      }
    };
  } // (954:12) {:else}


  function create_else_block(ctx) {
    var span;
    var t;
    return {
      c: function c() {
        span = element("span");
        t = text(
        /*text*/
        ctx[5]);
        attr(span, "class", "pnotify-pre-line");
      },
      m: function m(target, anchor) {
        insert(target, span, anchor);
        append(span, t);
      },
      p: function p(ctx, dirty) {
        if (dirty[0] &
        /*text*/
        32) set_data(t,
        /*text*/
        ctx[5]);
      },
      d: function d(detaching) {
        if (detaching) detach(span);
      }
    };
  } // (952:12) {#if textTrusted}


  function create_if_block_2(ctx) {
    var html_tag;
    return {
      c: function c() {
        html_tag = new HtmlTag(
        /*text*/
        ctx[5], null);
      },
      m: function m(target, anchor) {
        html_tag.m(target, anchor);
      },
      p: function p(ctx, dirty) {
        if (dirty[0] &
        /*text*/
        32) html_tag.p(
        /*text*/
        ctx[5]);
      },
      d: function d(detaching) {
        if (detaching) html_tag.d();
      }
    };
  } // (960:6) {#each modulesAppendContent as [module, options] (module)}


  function create_each_block_1(key_1, ctx) {
    var first;
    var switch_instance_anchor;
    var current;
    var switch_instance_spread_levels = [{
      self:
      /*self*/
      ctx[41]
    },
    /*options*/
    ctx[107]];
    var switch_value =
    /*module*/
    ctx[106]["default"];

    function switch_props(ctx) {
      var switch_instance_props = {};

      for (var i = 0; i < switch_instance_spread_levels.length; i += 1) {
        switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
      }

      return {
        props: switch_instance_props
      };
    }

    if (switch_value) {
      var switch_instance = new switch_value(switch_props());
    }

    return {
      key: key_1,
      first: null,
      c: function c() {
        first = empty();
        if (switch_instance) create_component(switch_instance.$$.fragment);
        switch_instance_anchor = empty();
        this.first = first;
      },
      m: function m(target, anchor) {
        insert(target, first, anchor);

        if (switch_instance) {
          mount_component(switch_instance, target, anchor);
        }

        insert(target, switch_instance_anchor, anchor);
        current = true;
      },
      p: function p(ctx, dirty) {
        var switch_instance_changes = dirty[1] &
        /*self, modulesAppendContent*/
        1280 ? get_spread_update(switch_instance_spread_levels, [dirty[1] &
        /*self*/
        1024 && {
          self:
          /*self*/
          ctx[41]
        }, dirty[1] &
        /*modulesAppendContent*/
        256 && get_spread_object(
        /*options*/
        ctx[107])]) : {};

        if (switch_value !== (switch_value =
        /*module*/
        ctx[106]["default"])) {
          if (switch_instance) {
            group_outros();
            var old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, function () {
              destroy_component(old_component, 1);
            });
            check_outros();
          }

          if (switch_value) {
            switch_instance = new switch_value(switch_props());
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
          } else {
            switch_instance = null;
          }
        } else if (switch_value) {
          switch_instance.$set(switch_instance_changes);
        }
      },
      i: function i(local) {
        if (current) return;
        if (switch_instance) transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o: function o(local) {
        if (switch_instance) transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d: function d(detaching) {
        if (detaching) detach(first);
        if (detaching) detach(switch_instance_anchor);
        if (switch_instance) destroy_component(switch_instance, detaching);
      }
    };
  } // (964:4) {#each modulesAppendContainer as [module, options] (module)}


  function create_each_block(key_1, ctx) {
    var first;
    var switch_instance_anchor;
    var current;
    var switch_instance_spread_levels = [{
      self:
      /*self*/
      ctx[41]
    },
    /*options*/
    ctx[107]];
    var switch_value =
    /*module*/
    ctx[106]["default"];

    function switch_props(ctx) {
      var switch_instance_props = {};

      for (var i = 0; i < switch_instance_spread_levels.length; i += 1) {
        switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
      }

      return {
        props: switch_instance_props
      };
    }

    if (switch_value) {
      var switch_instance = new switch_value(switch_props());
    }

    return {
      key: key_1,
      first: null,
      c: function c() {
        first = empty();
        if (switch_instance) create_component(switch_instance.$$.fragment);
        switch_instance_anchor = empty();
        this.first = first;
      },
      m: function m(target, anchor) {
        insert(target, first, anchor);

        if (switch_instance) {
          mount_component(switch_instance, target, anchor);
        }

        insert(target, switch_instance_anchor, anchor);
        current = true;
      },
      p: function p(ctx, dirty) {
        var switch_instance_changes = dirty[1] &
        /*self, modulesAppendContainer*/
        1536 ? get_spread_update(switch_instance_spread_levels, [dirty[1] &
        /*self*/
        1024 && {
          self:
          /*self*/
          ctx[41]
        }, dirty[1] &
        /*modulesAppendContainer*/
        512 && get_spread_object(
        /*options*/
        ctx[107])]) : {};

        if (switch_value !== (switch_value =
        /*module*/
        ctx[106]["default"])) {
          if (switch_instance) {
            group_outros();
            var old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, function () {
              destroy_component(old_component, 1);
            });
            check_outros();
          }

          if (switch_value) {
            switch_instance = new switch_value(switch_props());
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
          } else {
            switch_instance = null;
          }
        } else if (switch_value) {
          switch_instance.$set(switch_instance_changes);
        }
      },
      i: function i(local) {
        if (current) return;
        if (switch_instance) transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o: function o(local) {
        if (switch_instance) transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d: function d(detaching) {
        if (detaching) detach(first);
        if (detaching) detach(switch_instance_anchor);
        if (switch_instance) destroy_component(switch_instance, detaching);
      }
    };
  }

  function create_fragment(ctx) {
    var div2;
    var div1;
    var each_blocks_3 = [];
    var each0_lookup = new Map_1();
    var t0;
    var t1;
    var t2;
    var t3;
    var div0;
    var each_blocks_2 = [];
    var each1_lookup = new Map_1();
    var t4;
    var t5;
    var t6;
    var each_blocks_1 = [];
    var each2_lookup = new Map_1();
    var div0_class_value;
    var t7;
    var each_blocks = [];
    var each3_lookup = new Map_1();
    var div1_class_value;
    var div1_style_value;
    var div2_class_value;
    var forwardEvents_action;
    var current;
    var dispose;
    var each_value_3 =
    /*modulesPrependContainer*/
    ctx[37];

    var get_key = function get_key(ctx) {
      return (
        /*module*/
        ctx[106]
      );
    };

    for (var i = 0; i < each_value_3.length; i += 1) {
      var child_ctx = get_each_context_3(ctx, each_value_3, i);
      var key = get_key(child_ctx);
      each0_lookup.set(key, each_blocks_3[i] = create_each_block_3(key, child_ctx));
    }

    var if_block0 =
    /*closer*/
    ctx[15] && !
    /*_nonBlock*/
    ctx[35] && create_if_block_8(ctx);
    var if_block1 =
    /*sticker*/
    ctx[17] && !
    /*_nonBlock*/
    ctx[35] && create_if_block_7(ctx);
    var if_block2 =
    /*icon*/
    ctx[11] !== false && create_if_block_6(ctx);
    var each_value_2 =
    /*modulesPrependContent*/
    ctx[38];

    var get_key_1 = function get_key_1(ctx) {
      return (
        /*module*/
        ctx[106]
      );
    };

    for (var _i = 0; _i < each_value_2.length; _i += 1) {
      var _child_ctx = get_each_context_2(ctx, each_value_2, _i);

      var _key = get_key_1(_child_ctx);

      each1_lookup.set(_key, each_blocks_2[_i] = create_each_block_2(_key, _child_ctx));
    }

    var if_block3 =
    /*title*/
    ctx[3] !== false && create_if_block_3(ctx);
    var if_block4 =
    /*text*/
    ctx[5] !== false && create_if_block(ctx);
    var each_value_1 =
    /*modulesAppendContent*/
    ctx[39];

    var get_key_2 = function get_key_2(ctx) {
      return (
        /*module*/
        ctx[106]
      );
    };

    for (var _i2 = 0; _i2 < each_value_1.length; _i2 += 1) {
      var _child_ctx2 = get_each_context_1(ctx, each_value_1, _i2);

      var _key2 = get_key_2(_child_ctx2);

      each2_lookup.set(_key2, each_blocks_1[_i2] = create_each_block_1(_key2, _child_ctx2));
    }

    var each_value =
    /*modulesAppendContainer*/
    ctx[40];

    var get_key_3 = function get_key_3(ctx) {
      return (
        /*module*/
        ctx[106]
      );
    };

    for (var _i3 = 0; _i3 < each_value.length; _i3 += 1) {
      var _child_ctx3 = get_each_context(ctx, each_value, _i3);

      var _key3 = get_key_3(_child_ctx3);

      each3_lookup.set(_key3, each_blocks[_i3] = create_each_block(_key3, _child_ctx3));
    }

    return {
      c: function c() {
        div2 = element("div");
        div1 = element("div");

        for (var _i4 = 0; _i4 < each_blocks_3.length; _i4 += 1) {
          each_blocks_3[_i4].c();
        }

        t0 = space();
        if (if_block0) if_block0.c();
        t1 = space();
        if (if_block1) if_block1.c();
        t2 = space();
        if (if_block2) if_block2.c();
        t3 = space();
        div0 = element("div");

        for (var _i5 = 0; _i5 < each_blocks_2.length; _i5 += 1) {
          each_blocks_2[_i5].c();
        }

        t4 = space();
        if (if_block3) if_block3.c();
        t5 = space();
        if (if_block4) if_block4.c();
        t6 = space();

        for (var _i6 = 0; _i6 < each_blocks_1.length; _i6 += 1) {
          each_blocks_1[_i6].c();
        }

        t7 = space();

        for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
          each_blocks[_i7].c();
        }

        attr(div0, "class", div0_class_value = "pnotify-content ".concat(
        /*getStyle*/
        ctx[20]("content")));
        attr(div1, "class", div1_class_value = "pnotify-container ".concat(
        /*getStyle*/
        ctx[20]("container"), " ").concat(
        /*getStyle*/
        ctx[20](
        /*type*/
        ctx[2]), " ").concat(
        /*shadow*/
        ctx[14] ? "pnotify-shadow" : "", " ").concat(
        /*_moduleClasses*/
        ctx[26].container.join(" ")));
        attr(div1, "style", div1_style_value = "".concat(
        /*_widthStyle*/
        ctx[29], " ").concat(
        /*_minHeightStyle*/
        ctx[30]));
        attr(div1, "role", "alert");
        attr(div2, "data-pnotify", "");
        attr(div2, "class", div2_class_value = "pnotify ".concat(
        /*icon*/
        ctx[11] !== false ? "pnotify-with-icon" : "", " ").concat(
        /*getStyle*/
        ctx[20]("elem"), " pnotify-mode-").concat(
        /*mode*/
        ctx[7], " ").concat(
        /*addClass*/
        ctx[8], " ").concat(
        /*_animatingClass*/
        ctx[23], " ").concat(
        /*_moveClass*/
        ctx[24], " ").concat(
        /*_stackDirClass*/
        ctx[36], " ").concat(
        /*animation*/
        ctx[12] === "fade" ? "pnotify-fade-".concat(
        /*animateSpeed*/
        ctx[13]) : "", " ").concat(
        /*_modal*/
        ctx[34] ? "pnotify-modal ".concat(
        /*addModalClass*/
        ctx[9]) :
        /*addModelessClass*/
        ctx[10], " ").concat(
        /*_masking*/
        ctx[27] ? "pnotify-masking" : "", " ").concat(
        /*_maskingIn*/
        ctx[28] ? "pnotify-masking-in" : "", " ").concat(
        /*_moduleClasses*/
        ctx[26].elem.join(" ")));
        attr(div2, "aria-live", "assertive");
        attr(div2, "role", "alertdialog");
      },
      m: function m(target, anchor, remount) {
        insert(target, div2, anchor);
        append(div2, div1);

        for (var _i8 = 0; _i8 < each_blocks_3.length; _i8 += 1) {
          each_blocks_3[_i8].m(div1, null);
        }

        append(div1, t0);
        if (if_block0) if_block0.m(div1, null);
        append(div1, t1);
        if (if_block1) if_block1.m(div1, null);
        append(div1, t2);
        if (if_block2) if_block2.m(div1, null);
        append(div1, t3);
        append(div1, div0);

        for (var _i9 = 0; _i9 < each_blocks_2.length; _i9 += 1) {
          each_blocks_2[_i9].m(div0, null);
        }

        append(div0, t4);
        if (if_block3) if_block3.m(div0, null);
        append(div0, t5);
        if (if_block4) if_block4.m(div0, null);
        append(div0, t6);

        for (var _i10 = 0; _i10 < each_blocks_1.length; _i10 += 1) {
          each_blocks_1[_i10].m(div0, null);
        }
        /*div0_binding*/


        ctx[103](div0);
        append(div1, t7);

        for (var _i11 = 0; _i11 < each_blocks.length; _i11 += 1) {
          each_blocks[_i11].m(div1, null);
        }
        /*div1_binding*/


        ctx[104](div1);
        /*div2_binding*/

        ctx[105](div2);
        current = true;
        if (remount) run_all(dispose);
        dispose = [action_destroyer(forwardEvents_action =
        /*forwardEvents*/
        ctx[42].call(null, div2)), listen(div2, "mouseenter",
        /*handleInteraction*/
        ctx[43]), listen(div2, "mouseleave",
        /*handleLeaveInteraction*/
        ctx[44]), listen(div2, "focusin",
        /*handleInteraction*/
        ctx[43]), listen(div2, "focusout",
        /*handleLeaveInteraction*/
        ctx[44])];
      },
      p: function p(ctx, dirty) {
        if (dirty[1] &
        /*modulesPrependContainer, self*/
        1088) {
          var _each_value_ =
          /*modulesPrependContainer*/
          ctx[37];
          group_outros();
          each_blocks_3 = update_keyed_each(each_blocks_3, dirty, get_key, 1, ctx, _each_value_, each0_lookup, div1, outro_and_destroy_block, create_each_block_3, t0, get_each_context_3);
          check_outros();
        }

        if (
        /*closer*/
        ctx[15] && !
        /*_nonBlock*/
        ctx[35]) {
          if (if_block0) {
            if_block0.p(ctx, dirty);
          } else {
            if_block0 = create_if_block_8(ctx);
            if_block0.c();
            if_block0.m(div1, t1);
          }
        } else if (if_block0) {
          if_block0.d(1);
          if_block0 = null;
        }

        if (
        /*sticker*/
        ctx[17] && !
        /*_nonBlock*/
        ctx[35]) {
          if (if_block1) {
            if_block1.p(ctx, dirty);
          } else {
            if_block1 = create_if_block_7(ctx);
            if_block1.c();
            if_block1.m(div1, t2);
          }
        } else if (if_block1) {
          if_block1.d(1);
          if_block1 = null;
        }

        if (
        /*icon*/
        ctx[11] !== false) {
          if (if_block2) {
            if_block2.p(ctx, dirty);
          } else {
            if_block2 = create_if_block_6(ctx);
            if_block2.c();
            if_block2.m(div1, t3);
          }
        } else if (if_block2) {
          if_block2.d(1);
          if_block2 = null;
        }

        if (dirty[1] &
        /*modulesPrependContent, self*/
        1152) {
          var _each_value_2 =
          /*modulesPrependContent*/
          ctx[38];
          group_outros();
          each_blocks_2 = update_keyed_each(each_blocks_2, dirty, get_key_1, 1, ctx, _each_value_2, each1_lookup, div0, outro_and_destroy_block, create_each_block_2, t4, get_each_context_2);
          check_outros();
        }

        if (
        /*title*/
        ctx[3] !== false) {
          if (if_block3) {
            if_block3.p(ctx, dirty);
          } else {
            if_block3 = create_if_block_3(ctx);
            if_block3.c();
            if_block3.m(div0, t5);
          }
        } else if (if_block3) {
          if_block3.d(1);
          if_block3 = null;
        }

        if (
        /*text*/
        ctx[5] !== false) {
          if (if_block4) {
            if_block4.p(ctx, dirty);
          } else {
            if_block4 = create_if_block(ctx);
            if_block4.c();
            if_block4.m(div0, t6);
          }
        } else if (if_block4) {
          if_block4.d(1);
          if_block4 = null;
        }

        if (dirty[1] &
        /*modulesAppendContent, self*/
        1280) {
          var _each_value_3 =
          /*modulesAppendContent*/
          ctx[39];
          group_outros();
          each_blocks_1 = update_keyed_each(each_blocks_1, dirty, get_key_2, 1, ctx, _each_value_3, each2_lookup, div0, outro_and_destroy_block, create_each_block_1, null, get_each_context_1);
          check_outros();
        }

        if (dirty[1] &
        /*modulesAppendContainer, self*/
        1536) {
          var _each_value =
          /*modulesAppendContainer*/
          ctx[40];
          group_outros();
          each_blocks = update_keyed_each(each_blocks, dirty, get_key_3, 1, ctx, _each_value, each3_lookup, div1, outro_and_destroy_block, create_each_block, null, get_each_context);
          check_outros();
        }

        if (!current || dirty[0] &
        /*type, shadow, _moduleClasses*/
        67125252 && div1_class_value !== (div1_class_value = "pnotify-container ".concat(
        /*getStyle*/
        ctx[20]("container"), " ").concat(
        /*getStyle*/
        ctx[20](
        /*type*/
        ctx[2]), " ").concat(
        /*shadow*/
        ctx[14] ? "pnotify-shadow" : "", " ").concat(
        /*_moduleClasses*/
        ctx[26].container.join(" ")))) {
          attr(div1, "class", div1_class_value);
        }

        if (!current || dirty[0] &
        /*_widthStyle, _minHeightStyle*/
        1610612736 && div1_style_value !== (div1_style_value = "".concat(
        /*_widthStyle*/
        ctx[29], " ").concat(
        /*_minHeightStyle*/
        ctx[30]))) {
          attr(div1, "style", div1_style_value);
        }

        if (!current || dirty[0] &
        /*icon, mode, addClass, _animatingClass, _moveClass, animation, animateSpeed, addModalClass, addModelessClass, _masking, _maskingIn, _moduleClasses*/
        494944128 | dirty[1] &
        /*_stackDirClass, _modal*/
        40 && div2_class_value !== (div2_class_value = "pnotify ".concat(
        /*icon*/
        ctx[11] !== false ? "pnotify-with-icon" : "", " ").concat(
        /*getStyle*/
        ctx[20]("elem"), " pnotify-mode-").concat(
        /*mode*/
        ctx[7], " ").concat(
        /*addClass*/
        ctx[8], " ").concat(
        /*_animatingClass*/
        ctx[23], " ").concat(
        /*_moveClass*/
        ctx[24], " ").concat(
        /*_stackDirClass*/
        ctx[36], " ").concat(
        /*animation*/
        ctx[12] === "fade" ? "pnotify-fade-".concat(
        /*animateSpeed*/
        ctx[13]) : "", " ").concat(
        /*_modal*/
        ctx[34] ? "pnotify-modal ".concat(
        /*addModalClass*/
        ctx[9]) :
        /*addModelessClass*/
        ctx[10], " ").concat(
        /*_masking*/
        ctx[27] ? "pnotify-masking" : "", " ").concat(
        /*_maskingIn*/
        ctx[28] ? "pnotify-masking-in" : "", " ").concat(
        /*_moduleClasses*/
        ctx[26].elem.join(" ")))) {
          attr(div2, "class", div2_class_value);
        }
      },
      i: function i(local) {
        if (current) return;

        for (var _i12 = 0; _i12 < each_value_3.length; _i12 += 1) {
          transition_in(each_blocks_3[_i12]);
        }

        for (var _i13 = 0; _i13 < each_value_2.length; _i13 += 1) {
          transition_in(each_blocks_2[_i13]);
        }

        for (var _i14 = 0; _i14 < each_value_1.length; _i14 += 1) {
          transition_in(each_blocks_1[_i14]);
        }

        for (var _i15 = 0; _i15 < each_value.length; _i15 += 1) {
          transition_in(each_blocks[_i15]);
        }

        current = true;
      },
      o: function o(local) {
        for (var _i16 = 0; _i16 < each_blocks_3.length; _i16 += 1) {
          transition_out(each_blocks_3[_i16]);
        }

        for (var _i17 = 0; _i17 < each_blocks_2.length; _i17 += 1) {
          transition_out(each_blocks_2[_i17]);
        }

        for (var _i18 = 0; _i18 < each_blocks_1.length; _i18 += 1) {
          transition_out(each_blocks_1[_i18]);
        }

        for (var _i19 = 0; _i19 < each_blocks.length; _i19 += 1) {
          transition_out(each_blocks[_i19]);
        }

        current = false;
      },
      d: function d(detaching) {
        if (detaching) detach(div2);

        for (var _i20 = 0; _i20 < each_blocks_3.length; _i20 += 1) {
          each_blocks_3[_i20].d();
        }

        if (if_block0) if_block0.d();
        if (if_block1) if_block1.d();
        if (if_block2) if_block2.d();

        for (var _i21 = 0; _i21 < each_blocks_2.length; _i21 += 1) {
          each_blocks_2[_i21].d();
        }

        if (if_block3) if_block3.d();
        if (if_block4) if_block4.d();

        for (var _i22 = 0; _i22 < each_blocks_1.length; _i22 += 1) {
          each_blocks_1[_i22].d();
        }
        /*div0_binding*/


        ctx[103](null);

        for (var _i23 = 0; _i23 < each_blocks.length; _i23 += 1) {
          each_blocks[_i23].d();
        }
        /*div1_binding*/


        ctx[104](null);
        /*div2_binding*/

        ctx[105](null);
        run_all(dispose);
      }
    };
  }

  var alert = function alert(options) {
    return component(getDefaultArgs(options));
  };

  var notice = function notice(options) {
    return component(getDefaultArgs(options, "notice"));
  };

  var info = function info(options) {
    return component(getDefaultArgs(options, "info"));
  };

  var success = function success(options) {
    return component(getDefaultArgs(options, "success"));
  };

  var error = function error(options) {
    return component(getDefaultArgs(options, "error"));
  }; // Default arguments for the new notice helper functions.


  function getDefaultArgs(options, type) {
    if (_typeof(options) !== "object") {
      options = {
        text: options
      };
    } // Only assign the type if it was requested, so we don't overwrite
    // options.type if it has something assigned.


    if (type) {
      options.type = type;
    }

    var target = document.body;

    if ("stack" in options && options.stack && options.stack.context) {
      target = options.stack.context;
    }

    return {
      target: target,
      props: options
    };
  }

  var defaultStack = new Stack({
    dir1: "down",
    dir2: "left",
    firstpos1: 25,
    firstpos2: 25,
    spacing1: 36,
    spacing2: 36,
    push: "bottom"
  });
  var defaultModules = new Map();
  var defaults = {
    type: "notice",
    title: false,
    titleTrusted: false,
    text: false,
    textTrusted: false,
    styling: "brighttheme",
    icons: "brighttheme",
    mode: "no-preference",
    addClass: "",
    addModalClass: "",
    addModelessClass: "",
    autoOpen: true,
    width: "360px",
    minHeight: "16px",
    maxTextHeight: "200px",
    icon: true,
    animation: "fade",
    animateSpeed: "normal",
    shadow: true,
    hide: true,
    delay: 8000,
    mouseReset: true,
    closer: true,
    closerHover: true,
    sticker: true,
    stickerHover: true,
    labels: {
      close: "Close",
      stick: "Pin",
      unstick: "Unpin"
    },
    remove: true,
    destroy: true,
    stack: defaultStack,
    modules: defaultModules
  };
  var posTimer; // These actions need to be done once the DOM is ready.

  function onDocumentLoaded() {
    if (!defaultStack.context) {
      defaultStack.context = document.body;
    } // Reposition the notices when the window resizes.


    window.addEventListener("resize", function () {
      // This timer is used for queueing the position event so it doesn't run
      // repeatedly.
      if (posTimer) {
        clearTimeout(posTimer);
      }

      posTimer = setTimeout(function () {
        var event = new Event("pnotify:position");
        document.body.dispatchEvent(event);
        posTimer = null;
      }, 10);
    });
  } // Run the deferred actions once the DOM is ready.


  if (window && document.body) {
    onDocumentLoaded();
  } else {
    document.addEventListener("DOMContentLoaded", onDocumentLoaded);
  }

  function instance($$self, $$props, $$invalidate) {
    var self = get_current_component();
    var dispatch = createEventDispatcher();
    var forwardEvents = forwardEventsBuilder(self, ["pnotify:init", "pnotify:mount", "pnotify:update", "pnotify:beforeOpen", "pnotify:afterOpen", "pnotify:enterModal", "pnotify:leaveModal", "pnotify:beforeClose", "pnotify:afterClose", "pnotify:beforeDestroy", "pnotify:afterDestroy", "focusin", "focusout", "animationend", "transitionend"]);
    var _$$props$modules = $$props.modules,
        modules = _$$props$modules === void 0 ? new Map(defaults.modules) : _$$props$modules;
    var _$$props$stack = $$props.stack,
        stack = _$$props$stack === void 0 ? defaults.stack : _$$props$stack;
    var refs = {
      elem: null,
      container: null,
      content: null,
      iconContainer: null,
      titleContainer: null,
      textContainer: null
    }; // Run init to give a chance for modules to override defaults.

    var selfDefaults = _objectSpread2({}, defaults);

    dispatchLifecycleEvent("init", {
      notice: self,
      defaults: selfDefaults
    });
    var _$$props$type = $$props.type,
        type = _$$props$type === void 0 ? selfDefaults.type : _$$props$type;
    var _$$props$title = $$props.title,
        title = _$$props$title === void 0 ? selfDefaults.title : _$$props$title;
    var _$$props$titleTrusted = $$props.titleTrusted,
        titleTrusted = _$$props$titleTrusted === void 0 ? selfDefaults.titleTrusted : _$$props$titleTrusted;
    var _$$props$text = $$props.text,
        text = _$$props$text === void 0 ? selfDefaults.text : _$$props$text;
    var _$$props$textTrusted = $$props.textTrusted,
        textTrusted = _$$props$textTrusted === void 0 ? selfDefaults.textTrusted : _$$props$textTrusted;
    var _$$props$styling = $$props.styling,
        styling = _$$props$styling === void 0 ? selfDefaults.styling : _$$props$styling;
    var _$$props$icons = $$props.icons,
        icons = _$$props$icons === void 0 ? selfDefaults.icons : _$$props$icons;
    var _$$props$mode = $$props.mode,
        mode = _$$props$mode === void 0 ? selfDefaults.mode : _$$props$mode;
    var _$$props$addClass = $$props.addClass,
        addClass = _$$props$addClass === void 0 ? selfDefaults.addClass : _$$props$addClass;
    var _$$props$addModalClas = $$props.addModalClass,
        addModalClass = _$$props$addModalClas === void 0 ? selfDefaults.addModalClass : _$$props$addModalClas;
    var _$$props$addModelessC = $$props.addModelessClass,
        addModelessClass = _$$props$addModelessC === void 0 ? selfDefaults.addModelessClass : _$$props$addModelessC;
    var _$$props$autoOpen = $$props.autoOpen,
        autoOpen = _$$props$autoOpen === void 0 ? selfDefaults.autoOpen : _$$props$autoOpen;
    var _$$props$width = $$props.width,
        width = _$$props$width === void 0 ? selfDefaults.width : _$$props$width;
    var _$$props$minHeight = $$props.minHeight,
        minHeight = _$$props$minHeight === void 0 ? selfDefaults.minHeight : _$$props$minHeight;
    var _$$props$maxTextHeigh = $$props.maxTextHeight,
        maxTextHeight = _$$props$maxTextHeigh === void 0 ? selfDefaults.maxTextHeight : _$$props$maxTextHeigh;
    var _$$props$icon = $$props.icon,
        icon = _$$props$icon === void 0 ? selfDefaults.icon : _$$props$icon;
    var _$$props$animation = $$props.animation,
        animation = _$$props$animation === void 0 ? selfDefaults.animation : _$$props$animation;
    var _$$props$animateSpeed = $$props.animateSpeed,
        animateSpeed = _$$props$animateSpeed === void 0 ? selfDefaults.animateSpeed : _$$props$animateSpeed;
    var _$$props$shadow = $$props.shadow,
        shadow = _$$props$shadow === void 0 ? selfDefaults.shadow : _$$props$shadow;
    var _$$props$hide = $$props.hide,
        hide = _$$props$hide === void 0 ? selfDefaults.hide : _$$props$hide;
    var _$$props$delay = $$props.delay,
        delay = _$$props$delay === void 0 ? selfDefaults.delay : _$$props$delay;
    var _$$props$mouseReset = $$props.mouseReset,
        mouseReset = _$$props$mouseReset === void 0 ? selfDefaults.mouseReset : _$$props$mouseReset;
    var _$$props$closer = $$props.closer,
        closer = _$$props$closer === void 0 ? selfDefaults.closer : _$$props$closer;
    var _$$props$closerHover = $$props.closerHover,
        closerHover = _$$props$closerHover === void 0 ? selfDefaults.closerHover : _$$props$closerHover;
    var _$$props$sticker = $$props.sticker,
        sticker = _$$props$sticker === void 0 ? selfDefaults.sticker : _$$props$sticker;
    var _$$props$stickerHover = $$props.stickerHover,
        stickerHover = _$$props$stickerHover === void 0 ? selfDefaults.stickerHover : _$$props$stickerHover;
    var _$$props$labels = $$props.labels,
        labels = _$$props$labels === void 0 ? selfDefaults.labels : _$$props$labels;
    var _$$props$remove = $$props.remove,
        remove = _$$props$remove === void 0 ? selfDefaults.remove : _$$props$remove;
    var _$$props$destroy = $$props.destroy,
        destroy = _$$props$destroy === void 0 ? selfDefaults.destroy : _$$props$destroy; // The state can be 'waiting', 'opening', 'open', 'closing', or 'closed'.

    var _state = "closed"; // Auto close timer.

    var _timer = null; // Animation timers.

    var _animInTimer = null;
    var _animOutTimer = null; // Stores what is currently being animated (in or out).

    var _animating = false; // Stores the class that adds entry/exit animation effects.

    var _animatingClass = ""; // Stores the class that adds movement animation effects.

    var _moveClass = ""; // Stores whether the notice was hidden by a timer.

    var _timerHide = false; // Whether the mouse is over the notice or the notice is focused.

    var _interacting = false; // Holds classes that modules add for the notice element or container element.

    var _moduleClasses = {
      elem: [],
      container: []
    }; // Modules that change how the notice displays (causing the notice element to
    // not appear) can set these to true to make PNotify handle it correctly.

    var _moduleHandled = false;
    var _moduleOpen = false; // The masking control for the second notice in a modalish stack when the
    // first notice is hovered.

    var _masking = false;
    var _maskingIn = false;
    var _maskingTimer = null; // Save the old value of hide, so we can reset the timer if it changes.

    var _oldHide = hide;

    var getState = function getState() {
      return _state;
    };

    var getTimer = function getTimer() {
      return _timer;
    };

    var getStyle = function getStyle(name) {
      return typeof styling === "string" ? "".concat(styling, "-").concat(name) : name in styling ? styling[name] : "".concat(styling.prefix, "-").concat(name);
    };

    var getIcon = function getIcon(name) {
      return typeof icons === "string" ? "".concat(icons, "-icon-").concat(name) : name in icons ? icons[name] : "".concat(icons.prefix, "-icon-").concat(name);
    };

    var _oldStack = NaN;
    var _oldModal = false;
    onMount(function () {
      dispatchLifecycleEvent("mount"); // Display the notice.

      if (autoOpen) {
        open();
      }
    });
    beforeUpdate(function () {
      dispatchLifecycleEvent("update"); // Update the timed hiding.

      if (_state !== "closed" && _state !== "waiting" && hide !== _oldHide) {
        if (!hide) {
          cancelClose();
        } else if (!_oldHide) {
          queueClose();
        }
      } // Queue a position


      if (_state !== "closed" && _state !== "closing" && stack && !stack._collapsingModalState) {
        stack.queuePosition();
      } // Save old options.


      _oldHide = hide;
    });

    function handleInteraction(e) {
      $$invalidate(25, _interacting = true); // Stop animation, reset the removal timer when the user interacts.

      if (mouseReset && _state === "closing") {
        if (!_timerHide) {
          return;
        }

        cancelClose();
      } // Stop the close timer.


      if (hide && mouseReset) {
        cancelClose();
      }
    }

    function handleLeaveInteraction(e) {
      $$invalidate(25, _interacting = false); // Start the close timer.

      if (hide && mouseReset && _animating !== "out") {
        queueClose();
      }
    } // This runs an event on all the modules.


    function dispatchLifecycleEvent(event) {
      var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var eventDetail = _objectSpread2({
        notice: self
      }, detail);

      if (event === "init") {
        Array.from(modules).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              module = _ref2[0],
              options = _ref2[1];

          return "init" in module && module.init(eventDetail);
        });
      }

      var target = refs.elem || stack && stack.context || document.body;

      if (!target) {
        dispatch("pnotify:".concat(event), eventDetail);
        return true;
      }

      var eventObj = new Event("pnotify:".concat(event), {
        bubbles: event === "init" || event === "mount",
        cancelable: event.startsWith("before")
      });
      eventObj.detail = eventDetail;
      target.dispatchEvent(eventObj);
      return !eventObj.defaultPrevented;
    }

    function insertIntoDOM() {
      // If the notice is not in the DOM, or in the wrong context, append it.
      var target = stack && stack.context || document.body;

      if (!target) {
        throw new Error("No context to insert this notice into.");
      }

      if (!refs.elem) {
        throw new Error("Trying to insert notice before element is available.");
      }

      if (refs.elem.parentNode !== target) {
        target.appendChild(refs.elem);
      }
    }

    function removeFromDOM() {
      refs.elem && refs.elem.parentNode.removeChild(refs.elem);
    }

    var _$$props$open = $$props.open,
        open = _$$props$open === void 0 ? function (immediate) {
      if (_state === "opening") {
        return;
      }

      if (_state === "open") {
        if (hide) {
          queueClose();
        }

        return;
      }

      if (!_moduleHandled && stack && stack._shouldNoticeWait()) {
        $$invalidate(81, _state = "waiting");
        return;
      }

      if (!dispatchLifecycleEvent("beforeOpen", {
        immediate: immediate
      })) {
        return;
      }

      $$invalidate(81, _state = "opening");
      $$invalidate(27, _masking = false); // This makes the notice visibity: hidden; so its dimensions can be
      // determined.

      $$invalidate(23, _animatingClass = "pnotify-initial pnotify-hidden");

      var afterOpenCallback = function afterOpenCallback() {
        // Now set it to hide.
        if (hide) {
          queueClose();
        }

        $$invalidate(81, _state = "open");
        dispatchLifecycleEvent("afterOpen", {
          immediate: immediate
        });
      };

      if (stack) {
        // Notify the stack that a notice has opened.
        stack._handleNoticeOpened(self);
      }

      if (_moduleOpen) {
        afterOpenCallback();
        return;
      }

      insertIntoDOM(); // Wait until the DOM is updated.

      window.requestAnimationFrame(function () {
        if (_state !== "opening") {
          return;
        }

        if (stack) {
          // Mark the stack so it won't animate the new notice.
          $$invalidate(45, stack._animation = false, stack);

          if (stack.push === "top") {
            // Reset the position data so the notice is positioned as the first
            // notice.
            stack._resetPositionData();
          } // Now position the stack's the notices.


          stack._positionNotice(self);

          stack.queuePosition(0); // Reset animation.

          $$invalidate(45, stack._animation = true, stack);
        }

        animateIn(afterOpenCallback, immediate);
      });
    } : _$$props$open;
    var _$$props$close = $$props.close,
        close = _$$props$close === void 0 ? function (immediate, timerHide, waitAfterward) {
      if (_state === "closing" || _state === "closed") {
        return;
      }

      var runDestroy = function runDestroy() {
        if (!dispatchLifecycleEvent("beforeDestroy")) {
          return;
        }

        if (stack) {
          stack._removeNotice(self);
        }

        self.$destroy();
        dispatchLifecycleEvent("afterDestroy");
      };

      if (_state === "waiting") {
        if (waitAfterward) {
          return;
        }

        $$invalidate(81, _state = "closed"); // It's debatable whether the notice should be destroyed in this case, but
        // I'm going to go ahead and say yes.

        if (destroy && !waitAfterward) {
          runDestroy();
        }

        return;
      }

      if (!dispatchLifecycleEvent("beforeClose", {
        immediate: immediate,
        timerHide: timerHide,
        waitAfterward: waitAfterward
      })) {
        return;
      }

      $$invalidate(81, _state = "closing");
      _timerHide = !!timerHide; // Make sure it's a boolean.

      if (_timer && _timer !== "prevented" && clearTimeout) {
        clearTimeout(_timer);
      }

      $$invalidate(82, _timer = null);
      animateOut(function () {
        $$invalidate(25, _interacting = false);
        _timerHide = false;
        $$invalidate(81, _state = waitAfterward ? "waiting" : "closed");
        dispatchLifecycleEvent("afterClose", {
          immediate: immediate,
          timerHide: timerHide,
          waitAfterward: waitAfterward
        });

        if (stack) {
          stack._handleNoticeClosed(self);
        }

        if (destroy && !waitAfterward) {
          // If we're supposed to destroy the notice, run the destroy module
          // events, remove from stack, and let Svelte handle DOM removal.
          runDestroy();
        } else if (remove && !waitAfterward) {
          // If we're supposed to remove the notice from the DOM, do it.
          removeFromDOM();
        }
      }, immediate);
    } : _$$props$close;
    var _$$props$animateIn = $$props.animateIn,
        animateIn = _$$props$animateIn === void 0 ? function (callback, immediate) {
      // Declare that the notice is animating in.
      _animating = "in";

      var finished = function finished(event) {
        if (event && refs.elem && event.target !== refs.elem) {
          return;
        }

        refs.elem && refs.elem.removeEventListener("transitionend", finished);

        if (_animInTimer) {
          clearTimeout(_animInTimer);
        }

        if (_animating !== "in") {
          return;
        }

        var visible = _moduleOpen;

        if (!visible && refs.elem) {
          var domRect = refs.elem.getBoundingClientRect();

          for (var prop in domRect) {
            if (domRect[prop] > 0) {
              visible = true;
              break;
            }
          }
        }

        if (visible) {
          if (callback) {
            callback.call();
          } // Declare that the notice has completed animating.


          _animating = false;
        } else {
          _animInTimer = setTimeout(finished, 40);
        }
      };

      if (animation === "fade" && !immediate) {
        refs.elem && refs.elem.addEventListener("transitionend", finished);
        $$invalidate(23, _animatingClass = "pnotify-in");
        tick().then(function () {
          $$invalidate(23, _animatingClass = "pnotify-in pnotify-fade-in"); // Just in case the event doesn't fire, call it after 650 ms.

          _animInTimer = setTimeout(finished, 650);
        });
      } else {
        $$invalidate(23, _animatingClass = "pnotify-in");
        tick().then(function () {
          finished();
        });
      }
    } : _$$props$animateIn;
    var _$$props$animateOut = $$props.animateOut,
        animateOut = _$$props$animateOut === void 0 ? function (callback, immediate) {
      // Declare that the notice is animating out.
      _animating = "out";

      var finished = function finished(event) {
        if (event && refs.elem && event.target !== refs.elem) {
          return;
        }

        refs.elem && refs.elem.removeEventListener("transitionend", finished);

        if (_animOutTimer) {
          clearTimeout(_animOutTimer);
        }

        if (_animating !== "out") {
          return;
        }

        var visible = _moduleOpen;

        if (!visible && refs.elem) {
          var domRect = refs.elem.getBoundingClientRect();

          for (var prop in domRect) {
            if (domRect[prop] > 0) {
              visible = true;
              break;
            }
          }
        }

        if (!refs.elem || !refs.elem.style.opacity || refs.elem.style.opacity === "0" || !visible) {
          $$invalidate(23, _animatingClass = "");

          if (callback) {
            callback.call();
          } // Declare that the notice has completed animating.


          _animating = false;
        } else {
          // In case this was called before the notice finished animating.
          _animOutTimer = setTimeout(finished, 40);
        }
      };

      if (animation === "fade" && !immediate) {
        refs.elem && refs.elem.addEventListener("transitionend", finished);
        $$invalidate(23, _animatingClass = "pnotify-in"); // Just in case the event doesn't fire, call it after 650 ms.

        _animOutTimer = setTimeout(finished, 650);
      } else {
        $$invalidate(23, _animatingClass = "");
        tick().then(function () {
          finished();
        });
      }
    } : _$$props$animateOut;

    function cancelClose() {
      if (_timer && _timer !== "prevented") {
        clearTimeout(_timer);
        $$invalidate(82, _timer = null);
      }

      if (_animOutTimer) {
        clearTimeout(_animOutTimer);
      }

      if (_state === "closing") {
        // If it's animating out, stop it.
        $$invalidate(81, _state = "open");
        _animating = false;
        $$invalidate(23, _animatingClass = animation === "fade" ? "pnotify-in pnotify-fade-in" : "pnotify-in");
      }
    }

    function queueClose() {
      if (_timer === "prevented") {
        return;
      } // Cancel any current close timer.


      cancelClose();

      if (delay !== Infinity) {
        $$invalidate(82, _timer = setTimeout(function () {
          return close(false, true);
        }, isNaN(delay) ? 0 : delay));
      }
    }

    function _preventTimerClose(prevent) {
      if (prevent) {
        cancelClose();
        $$invalidate(82, _timer = "prevented");
      } else if (_timer === "prevented") {
        $$invalidate(82, _timer = null);

        if (_state === "open" && hide) {
          queueClose();
        }
      }
    }

    function on() {
      return self.$on.apply(self, arguments);
    }

    function update() {
      return self.$set.apply(self, arguments);
    }

    function fire(name, detail) {
      dispatch(name, detail);
    }

    function addModuleClass(element) {
      for (var i = 0; i < (arguments.length <= 1 ? 0 : arguments.length - 1); i++) {
        var className = i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1];

        if (_moduleClasses[element].indexOf(className) === -1) {
          _moduleClasses[element].push(className);
        }
      }

      $$invalidate(26, _moduleClasses);
    }

    function removeModuleClass(element) {
      for (var i = 0; i < (arguments.length <= 1 ? 0 : arguments.length - 1); i++) {
        var className = i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1];

        var idx = _moduleClasses[element].indexOf(className);

        if (idx !== -1) {
          _moduleClasses[element].splice(idx, 1);
        }
      }

      $$invalidate(26, _moduleClasses);
    }

    function hasModuleClass(element) {
      for (var i = 0; i < (arguments.length <= 1 ? 0 : arguments.length - 1); i++) {
        var className = i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1];

        if (_moduleClasses[element].indexOf(className) === -1) {
          return false;
        }
      }

      return true;
    }

    function getModuleHandled() {
      return _moduleHandled;
    }

    function setModuleHandled(value) {
      return _moduleHandled = value;
    }

    function getModuleOpen() {
      return _moduleOpen;
    }

    function setModuleOpen(value) {
      return _moduleOpen = value;
    }

    function setAnimating(value) {
      return _animating = value;
    }

    function getAnimatingClass() {
      return _animatingClass;
    }

    function setAnimatingClass(value) {
      return $$invalidate(23, _animatingClass = value);
    }

    function _getMoveClass() {
      return _moveClass;
    }

    function _setMoveClass(value) {
      return $$invalidate(24, _moveClass = value);
    }

    function _setMasking(value, immediate, callback) {
      if (_maskingTimer) {
        clearTimeout(_maskingTimer);
      }

      if (_masking === value) {
        return;
      }

      if (value) {
        $$invalidate(27, _masking = true);
        $$invalidate(28, _maskingIn = !!immediate);
        insertIntoDOM();
        tick().then(function () {
          window.requestAnimationFrame(function () {
            if (_masking) {
              if (immediate && callback) {
                callback();
              } else {
                $$invalidate(28, _maskingIn = true);

                var finished = function finished() {
                  refs.elem && refs.elem.removeEventListener("transitionend", finished);

                  if (_maskingTimer) {
                    clearTimeout(_maskingTimer);
                  }

                  if (_maskingIn && callback) {
                    callback();
                  }
                };

                refs.elem && refs.elem.addEventListener("transitionend", finished);
                _maskingTimer = setTimeout(finished, 650);
              }
            }
          });
        });
      } else if (immediate) {
        $$invalidate(27, _masking = false);
        $$invalidate(28, _maskingIn = false);

        if (remove && ["open", "opening", "closing"].indexOf(_state) === -1) {
          removeFromDOM();
        }

        if (callback) {
          callback();
        }
      } else {
        var finished = function finished() {
          refs.elem && refs.elem.removeEventListener("transitionend", finished);

          if (_maskingTimer) {
            clearTimeout(_maskingTimer);
          }

          if (!_maskingIn) {
            $$invalidate(27, _masking = false);

            if (remove && ["open", "opening", "closing"].indexOf(_state) === -1) {
              removeFromDOM();
            }

            if (callback) {
              callback();
            }
          }
        };

        $$invalidate(28, _maskingIn = false);
        refs.elem && refs.elem.addEventListener("transitionend", finished);
        refs.elem && refs.elem.style.opacity; // This line is necessary for some reason. Some notices don't fade without it.
        // Just in case the event doesn't fire, call it after 650 ms.

        _maskingTimer = setTimeout(finished, 650);
      }
    }

    var click_handler = function click_handler() {
      return close(false);
    };

    var click_handler_1 = function click_handler_1() {
      return $$invalidate(1, hide = !hide);
    };

    function div_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](function () {
        refs.iconContainer = $$value;
        $$invalidate(0, refs);
      });
    }

    function div_binding_1($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](function () {
        refs.titleContainer = $$value;
        $$invalidate(0, refs);
      });
    }

    function div_binding_2($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](function () {
        refs.textContainer = $$value;
        $$invalidate(0, refs);
      });
    }

    function div0_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](function () {
        refs.content = $$value;
        $$invalidate(0, refs);
      });
    }

    function div1_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](function () {
        refs.container = $$value;
        $$invalidate(0, refs);
      });
    }

    function div2_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](function () {
        refs.elem = $$value;
        $$invalidate(0, refs);
      });
    }

    $$self.$set = function ($$props) {
      if ("modules" in $$props) $$invalidate(46, modules = $$props.modules);
      if ("stack" in $$props) $$invalidate(45, stack = $$props.stack);
      if ("type" in $$props) $$invalidate(2, type = $$props.type);
      if ("title" in $$props) $$invalidate(3, title = $$props.title);
      if ("titleTrusted" in $$props) $$invalidate(4, titleTrusted = $$props.titleTrusted);
      if ("text" in $$props) $$invalidate(5, text = $$props.text);
      if ("textTrusted" in $$props) $$invalidate(6, textTrusted = $$props.textTrusted);
      if ("styling" in $$props) $$invalidate(47, styling = $$props.styling);
      if ("icons" in $$props) $$invalidate(48, icons = $$props.icons);
      if ("mode" in $$props) $$invalidate(7, mode = $$props.mode);
      if ("addClass" in $$props) $$invalidate(8, addClass = $$props.addClass);
      if ("addModalClass" in $$props) $$invalidate(9, addModalClass = $$props.addModalClass);
      if ("addModelessClass" in $$props) $$invalidate(10, addModelessClass = $$props.addModelessClass);
      if ("autoOpen" in $$props) $$invalidate(49, autoOpen = $$props.autoOpen);
      if ("width" in $$props) $$invalidate(50, width = $$props.width);
      if ("minHeight" in $$props) $$invalidate(51, minHeight = $$props.minHeight);
      if ("maxTextHeight" in $$props) $$invalidate(52, maxTextHeight = $$props.maxTextHeight);
      if ("icon" in $$props) $$invalidate(11, icon = $$props.icon);
      if ("animation" in $$props) $$invalidate(12, animation = $$props.animation);
      if ("animateSpeed" in $$props) $$invalidate(13, animateSpeed = $$props.animateSpeed);
      if ("shadow" in $$props) $$invalidate(14, shadow = $$props.shadow);
      if ("hide" in $$props) $$invalidate(1, hide = $$props.hide);
      if ("delay" in $$props) $$invalidate(53, delay = $$props.delay);
      if ("mouseReset" in $$props) $$invalidate(54, mouseReset = $$props.mouseReset);
      if ("closer" in $$props) $$invalidate(15, closer = $$props.closer);
      if ("closerHover" in $$props) $$invalidate(16, closerHover = $$props.closerHover);
      if ("sticker" in $$props) $$invalidate(17, sticker = $$props.sticker);
      if ("stickerHover" in $$props) $$invalidate(18, stickerHover = $$props.stickerHover);
      if ("labels" in $$props) $$invalidate(19, labels = $$props.labels);
      if ("remove" in $$props) $$invalidate(55, remove = $$props.remove);
      if ("destroy" in $$props) $$invalidate(56, destroy = $$props.destroy);
      if ("open" in $$props) $$invalidate(59, open = $$props.open);
      if ("close" in $$props) $$invalidate(22, close = $$props.close);
      if ("animateIn" in $$props) $$invalidate(60, animateIn = $$props.animateIn);
      if ("animateOut" in $$props) $$invalidate(61, animateOut = $$props.animateOut);
    };

    var _widthStyle;

    var _minHeightStyle;

    var _maxTextHeightStyle;

    var _titleElement;

    var _textElement;

    var _modal;

    var _nonBlock;

    var _stackDirClass;

    var modulesPrependContainer;
    var modulesPrependContent;
    var modulesAppendContent;
    var modulesAppendContainer;

    $$self.$$.update = function () {
      if ($$self.$$.dirty[1] &
      /*width*/
      524288) {
        // Grab the icons from the icons object or use provided icons
         $$invalidate(29, _widthStyle = typeof width === "string" ? "width: ".concat(width, ";") : "");
      }

      if ($$self.$$.dirty[1] &
      /*minHeight*/
      1048576) {
         $$invalidate(30, _minHeightStyle = typeof minHeight === "string" ? "min-height: ".concat(minHeight, ";") : "");
      }

      if ($$self.$$.dirty[1] &
      /*maxTextHeight*/
      2097152) {
        // The bottom padding of .03em is specifically for Firefox, since it will show a scrollbar without it for some reason.
         $$invalidate(31, _maxTextHeightStyle = typeof maxTextHeight === "string" ? "max-height: ".concat(maxTextHeight, "; overflow-y: auto; overscroll-behavior: contain; padding-bottom:.03em;") : "");
      }

      if ($$self.$$.dirty[0] &
      /*title*/
      8) {
         $$invalidate(32, _titleElement = title instanceof HTMLElement);
      }

      if ($$self.$$.dirty[0] &
      /*text*/
      32) {
         $$invalidate(33, _textElement = text instanceof HTMLElement);
      }

      if ($$self.$$.dirty[1] &
      /*stack*/
      16384 | $$self.$$.dirty[2] &
      /*_timer, _state*/
      1572864) {
        // Whether the notification is open in a modal stack (or a modalish stack in
        // modal state).
         $$invalidate(34, _modal = stack && (stack.modal === true || stack.modal === "ish" && _timer === "prevented") && ["open", "opening", "closing"].indexOf(_state) !== -1);
      }

      if ($$self.$$.dirty[0] &
      /*addClass, addModalClass, addModelessClass*/
      1792 | $$self.$$.dirty[1] &
      /*_modal*/
      8) {
         $$invalidate(35, _nonBlock = addClass.match(/\bnonblock\b/) || addModalClass.match(/\bnonblock\b/) && _modal || addModelessClass.match(/\bnonblock\b/) && !_modal);
      }

      if ($$self.$$.dirty[1] &
      /*stack*/
      16384) {
        // This is for specific styling for how notices stack.
         $$invalidate(36, _stackDirClass = stack && stack.dir1 ? "pnotify-stack-".concat(stack.dir1) : "");
      }

      if ($$self.$$.dirty[1] &
      /*modules*/
      32768) {
        // Filter through the module objects, getting an array for each position.
         $$invalidate(37, modulesPrependContainer = Array.from(modules).filter(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              module = _ref4[0],
              options = _ref4[1];

          return module.position === "PrependContainer";
        }));
      }

      if ($$self.$$.dirty[1] &
      /*modules*/
      32768) {
         $$invalidate(38, modulesPrependContent = Array.from(modules).filter(function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 2),
              module = _ref6[0],
              options = _ref6[1];

          return module.position === "PrependContent";
        }));
      }

      if ($$self.$$.dirty[1] &
      /*modules*/
      32768) {
         $$invalidate(39, modulesAppendContent = Array.from(modules).filter(function (_ref7) {
          var _ref8 = _slicedToArray(_ref7, 2),
              module = _ref8[0],
              options = _ref8[1];

          return module.position === "AppendContent";
        }));
      }

      if ($$self.$$.dirty[1] &
      /*modules*/
      32768) {
         $$invalidate(40, modulesAppendContainer = Array.from(modules).filter(function (_ref9) {
          var _ref10 = _slicedToArray(_ref9, 2),
              module = _ref10[0],
              options = _ref10[1];

          return module.position === "AppendContainer";
        }));
      }

      if ($$self.$$.dirty[0] &
      /*refs, title*/
      9 | $$self.$$.dirty[1] &
      /*_titleElement*/
      2) {
         if (_titleElement && refs.titleContainer) {
          refs.titleContainer.appendChild(title);
        }
      }

      if ($$self.$$.dirty[0] &
      /*refs, text*/
      33 | $$self.$$.dirty[1] &
      /*_textElement*/
      4) {
         if (_textElement && refs.textContainer) {
          refs.textContainer.appendChild(text);
        }
      }

      if ($$self.$$.dirty[1] &
      /*stack*/
      16384 | $$self.$$.dirty[2] &
      /*_oldStack*/
      536870912) {
         if (_oldStack !== stack) {
          if (_oldStack) {
            // Remove the notice from the old stack.
            _oldStack._removeNotice(self);
          }

          if (stack) {
            // Add the notice to the stack.
            stack._addNotice(self);
          }

          $$invalidate(91, _oldStack = stack);
        }
      }

      if ($$self.$$.dirty[1] &
      /*_modal*/
      8 | $$self.$$.dirty[2] &
      /*_oldModal*/
      1073741824) {
         if (_oldModal !== _modal) {
          dispatchLifecycleEvent(_modal ? "enterModal" : "leaveModal");
          $$invalidate(92, _oldModal = _modal);
        }
      }
    };

    return [refs, hide, type, title, titleTrusted, text, textTrusted, mode, addClass, addModalClass, addModelessClass, icon, animation, animateSpeed, shadow, closer, closerHover, sticker, stickerHover, labels, getStyle, getIcon, close, _animatingClass, _moveClass, _interacting, _moduleClasses, _masking, _maskingIn, _widthStyle, _minHeightStyle, _maxTextHeightStyle, _titleElement, _textElement, _modal, _nonBlock, _stackDirClass, modulesPrependContainer, modulesPrependContent, modulesAppendContent, modulesAppendContainer, self, forwardEvents, handleInteraction, handleLeaveInteraction, stack, modules, styling, icons, autoOpen, width, minHeight, maxTextHeight, delay, mouseReset, remove, destroy, getState, getTimer, open, animateIn, animateOut, cancelClose, queueClose, _preventTimerClose, on, update, fire, addModuleClass, removeModuleClass, hasModuleClass, getModuleHandled, setModuleHandled, getModuleOpen, setModuleOpen, setAnimating, getAnimatingClass, setAnimatingClass, _getMoveClass, _setMoveClass, _setMasking, _state, _timer, _animInTimer, _animOutTimer, _animating, _timerHide, _moduleHandled, _moduleOpen, _maskingTimer, _oldHide, _oldStack, _oldModal, dispatch, selfDefaults, dispatchLifecycleEvent, insertIntoDOM, removeFromDOM, click_handler, click_handler_1, div_binding, div_binding_1, div_binding_2, div0_binding, div1_binding, div2_binding];
  }

  var Core = /*#__PURE__*/function (_SvelteComponent) {
    _inherits(Core, _SvelteComponent);

    var _super = _createSuper(Core);

    function Core(options) {
      var _this;

      _classCallCheck(this, Core);

      _this = _super.call(this);
      init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
        modules: 46,
        stack: 45,
        refs: 0,
        type: 2,
        title: 3,
        titleTrusted: 4,
        text: 5,
        textTrusted: 6,
        styling: 47,
        icons: 48,
        mode: 7,
        addClass: 8,
        addModalClass: 9,
        addModelessClass: 10,
        autoOpen: 49,
        width: 50,
        minHeight: 51,
        maxTextHeight: 52,
        icon: 11,
        animation: 12,
        animateSpeed: 13,
        shadow: 14,
        hide: 1,
        delay: 53,
        mouseReset: 54,
        closer: 15,
        closerHover: 16,
        sticker: 17,
        stickerHover: 18,
        labels: 19,
        remove: 55,
        destroy: 56,
        getState: 57,
        getTimer: 58,
        getStyle: 20,
        getIcon: 21,
        open: 59,
        close: 22,
        animateIn: 60,
        animateOut: 61,
        cancelClose: 62,
        queueClose: 63,
        _preventTimerClose: 64,
        on: 65,
        update: 66,
        fire: 67,
        addModuleClass: 68,
        removeModuleClass: 69,
        hasModuleClass: 70,
        getModuleHandled: 71,
        setModuleHandled: 72,
        getModuleOpen: 73,
        setModuleOpen: 74,
        setAnimating: 75,
        getAnimatingClass: 76,
        setAnimatingClass: 77,
        _getMoveClass: 78,
        _setMoveClass: 79,
        _setMasking: 80
      }, [-1, -1, -1, -1]);
      return _this;
    }

    _createClass(Core, [{
      key: "modules",
      get: function get() {
        return this.$$.ctx[46];
      },
      set: function set(modules) {
        this.$set({
          modules: modules
        });
        flush();
      }
    }, {
      key: "stack",
      get: function get() {
        return this.$$.ctx[45];
      },
      set: function set(stack) {
        this.$set({
          stack: stack
        });
        flush();
      }
    }, {
      key: "refs",
      get: function get() {
        return this.$$.ctx[0];
      }
    }, {
      key: "type",
      get: function get() {
        return this.$$.ctx[2];
      },
      set: function set(type) {
        this.$set({
          type: type
        });
        flush();
      }
    }, {
      key: "title",
      get: function get() {
        return this.$$.ctx[3];
      },
      set: function set(title) {
        this.$set({
          title: title
        });
        flush();
      }
    }, {
      key: "titleTrusted",
      get: function get() {
        return this.$$.ctx[4];
      },
      set: function set(titleTrusted) {
        this.$set({
          titleTrusted: titleTrusted
        });
        flush();
      }
    }, {
      key: "text",
      get: function get() {
        return this.$$.ctx[5];
      },
      set: function set(text) {
        this.$set({
          text: text
        });
        flush();
      }
    }, {
      key: "textTrusted",
      get: function get() {
        return this.$$.ctx[6];
      },
      set: function set(textTrusted) {
        this.$set({
          textTrusted: textTrusted
        });
        flush();
      }
    }, {
      key: "styling",
      get: function get() {
        return this.$$.ctx[47];
      },
      set: function set(styling) {
        this.$set({
          styling: styling
        });
        flush();
      }
    }, {
      key: "icons",
      get: function get() {
        return this.$$.ctx[48];
      },
      set: function set(icons) {
        this.$set({
          icons: icons
        });
        flush();
      }
    }, {
      key: "mode",
      get: function get() {
        return this.$$.ctx[7];
      },
      set: function set(mode) {
        this.$set({
          mode: mode
        });
        flush();
      }
    }, {
      key: "addClass",
      get: function get() {
        return this.$$.ctx[8];
      },
      set: function set(addClass) {
        this.$set({
          addClass: addClass
        });
        flush();
      }
    }, {
      key: "addModalClass",
      get: function get() {
        return this.$$.ctx[9];
      },
      set: function set(addModalClass) {
        this.$set({
          addModalClass: addModalClass
        });
        flush();
      }
    }, {
      key: "addModelessClass",
      get: function get() {
        return this.$$.ctx[10];
      },
      set: function set(addModelessClass) {
        this.$set({
          addModelessClass: addModelessClass
        });
        flush();
      }
    }, {
      key: "autoOpen",
      get: function get() {
        return this.$$.ctx[49];
      },
      set: function set(autoOpen) {
        this.$set({
          autoOpen: autoOpen
        });
        flush();
      }
    }, {
      key: "width",
      get: function get() {
        return this.$$.ctx[50];
      },
      set: function set(width) {
        this.$set({
          width: width
        });
        flush();
      }
    }, {
      key: "minHeight",
      get: function get() {
        return this.$$.ctx[51];
      },
      set: function set(minHeight) {
        this.$set({
          minHeight: minHeight
        });
        flush();
      }
    }, {
      key: "maxTextHeight",
      get: function get() {
        return this.$$.ctx[52];
      },
      set: function set(maxTextHeight) {
        this.$set({
          maxTextHeight: maxTextHeight
        });
        flush();
      }
    }, {
      key: "icon",
      get: function get() {
        return this.$$.ctx[11];
      },
      set: function set(icon) {
        this.$set({
          icon: icon
        });
        flush();
      }
    }, {
      key: "animation",
      get: function get() {
        return this.$$.ctx[12];
      },
      set: function set(animation) {
        this.$set({
          animation: animation
        });
        flush();
      }
    }, {
      key: "animateSpeed",
      get: function get() {
        return this.$$.ctx[13];
      },
      set: function set(animateSpeed) {
        this.$set({
          animateSpeed: animateSpeed
        });
        flush();
      }
    }, {
      key: "shadow",
      get: function get() {
        return this.$$.ctx[14];
      },
      set: function set(shadow) {
        this.$set({
          shadow: shadow
        });
        flush();
      }
    }, {
      key: "hide",
      get: function get() {
        return this.$$.ctx[1];
      },
      set: function set(hide) {
        this.$set({
          hide: hide
        });
        flush();
      }
    }, {
      key: "delay",
      get: function get() {
        return this.$$.ctx[53];
      },
      set: function set(delay) {
        this.$set({
          delay: delay
        });
        flush();
      }
    }, {
      key: "mouseReset",
      get: function get() {
        return this.$$.ctx[54];
      },
      set: function set(mouseReset) {
        this.$set({
          mouseReset: mouseReset
        });
        flush();
      }
    }, {
      key: "closer",
      get: function get() {
        return this.$$.ctx[15];
      },
      set: function set(closer) {
        this.$set({
          closer: closer
        });
        flush();
      }
    }, {
      key: "closerHover",
      get: function get() {
        return this.$$.ctx[16];
      },
      set: function set(closerHover) {
        this.$set({
          closerHover: closerHover
        });
        flush();
      }
    }, {
      key: "sticker",
      get: function get() {
        return this.$$.ctx[17];
      },
      set: function set(sticker) {
        this.$set({
          sticker: sticker
        });
        flush();
      }
    }, {
      key: "stickerHover",
      get: function get() {
        return this.$$.ctx[18];
      },
      set: function set(stickerHover) {
        this.$set({
          stickerHover: stickerHover
        });
        flush();
      }
    }, {
      key: "labels",
      get: function get() {
        return this.$$.ctx[19];
      },
      set: function set(labels) {
        this.$set({
          labels: labels
        });
        flush();
      }
    }, {
      key: "remove",
      get: function get() {
        return this.$$.ctx[55];
      },
      set: function set(remove) {
        this.$set({
          remove: remove
        });
        flush();
      }
    }, {
      key: "destroy",
      get: function get() {
        return this.$$.ctx[56];
      },
      set: function set(destroy) {
        this.$set({
          destroy: destroy
        });
        flush();
      }
    }, {
      key: "getState",
      get: function get() {
        return this.$$.ctx[57];
      }
    }, {
      key: "getTimer",
      get: function get() {
        return this.$$.ctx[58];
      }
    }, {
      key: "getStyle",
      get: function get() {
        return this.$$.ctx[20];
      }
    }, {
      key: "getIcon",
      get: function get() {
        return this.$$.ctx[21];
      }
    }, {
      key: "open",
      get: function get() {
        return this.$$.ctx[59];
      },
      set: function set(open) {
        this.$set({
          open: open
        });
        flush();
      }
    }, {
      key: "close",
      get: function get() {
        return this.$$.ctx[22];
      },
      set: function set(close) {
        this.$set({
          close: close
        });
        flush();
      }
    }, {
      key: "animateIn",
      get: function get() {
        return this.$$.ctx[60];
      },
      set: function set(animateIn) {
        this.$set({
          animateIn: animateIn
        });
        flush();
      }
    }, {
      key: "animateOut",
      get: function get() {
        return this.$$.ctx[61];
      },
      set: function set(animateOut) {
        this.$set({
          animateOut: animateOut
        });
        flush();
      }
    }, {
      key: "cancelClose",
      get: function get() {
        return this.$$.ctx[62];
      }
    }, {
      key: "queueClose",
      get: function get() {
        return this.$$.ctx[63];
      }
    }, {
      key: "_preventTimerClose",
      get: function get() {
        return this.$$.ctx[64];
      }
    }, {
      key: "on",
      get: function get() {
        return this.$$.ctx[65];
      }
    }, {
      key: "update",
      get: function get() {
        return this.$$.ctx[66];
      }
    }, {
      key: "fire",
      get: function get() {
        return this.$$.ctx[67];
      }
    }, {
      key: "addModuleClass",
      get: function get() {
        return this.$$.ctx[68];
      }
    }, {
      key: "removeModuleClass",
      get: function get() {
        return this.$$.ctx[69];
      }
    }, {
      key: "hasModuleClass",
      get: function get() {
        return this.$$.ctx[70];
      }
    }, {
      key: "getModuleHandled",
      get: function get() {
        return this.$$.ctx[71];
      }
    }, {
      key: "setModuleHandled",
      get: function get() {
        return this.$$.ctx[72];
      }
    }, {
      key: "getModuleOpen",
      get: function get() {
        return this.$$.ctx[73];
      }
    }, {
      key: "setModuleOpen",
      get: function get() {
        return this.$$.ctx[74];
      }
    }, {
      key: "setAnimating",
      get: function get() {
        return this.$$.ctx[75];
      }
    }, {
      key: "getAnimatingClass",
      get: function get() {
        return this.$$.ctx[76];
      }
    }, {
      key: "setAnimatingClass",
      get: function get() {
        return this.$$.ctx[77];
      }
    }, {
      key: "_getMoveClass",
      get: function get() {
        return this.$$.ctx[78];
      }
    }, {
      key: "_setMoveClass",
      get: function get() {
        return this.$$.ctx[79];
      }
    }, {
      key: "_setMasking",
      get: function get() {
        return this.$$.ctx[80];
      }
    }]);

    return Core;
  }(SvelteComponent);

  exports.Stack = Stack;
  exports.alert = alert;
  exports.default = Core;
  exports.defaultModules = defaultModules;
  exports.defaultStack = defaultStack;
  exports.defaults = defaults;
  exports.error = error;
  exports.info = info;
  exports.notice = notice;
  exports.success = success;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
