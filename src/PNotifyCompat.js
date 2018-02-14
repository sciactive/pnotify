import PNotify from "./PNotify.html";

// Translate v3 options to v4 options.
const translateOptions = (options, module, moduleName) => {
  // Merge the classic default options.
  const newOptions = module ? Object.assign({}, moduleName ? PNotifyCompat.prototype.options[moduleName] : {}, options) : Object.assign({}, PNotifyCompat.prototype.options, options);
  const translateName = (badName) => {
    let goodName = badName, underscoreIndex;
    while ((underscoreIndex = goodName.indexOf('_')) !== -1) {
      goodName = goodName.slice(0, underscoreIndex) + goodName.slice(underscoreIndex + 1, underscoreIndex + 2).toUpperCase() + goodName.slice(underscoreIndex + 2);
    }
    return goodName;
  };

  // Translate all options to the new style.
  for (let name in newOptions) {
    if (newOptions.hasOwnProperty(name) && name.indexOf('_') !== -1) {
      const goodName = translateName(name);
      newOptions[goodName] = newOptions[name];
      delete newOptions[name];
    }
  }

  if (!module) {
    // Options that have changed.
    if (newOptions.hasOwnProperty('addclass')) {
      newOptions.addClass = newOptions.addclass;
      delete newOptions.addclass;
    }
    if (newOptions.hasOwnProperty('cornerclass')) {
      newOptions.cornerClass = newOptions.cornerclass;
      delete newOptions.cornerClass;
    }
    if (newOptions.hasOwnProperty('textEscape')) {
      newOptions.textTrusted = !newOptions.textEscape;
      delete newOptions.textEscape;
    }
    if (newOptions.hasOwnProperty('titleEscape')) {
      newOptions.titleTrusted = !newOptions.titleEscape;
      delete newOptions.titleEscape;
    }

    // Styling and icons.
    if (newOptions.hasOwnProperty('styling')) {
      if (newOptions.styling === 'bootstrap3') {
        newOptions.icons = 'bootstrap3';
      } else if (newOptions.styling === 'fontawesome') {
        newOptions.styling = 'bootstrap3';
        newOptions.icons = 'fontawesome4';
      }
    }

    // Stacks.
    if (newOptions.hasOwnProperty('stack')) {
      if (newOptions.stack.overlay_close) {
        newOptions.stack.overlayClose = newOptions.stack.overlay_close;
      }
    }

    // Translate module options.
    newOptions.modules = {};
    if (newOptions.hasOwnProperty('animate')) {
      newOptions.modules.Animate = translateOptions(newOptions.animate, true, 'animate');
      delete newOptions.animate;
    }
    if (newOptions.hasOwnProperty('buttons')) {
      newOptions.modules.Buttons = translateOptions(newOptions.buttons, true, 'buttons');
      delete newOptions.buttons;
      if (newOptions.modules.Buttons.classes) {
        newOptions.modules.Buttons.classes = translateOptions(newOptions.modules.Buttons.classes, true);
      }
    }
    if (newOptions.hasOwnProperty('confirm')) {
      newOptions.modules.Confirm = translateOptions(newOptions.confirm, true, 'confirm');
      delete newOptions.confirm;
    }
    if (newOptions.hasOwnProperty('desktop')) {
      newOptions.modules.Desktop = translateOptions(newOptions.desktop, true, 'desktop');
      delete newOptions.desktop;
    }
    if (newOptions.hasOwnProperty('history')) {
      newOptions.modules.History = translateOptions(newOptions.history, true, 'history');
      delete newOptions.history;
    }
    if (newOptions.hasOwnProperty('mobile')) {
      newOptions.modules.Mobile = translateOptions(newOptions.mobile, true, 'mobile');
      delete newOptions.mobile;
    }
    if (newOptions.hasOwnProperty('nonblock')) {
      newOptions.modules.NonBlock = translateOptions(newOptions.nonblock, true, 'nonblock');
      delete newOptions.nonblock;
    }
    if (newOptions.hasOwnProperty('reference')) {
      newOptions.modules.Reference = translateOptions(newOptions.reference, true, 'reference');
      delete newOptions.reference;
    }
    if (newOptions.hasOwnProperty('beforeInit')) {
      if (!newOptions.modules.Callbacks) {
        newOptions.modules.Callbacks = {};
      }
      newOptions.modules.Callbacks.beforeInit = newOptions.beforeInit;
      delete newOptions.beforeInit;
    }
    if (newOptions.hasOwnProperty('afterInit')) {
      if (!newOptions.modules.Callbacks) {
        newOptions.modules.Callbacks = {};
      }
      newOptions.modules.Callbacks.afterInit = newOptions.afterInit;
      delete newOptions.afterInit;
    }
    if (newOptions.hasOwnProperty('beforeOpen')) {
      if (!newOptions.modules.Callbacks) {
        newOptions.modules.Callbacks = {};
      }
      newOptions.modules.Callbacks.beforeOpen = newOptions.beforeOpen;
      delete newOptions.beforeOpen;
    }
    if (newOptions.hasOwnProperty('afterOpen')) {
      if (!newOptions.modules.Callbacks) {
        newOptions.modules.Callbacks = {};
      }
      newOptions.modules.Callbacks.afterOpen = newOptions.afterOpen;
      delete newOptions.afterOpen;
    }
    if (newOptions.hasOwnProperty('beforeClose')) {
      if (!newOptions.modules.Callbacks) {
        newOptions.modules.Callbacks = {};
      }
      newOptions.modules.Callbacks.beforeClose = newOptions.beforeClose;
      delete newOptions.beforeClose;
    }
    if (newOptions.hasOwnProperty('afterClose')) {
      if (!newOptions.modules.Callbacks) {
        newOptions.modules.Callbacks = {};
      }
      newOptions.modules.Callbacks.afterClose = newOptions.afterClose;
      delete newOptions.afterClose;
    }
  }

  return newOptions;
}

// The compatibility class.
class PNotifyCompat extends PNotify {
  constructor(options) {
    if (typeof options !== "object") {
      options = {"text": options};
    }

    // These need to be called directly, since we're not using PNotify.alert().
    if (PNotify.modules.Callbacks && options.before_init) {
      options.before_init(options);
    }

    options = translateOptions(options);

    super({target: document.body, data: options});

    // Override the get function to retunr the element like it did in v3.
    const _get = this.get;
    this.get = function(option) {
      if (option === undefined) {
        return Object.assign(window.jQuery ? window.jQuery(this.refs.elem) : this.refs.elem, _get.call(this));
      }
      return _get.call(this, option);
    };

    // Confirm module events.
    this.on('pnotify.confirm', (e) => {
      if (window.jQuery) {
        window.jQuery(this.refs.elem).trigger('pnotify.confirm', [this, e.value]);
      }
    });
    this.on('pnotify.cancel', (e) => {
      if (window.jQuery) {
        window.jQuery(this.refs.elem).trigger('pnotify.cancel', this);
      }
    });

    if (PNotify.modules.Callbacks) {
      PNotify.modules.Callbacks.getCallbacks(this, null, 'afterInit')(this);
    }
  }

  update(options) {
    options = translateOptions(options);
    return super.update(options);
  }
}

// Lets you change defaults the old way.
PNotifyCompat.prototype.options = {
  text_escape: false,
  title_escape: false
};

// Forward static functions.
PNotifyCompat.reload = () => PNotifyCompat;
PNotifyCompat.removeAll = () => PNotify.removeAll();
PNotifyCompat.removeStack = (stack) => PNotify.removeStack(stack);
PNotifyCompat.positionAll = (animate) => PNotify.positionAll(animate);

// Desktop module permission method.
PNotifyCompat.desktop = {
  permission: () => {
    PNotify.modules.Desktop.permission();
  }
};

// Old style showLast() in History module.
if (window.jQuery) {
  window.jQuery(() => {
    window.jQuery(document.body).on('pnotify.history-last', function() {
      PNotify.modules.History.showLast();
    });
  });
}

export default PNotifyCompat;
