// Callbacks
(function($){
	var _init   = PNotify.prototype.init,
		_open   = PNotify.prototype.open,
		_remove = PNotify.prototype.remove;
	PNotify.prototype.init = function(){
		if (this.options.before_init) {
			this.options.before_init(this.options);
		}
		_init.apply(this, arguments);
		if (this.options.after_init) {
			this.options.after_init(this);
		}
	};
	PNotify.prototype.open = function(){
		if (this.options.before_open) {
			this.options.before_open(this);
		}
		_open.apply(this, arguments);
		if (this.options.after_open) {
			this.options.after_open(this);
		}
	};
	PNotify.prototype.remove = function(){
		if (this.options.before_remove) {
			this.options.before_remove(this);
		}
		_remove.apply(this, arguments);
		if (this.options.after_remove) {
			this.options.after_remove(this);
		}
	};
})(jQuery);