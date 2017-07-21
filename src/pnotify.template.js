// Template
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as a module.
    define('pnotify.template', ['jquery', 'pnotify'], factory);
  } else if (typeof exports === 'object' && typeof module !== 'undefined') {
    // CommonJS
    module.exports = factory(require('jquery'), require('./pnotify'));
  } else {
    // Browser globals
    factory(root.jQuery, root.PNotify);
  }
}(typeof window !== "undefined" ? window : this, function ($, PNotify) {
        PNotify.prototype.options.template = {
            element: ""
        };  
        
        PNotify.prototype.modules.template = {
            init: function (notice, options) {
                if (!options.element) { 
                    return;
                }
                notice.text_container.append(options.element);
            }
        };

  return PNotify;
}));
