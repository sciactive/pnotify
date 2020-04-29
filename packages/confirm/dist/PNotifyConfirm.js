(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.PNotifyConfirm = {}));
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

  function append(target, node) {
    target.appendChild(node);
  }

  function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
  }

  function detach(node) {
    node.parentNode.removeChild(node);
  }

  function destroy_each(iterations, detaching) {
    for (var i = 0; i < iterations.length; i += 1) {
      if (iterations[i]) iterations[i].d(detaching);
    }
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

  function set_input_value(input, value) {
    if (value != null || input.value) {
      input.value = value;
    }
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

  function get_each_context(ctx, list, i) {
    var child_ctx = ctx.slice();
    child_ctx[21] = list[i];
    return child_ctx;
  } // (107:0) {#if confirm || prompt}


  function create_if_block(ctx) {
    var div1;
    var t;
    var div0;
    var div0_class_value;
    var div0_style_value;
    var div1_class_value;
    var if_block =
    /*prompt*/
    ctx[3] && create_if_block_2(ctx);
    var each_value =
    /*buttons*/
    ctx[7];
    var each_blocks = [];

    for (var i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    }

    return {
      c: function c() {
        div1 = element("div");
        if (if_block) if_block.c();
        t = space();
        div0 = element("div");

        for (var _i = 0; _i < each_blocks.length; _i += 1) {
          each_blocks[_i].c();
        }

        attr(div0, "class", div0_class_value = "pnotify-action-bar ".concat(
        /*self*/
        ctx[1].getStyle("action-bar")));
        attr(div0, "style", div0_style_value = "justify-content: ".concat(
        /*align*/
        ctx[6], ";"));
        attr(div1, "class", div1_class_value = "pnotify-confirm ".concat(
        /*self*/
        ctx[1].getStyle("text"), " ").concat(
        /*self*/
        ctx[1].getStyle("confirm")));
      },
      m: function m(target, anchor) {
        insert(target, div1, anchor);
        if (if_block) if_block.m(div1, null);
        append(div1, t);
        append(div1, div0);

        for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
          each_blocks[_i2].m(div0, null);
        }
        /*div0_binding*/


        ctx[20](div0);
      },
      p: function p(ctx, dirty) {
        if (
        /*prompt*/
        ctx[3]) {
          if (if_block) {
            if_block.p(ctx, dirty);
          } else {
            if_block = create_if_block_2(ctx);
            if_block.c();
            if_block.m(div1, t);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }

        if (dirty &
        /*self, buttons, handleClick*/
        2178) {
          each_value =
          /*buttons*/
          ctx[7];

          var _i3;

          for (_i3 = 0; _i3 < each_value.length; _i3 += 1) {
            var child_ctx = get_each_context(ctx, each_value, _i3);

            if (each_blocks[_i3]) {
              each_blocks[_i3].p(child_ctx, dirty);
            } else {
              each_blocks[_i3] = create_each_block(child_ctx);

              each_blocks[_i3].c();

              each_blocks[_i3].m(div0, null);
            }
          }

          for (; _i3 < each_blocks.length; _i3 += 1) {
            each_blocks[_i3].d(1);
          }

          each_blocks.length = each_value.length;
        }

        if (dirty &
        /*self*/
        2 && div0_class_value !== (div0_class_value = "pnotify-action-bar ".concat(
        /*self*/
        ctx[1].getStyle("action-bar")))) {
          attr(div0, "class", div0_class_value);
        }

        if (dirty &
        /*align*/
        64 && div0_style_value !== (div0_style_value = "justify-content: ".concat(
        /*align*/
        ctx[6], ";"))) {
          attr(div0, "style", div0_style_value);
        }

        if (dirty &
        /*self*/
        2 && div1_class_value !== (div1_class_value = "pnotify-confirm ".concat(
        /*self*/
        ctx[1].getStyle("text"), " ").concat(
        /*self*/
        ctx[1].getStyle("confirm")))) {
          attr(div1, "class", div1_class_value);
        }
      },
      d: function d(detaching) {
        if (detaching) detach(div1);
        if (if_block) if_block.d();
        destroy_each(each_blocks, detaching);
        /*div0_binding*/

        ctx[20](null);
      }
    };
  } // (111:4) {#if prompt}


  function create_if_block_2(ctx) {
    var div;
    var div_class_value;

    function select_block_type(ctx, dirty) {
      if (
      /*promptMultiLine*/
      ctx[5]) return create_if_block_3;
      return create_else_block_1;
    }

    var current_block_type = select_block_type(ctx);
    var if_block = current_block_type(ctx);
    return {
      c: function c() {
        div = element("div");
        if_block.c();
        attr(div, "class", div_class_value = "pnotify-prompt-bar ".concat(
        /*self*/
        ctx[1].getStyle("prompt-bar")));
      },
      m: function m(target, anchor) {
        insert(target, div, anchor);
        if_block.m(div, null);
      },
      p: function p(ctx, dirty) {
        if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block.d(1);
          if_block = current_block_type(ctx);

          if (if_block) {
            if_block.c();
            if_block.m(div, null);
          }
        }

        if (dirty &
        /*self*/
        2 && div_class_value !== (div_class_value = "pnotify-prompt-bar ".concat(
        /*self*/
        ctx[1].getStyle("prompt-bar")))) {
          attr(div, "class", div_class_value);
        }
      },
      d: function d(detaching) {
        if (detaching) detach(div);
        if_block.d();
      }
    };
  } // (121:8) {:else}


  function create_else_block_1(ctx) {
    var input;
    var input_class_value;
    var dispose;
    return {
      c: function c() {
        input = element("input");
        attr(input, "type", "text");
        attr(input, "class", input_class_value = "pnotify-prompt-input ".concat(
        /*self*/
        ctx[1].getStyle("input"), " ").concat(
        /*promptClass*/
        ctx[4]));
      },
      m: function m(target, anchor, remount) {
        insert(target, input, anchor);
        /*input_binding*/

        ctx[17](input);
        set_input_value(input,
        /*promptValue*/
        ctx[0]);
        if (remount) run_all(dispose);
        dispose = [listen(input, "keypress",
        /*handleKeyPress*/
        ctx[12]), listen(input, "input",
        /*input_input_handler*/
        ctx[18])];
      },
      p: function p(ctx, dirty) {
        if (dirty &
        /*self, promptClass*/
        18 && input_class_value !== (input_class_value = "pnotify-prompt-input ".concat(
        /*self*/
        ctx[1].getStyle("input"), " ").concat(
        /*promptClass*/
        ctx[4]))) {
          attr(input, "class", input_class_value);
        }

        if (dirty &
        /*promptValue*/
        1 && input.value !==
        /*promptValue*/
        ctx[0]) {
          set_input_value(input,
          /*promptValue*/
          ctx[0]);
        }
      },
      d: function d(detaching) {
        if (detaching) detach(input);
        /*input_binding*/

        ctx[17](null);
        run_all(dispose);
      }
    };
  } // (113:8) {#if promptMultiLine}


  function create_if_block_3(ctx) {
    var textarea;
    var textarea_class_value;
    var dispose;
    return {
      c: function c() {
        textarea = element("textarea");
        attr(textarea, "rows", "5");
        attr(textarea, "class", textarea_class_value = "pnotify-prompt-input ".concat(
        /*self*/
        ctx[1].getStyle("input"), " ").concat(
        /*promptClass*/
        ctx[4]));
      },
      m: function m(target, anchor, remount) {
        insert(target, textarea, anchor);
        /*textarea_binding*/

        ctx[15](textarea);
        set_input_value(textarea,
        /*promptValue*/
        ctx[0]);
        if (remount) run_all(dispose);
        dispose = [listen(textarea, "keypress",
        /*handleKeyPress*/
        ctx[12]), listen(textarea, "input",
        /*textarea_input_handler*/
        ctx[16])];
      },
      p: function p(ctx, dirty) {
        if (dirty &
        /*self, promptClass*/
        18 && textarea_class_value !== (textarea_class_value = "pnotify-prompt-input ".concat(
        /*self*/
        ctx[1].getStyle("input"), " ").concat(
        /*promptClass*/
        ctx[4]))) {
          attr(textarea, "class", textarea_class_value);
        }

        if (dirty &
        /*promptValue*/
        1) {
          set_input_value(textarea,
          /*promptValue*/
          ctx[0]);
        }
      },
      d: function d(detaching) {
        if (detaching) detach(textarea);
        /*textarea_binding*/

        ctx[15](null);
        run_all(dispose);
      }
    };
  } // (145:10) {:else}


  function create_else_block(ctx) {
    var t_value =
    /*button*/
    ctx[21].text + "";
    var t;
    return {
      c: function c() {
        t = text(t_value);
      },
      m: function m(target, anchor) {
        insert(target, t, anchor);
      },
      p: function p(ctx, dirty) {
        if (dirty &
        /*buttons*/
        128 && t_value !== (t_value =
        /*button*/
        ctx[21].text + "")) set_data(t, t_value);
      },
      d: function d(detaching) {
        if (detaching) detach(t);
      }
    };
  } // (143:10) {#if button.textTrusted}


  function create_if_block_1(ctx) {
    var html_tag;
    var raw_value =
    /*button*/
    ctx[21].text + "";
    return {
      c: function c() {
        html_tag = new HtmlTag(raw_value, null);
      },
      m: function m(target, anchor) {
        html_tag.m(target, anchor);
      },
      p: function p(ctx, dirty) {
        if (dirty &
        /*buttons*/
        128 && raw_value !== (raw_value =
        /*button*/
        ctx[21].text + "")) html_tag.p(raw_value);
      },
      d: function d(detaching) {
        if (detaching) html_tag.d();
      }
    };
  } // (137:6) {#each buttons as button}


  function create_each_block(ctx) {
    var button;
    var t;
    var button_class_value;
    var dispose;

    function select_block_type_1(ctx, dirty) {
      if (
      /*button*/
      ctx[21].textTrusted) return create_if_block_1;
      return create_else_block;
    }

    var current_block_type = select_block_type_1(ctx);
    var if_block = current_block_type(ctx);

    function click_handler() {
      var _ctx;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (
        /*click_handler*/
        (_ctx = ctx)[19].apply(_ctx, [
        /*button*/
        ctx[21]].concat(args))
      );
    }

    return {
      c: function c() {
        button = element("button");
        if_block.c();
        t = space();
        attr(button, "type", "button");
        attr(button, "class", button_class_value = "pnotify-action-button ".concat(
        /*self*/
        ctx[1].getStyle("btn"), " ").concat(
        /*button*/
        ctx[21].primary ?
        /*self*/
        ctx[1].getStyle("btn-primary") :
        /*self*/
        ctx[1].getStyle("btn-secondary"), " ").concat(
        /*button*/
        ctx[21].addClass ?
        /*button*/
        ctx[21].addClass : ""));
      },
      m: function m(target, anchor, remount) {
        insert(target, button, anchor);
        if_block.m(button, null);
        append(button, t);
        if (remount) dispose();
        dispose = listen(button, "click", click_handler);
      },
      p: function p(new_ctx, dirty) {
        ctx = new_ctx;

        if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block.d(1);
          if_block = current_block_type(ctx);

          if (if_block) {
            if_block.c();
            if_block.m(button, t);
          }
        }

        if (dirty &
        /*self, buttons*/
        130 && button_class_value !== (button_class_value = "pnotify-action-button ".concat(
        /*self*/
        ctx[1].getStyle("btn"), " ").concat(
        /*button*/
        ctx[21].primary ?
        /*self*/
        ctx[1].getStyle("btn-primary") :
        /*self*/
        ctx[1].getStyle("btn-secondary"), " ").concat(
        /*button*/
        ctx[21].addClass ?
        /*button*/
        ctx[21].addClass : ""))) {
          attr(button, "class", button_class_value);
        }
      },
      d: function d(detaching) {
        if (detaching) detach(button);
        if_block.d();
        dispose();
      }
    };
  }

  function create_fragment(ctx) {
    var if_block_anchor;
    var if_block = (
    /*confirm*/
    ctx[2] ||
    /*prompt*/
    ctx[3]) && create_if_block(ctx);
    return {
      c: function c() {
        if (if_block) if_block.c();
        if_block_anchor = empty();
      },
      m: function m(target, anchor) {
        if (if_block) if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
      },
      p: function p(ctx, _ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            dirty = _ref2[0];

        if (
        /*confirm*/
        ctx[2] ||
        /*prompt*/
        ctx[3]) {
          if (if_block) {
            if_block.p(ctx, dirty);
          } else {
            if_block = create_if_block(ctx);
            if_block.c();
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
      },
      i: noop,
      o: noop,
      d: function d(detaching) {
        if (if_block) if_block.d(detaching);
        if (detaching) detach(if_block_anchor);
      }
    };
  }

  var position = "AppendContent";
  var defaults = {
    confirm: false,
    prompt: false,
    promptClass: "",
    promptValue: "",
    promptMultiLine: false,
    focus: null,
    align: "flex-end",
    buttons: [{
      text: "Ok",
      primary: true,
      promptTrigger: true,
      click: function click(notice, value) {
        notice.close();
        notice.fire("pnotify:confirm", {
          notice: notice,
          value: value
        });
      }
    }, {
      text: "Cancel",
      click: function click(notice) {
        notice.close();
        notice.fire("pnotify:cancel", {
          notice: notice
        });
      }
    }]
  };

  function instance($$self, $$props, $$invalidate) {
    var _$$props$self = $$props.self,
        self = _$$props$self === void 0 ? null : _$$props$self;
    var _$$props$confirm = $$props.confirm,
        confirm = _$$props$confirm === void 0 ? defaults.confirm : _$$props$confirm;
    var _$$props$prompt = $$props.prompt,
        prompt = _$$props$prompt === void 0 ? defaults.prompt : _$$props$prompt;
    var _$$props$promptClass = $$props.promptClass,
        promptClass = _$$props$promptClass === void 0 ? defaults.promptClass : _$$props$promptClass;
    var _$$props$promptValue = $$props.promptValue,
        promptValue = _$$props$promptValue === void 0 ? defaults.promptValue : _$$props$promptValue;
    var _$$props$promptMultiL = $$props.promptMultiLine,
        promptMultiLine = _$$props$promptMultiL === void 0 ? defaults.promptMultiLine : _$$props$promptMultiL;
    var _$$props$focus = $$props.focus,
        focus = _$$props$focus === void 0 ? defaults.focus : _$$props$focus;
    var _$$props$align = $$props.align,
        align = _$$props$align === void 0 ? defaults.align : _$$props$align;
    var _$$props$buttons = $$props.buttons,
        buttons = _$$props$buttons === void 0 ? defaults.buttons : _$$props$buttons;
    var promptMultiElem;
    var promptSingleElem;
    var buttonsElem;
    var focusNextChange = false;
    self.on("pnotify:afterOpen", function () {
      $$invalidate(14, focusNextChange = true);
    });

    function handleClick(button, event) {
      if (button.click) {
        button.click(self, prompt ? promptValue : null, event);
      }
    }

    function handleKeyPress(event) {
      if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault();

        var _this$get = this.get(),
            _buttons = _this$get.buttons;

        for (var i = 0; i < _buttons.length; i++) {
          if (_buttons[i].promptTrigger && _buttons[i].click) {
            _buttons[i].click(self, prompt ? promptValue : null, event);
          }
        }
      }
    }

    function textarea_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](function () {
        $$invalidate(8, promptMultiElem = $$value);
      });
    }

    function textarea_input_handler() {
      promptValue = this.value;
      $$invalidate(0, promptValue);
    }

    function input_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](function () {
        $$invalidate(9, promptSingleElem = $$value);
      });
    }

    function input_input_handler() {
      promptValue = this.value;
      $$invalidate(0, promptValue);
    }

    var click_handler = function click_handler(button, event) {
      return handleClick(button, event);
    };

    function div0_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](function () {
        $$invalidate(10, buttonsElem = $$value);
      });
    }

    $$self.$set = function ($$props) {
      if ("self" in $$props) $$invalidate(1, self = $$props.self);
      if ("confirm" in $$props) $$invalidate(2, confirm = $$props.confirm);
      if ("prompt" in $$props) $$invalidate(3, prompt = $$props.prompt);
      if ("promptClass" in $$props) $$invalidate(4, promptClass = $$props.promptClass);
      if ("promptValue" in $$props) $$invalidate(0, promptValue = $$props.promptValue);
      if ("promptMultiLine" in $$props) $$invalidate(5, promptMultiLine = $$props.promptMultiLine);
      if ("focus" in $$props) $$invalidate(13, focus = $$props.focus);
      if ("align" in $$props) $$invalidate(6, align = $$props.align);
      if ("buttons" in $$props) $$invalidate(7, buttons = $$props.buttons);
    };

    $$self.$$.update = function () {
      if ($$self.$$.dirty &
      /*focusNextChange, prompt, focus, promptMultiLine, promptMultiElem, promptSingleElem, confirm, self, buttons, buttonsElem*/
      26542) {
         {
          if (focusNextChange) {
            if (prompt && focus !== false) {
              if (promptMultiLine) {
                if (promptMultiElem) {
                  promptMultiElem.focus();
                  $$invalidate(14, focusNextChange = false);
                }
              } else {
                if (promptSingleElem) {
                  promptSingleElem.focus();
                  $$invalidate(14, focusNextChange = false);
                }
              }
            } else if (confirm && (focus === true || focus === null && self.stack.modal === true)) {
              if (buttons.length && buttonsElem) {
                var i = buttons.length - 1;

                while (i > 0) {
                  if (buttons[i].promptTrigger) {
                    break;
                  }

                  i--;
                }

                buttonsElem.children[i].focus();
                $$invalidate(14, focusNextChange = false);
              }
            }
          }
        }
      }
    };

    return [promptValue, self, confirm, prompt, promptClass, promptMultiLine, align, buttons, promptMultiElem, promptSingleElem, buttonsElem, handleClick, handleKeyPress, focus, focusNextChange, textarea_binding, textarea_input_handler, input_binding, input_input_handler, click_handler, div0_binding];
  }

  var Confirm = /*#__PURE__*/function (_SvelteComponent) {
    _inherits(Confirm, _SvelteComponent);

    var _super = _createSuper(Confirm);

    function Confirm(options) {
      var _this;

      _classCallCheck(this, Confirm);

      _this = _super.call(this);
      init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
        self: 1,
        confirm: 2,
        prompt: 3,
        promptClass: 4,
        promptValue: 0,
        promptMultiLine: 5,
        focus: 13,
        align: 6,
        buttons: 7
      });
      return _this;
    }

    return Confirm;
  }(SvelteComponent);

  exports.default = Confirm;
  exports.defaults = defaults;
  exports.position = position;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
