// History
(function($){
	var history_handle_top;
	PNotify.prototype.options.history = {
		// Display a pull down menu to redisplay previous notices, and place the
		// notice in the history.
		history: true,
		// Maximum number of notifications to have onscreen.
		maxonscreen: Infinity,
		// The various displayed text, helps facilitating internationalization.
		history_text: {
			redisplay: "Redisplay",
			all: "All",
			last: "Last"
		}
	};
	PNotify.prototype.modules.history = {
		init: function(notice, options){
			var that = this;

			// Make sure that no notices get destroyed.
			notice.options.destroy = false;

			// The history variable controls whether the notice gets redisplayed
			// by the history pull down.
			this.pnotify_history = this.options.history;
			// The hide variable controls whether the history pull down should
			// queue a removal timer.
			this.pnotify_hide = this.options.hide;


			if (this.options.history) {
				// If there isn't a history pull down, create one.
				var history_menu = jwindow.data("pnotify_history");
				if (typeof history_menu === "undefined") {
					$("body").on("pnotify.history-all", function(){
						// Display all notices. (Disregarding non-history notices.)
						$.each(PNotify.notices, function(){
							if (this.pnotify_history) {
								if (this.is(":visible")) {
									if (this.pnotify_hide)
										this.queueRemove();
								} else if (this.open)
									this.open();
							}
						});
					}).on("pnotify.history-last", function(){
						var pushTop = ($.pnotify.defaults.stack.push === "top");

						// Look up the last history notice, and display it.
						var i = (pushTop ? 0 : -1);

						var notice;
						do {
							if (i === -1)
								notice = PNotify.notices.slice(i);
							else
								notice = PNotify.notices.slice(i, i+1);
							if (!notice[0])
								return false;

							i = (pushTop ? i + 1 : i - 1);
						} while (!notice[0].pnotify_history || notice[0].is(":visible"));
						if (notice[0].open)
							notice[0].open();
					});
					history_menu = $("<div />", {
						"class": "ui-pnotify-history-container "+notice.styles.hi_menu,
						"mouseleave": function(){
							history_menu.animate({top: "-"+history_handle_top+"px"}, {duration: 100, queue: false});
						}
					})
					.append($("<div />", {"class": "ui-pnotify-history-header", "text": this.options.labels.redisplay}))
					.append($("<button />", {
							"class": "ui-pnotify-history-all "+notice.styles.hi_btn,
							"text": this.options.labels.all,
							"mouseenter": function(){
								$(this).addClass(notice.styles.hi_btnhov);
							},
							"mouseleave": function(){
								$(this).removeClass(notice.styles.hi_btnhov);
							},
							"click": function(){
								$(this).trigger("pnotify.history-all");
								return false;
							}
					}))
					.append($("<button />", {
							"class": "ui-pnotify-history-last "+notice.styles.hi_btn,
							"text": this.options.labels.last,
							"mouseenter": function(){
								$(this).addClass(notice.styles.hi_btnhov);
							},
							"mouseleave": function(){
								$(this).removeClass(notice.styles.hi_btnhov);
							},
							"click": function(){
								$(this).trigger("pnotify.history-last");
								return false;
							}
					}))
					.appendTo(body);

					// Make a handle so the user can pull down the history tab.
					var handle = $("<span />", {
						"class": "ui-pnotify-history-pulldown "+notice.styles.hi_hnd,
						"mouseenter": function(){
							history_menu.animate({top: "0"}, {duration: 100, queue: false});
						}
					})
					.appendTo(history_menu);

					// Get the top of the handle.
					history_handle_top = handle.offset().top + 2;
					// Hide the history pull down up to the top of the handle.
					history_menu.css({top: "-"+history_handle_top+"px"});
					// Save the history pull down.
					jwindow.data("pnotify_history", history_menu);
				}
			}
		},
		update: function(notice, options, oldOpts){
			// Update values for history menu access.
			this.pnotify_history = this.options.history;
			this.pnotify_hide = this.options.hide;
		},
		beforeOpen: function(notice, options){
			// Remove oldest notifications leaving only this.options.maxonscreen on screen
			if (PNotify.notices && (PNotify.notices.length > options.maxonscreen)) {
				// Oldest are normally in front of array, or if stack.push=="top" then
				// they are at the end of the array! (issue #98)
				var el;
				if (notice.options.stack.push !== "top")
					el = PNotify.notices.slice(0, PNotify.notices.length - options.maxonscreen);
				else
					el = PNotify.notices.slice(options.maxonscreen, PNotify.notices.length);

				$.each(el, function(){
					if (this.remove)
						this.remove();
				});
			}
		}
	};
	$.extend(PNotify.styling.jqueryui, {
		hi_menu: "ui-state-default ui-corner-bottom",
		hi_btn: "ui-state-default ui-corner-all",
		hi_btnhov: "ui-state-hover",
		hi_hnd: "ui-icon ui-icon-grip-dotted-horizontal"
	});
	$.extend(PNotify.styling.bootstrap, {
		hi_menu: "well",
		hi_btn: "btn",
		hi_btnhov: "",
		hi_hnd: "icon-chevron-down"
	});
	$.extend(PNotify.styling.bootstrap3, {
		hi_menu: "well",
		hi_btn: "btn btn-default",
		hi_btnhov: "",
		hi_hnd: "glyphicon glyphicon-chevron-down"
	});
	$.extend(PNotify.styling.fontawesome, {
		hi_menu: "well",
		hi_btn: "btn btn-default",
		hi_btnhov: "",
		hi_hnd: "fa fa-chevron-down"
	});
})(jQuery);