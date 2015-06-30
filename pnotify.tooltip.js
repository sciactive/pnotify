// Tooltip
// Uses AMD or browser globals for jQuery.
(function (factory) {
    if (typeof(exports) === 'object' && typeof(module) !== 'undefined') {
        // CommonJS
        module.exports = factory(require('jquery'), require('pnotify'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as a module.
        define('pnotify.tooltip', ['jquery', 'pnotify'], factory);
    } else {
        // Browser globals
        factory(jQuery, PNotify);
    }
}(function($, PNotify){

}));
