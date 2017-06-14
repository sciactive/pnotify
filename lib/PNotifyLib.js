'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var PNotifyLib = function () {
	'use strict';

	var template = function () {
		return {
			oncreate: function oncreate() {
				this.thing();
			},
			data: function data() {
				return {
					dummy: true
				};
			},

			methods: {
				thing: function thing() {
					return null;
				}
			}
		};
	}();

	function add_css() {
		var style = createElement('style');
		style.id = "svelte-1874503376-style";
		style.textContent = "\n  [svelte-1874503376].pnotify-notice, [svelte-1874503376] .pnotify-notice {\n    display: block;\n  }\n";
		appendNode(style, document.head);
	}

	function create_main_fragment(state, component) {
		var div = createElement('div');
		setAttribute(div, 'svelte-1874503376', '');
		div.className = "pnotify-notice";
		appendNode(createText("PNotify"), div);

		return {
			mount: function mount(target, anchor) {
				insertNode(div, target, anchor);
			},

			unmount: function unmount() {
				detachNode(div);
			},

			destroy: noop
		};
	}

	function PNotifyLib(options) {
		options = options || {};
		this._state = assign(template.data(), options.data);

		this._observers = {
			pre: Object.create(null),
			post: Object.create(null)
		};

		this._handlers = Object.create(null);

		this._root = options._root || this;
		this._yield = options._yield;

		this._torndown = false;
		if (!document.getElementById("svelte-1874503376-style")) add_css();

		this._fragment = create_main_fragment(this._state, this);
		if (options.target) this._fragment.mount(options.target, null);

		if (options._root) {
			options._root._renderHooks.push(template.oncreate.bind(this));
		} else {
			template.oncreate.call(this);
		}
	}

	assign(PNotifyLib.prototype, template.methods, {
		get: get,
		fire: fire,
		observe: observe,
		on: on,
		set: set,
		_flush: _flush
	});

	PNotifyLib.prototype._set = function _set(newState) {
		var oldState = this._state;
		this._state = assign({}, oldState, newState);
		dispatchObservers(this, this._observers.pre, newState, oldState);
		dispatchObservers(this, this._observers.post, newState, oldState);
	};

	PNotifyLib.prototype.teardown = PNotifyLib.prototype.destroy = function destroy(detach) {
		this.fire('destroy');

		if (detach !== false) this._fragment.unmount();
		this._fragment.destroy();
		this._fragment = null;

		this._state = {};
		this._torndown = true;
	};

	function createElement(name) {
		return document.createElement(name);
	}

	function insertNode(node, target, anchor) {
		target.insertBefore(node, anchor);
	}

	function setAttribute(node, attribute, value) {
		node.setAttribute(attribute, value);
	}

	function detachNode(node) {
		node.parentNode.removeChild(node);
	}

	function createText(data) {
		return document.createTextNode(data);
	}

	function appendNode(node, target) {
		target.appendChild(node);
	}

	function assign(target) {
		var k,
		    source,
		    i = 1,
		    len = arguments.length;
		for (; i < len; i++) {
			source = arguments[i];
			for (k in source) {
				target[k] = source[k];
			}
		}

		return target;
	}

	function dispatchObservers(component, group, newState, oldState) {
		for (var key in group) {
			if (!(key in newState)) continue;

			var newValue = newState[key];
			var oldValue = oldState[key];

			if (differs(newValue, oldValue)) {
				var callbacks = group[key];
				if (!callbacks) continue;

				for (var i = 0; i < callbacks.length; i += 1) {
					var callback = callbacks[i];
					if (callback.__calling) continue;

					callback.__calling = true;
					callback.call(component, newValue, oldValue);
					callback.__calling = false;
				}
			}
		}
	}

	function noop() {}

	function get(key) {
		return key ? this._state[key] : this._state;
	}

	function fire(eventName, data) {
		var handlers = eventName in this._handlers && this._handlers[eventName].slice();
		if (!handlers) return;

		for (var i = 0; i < handlers.length; i += 1) {
			handlers[i].call(this, data);
		}
	}

	function observe(key, callback, options) {
		var group = options && options.defer ? this._observers.post : this._observers.pre;

		(group[key] || (group[key] = [])).push(callback);

		if (!options || options.init !== false) {
			callback.__calling = true;
			callback.call(this, this._state[key]);
			callback.__calling = false;
		}

		return {
			cancel: function cancel() {
				var index = group[key].indexOf(callback);
				if (~index) group[key].splice(index, 1);
			}
		};
	}

	function on(eventName, handler) {
		if (eventName === 'teardown') return this.on('destroy', handler);

		var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
		handlers.push(handler);

		return {
			cancel: function cancel() {
				var index = handlers.indexOf(handler);
				if (~index) handlers.splice(index, 1);
			}
		};
	}

	function set(newState) {
		this._set(assign({}, newState));
		this._root._flush();
	}

	function _flush() {
		if (!this._renderHooks) return;

		while (this._renderHooks.length) {
			this._renderHooks.pop()();
		}
	}

	function differs(a, b) {
		return a !== b || a && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' || typeof a === 'function';
	}

	return PNotifyLib;
}();
//# sourceMappingURL=PNotifyLib.js.map