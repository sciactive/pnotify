<script context="module">
  export const position = 'PrependContainer';
  export const defaults = {
    fallback: true,
    icon: null,
    tag: null,
    title: null,
    text: null,
    options: {}
  };

  function requestPermission() {
    if (
      typeof Notification !== 'undefined' &&
      'requestPermission' in Notification
    ) {
      Notification.requestPermission();
    } else if ('webkitNotifications' in window) {
      window.webkitNotifications.requestPermission();
    }
  }
  export { requestPermission as permission };

  const Notification = window.Notification;

  let notify = (title, options, onclick, onclose) => {
    // Memoize based on feature detection.
    if ('Notification' in window) {
      notify = (title, options, onclick, onclose) => {
        const notice = new Notification(title, options);
        if ('NotificationEvent' in window) {
          notice.addEventListener('notificationclick', onclick);
          notice.addEventListener('close', onclose);
        } else if ('addEventListener' in notice) {
          notice.addEventListener('click', onclick);
          notice.addEventListener('close', onclose);
        } else {
          notice.onclick = onclick;
          notice.onclose = onclose;
        }
        return notice;
      };
    } else if ('mozNotification' in navigator) {
      notify = (title, options, onclick, onclose) => {
        // Gecko < 22
        const notice = navigator.mozNotification
          .createNotification(title, options.body, options.icon)
          .show();
        notice.onclick = onclick;
        notice.onclose = onclose;
        return notice;
      };
    } else if ('webkitNotifications' in window) {
      notify = (title, options, onclick, onclose) => {
        const notice = window.webkitNotifications.createNotification(
          options.icon,
          title,
          options.body
        );
        notice.onclick = onclick;
        notice.onclose = onclose;
        return notice;
      };
    } else {
      notify = (title, options, onclick, onclose) => {
        return null;
      };
    }
    return notify(title, options, onclick, onclose);
  };

  function checkPermission() {
    if (typeof Notification !== 'undefined' && 'permission' in Notification) {
      return Notification.permission === 'granted';
    } else if ('webkitNotifications' in window) {
      return window.webkitNotifications.checkPermission() == 0;
    }
    return false;
  }

  let _permission = checkPermission();
</script>

<script>
  // The PNotify notice.
  export let self = null;

  export let fallback = defaults.fallback;
  export let icon = defaults.icon;
  export let tag = defaults.tag;
  export let title = defaults.title;
  export let text = defaults.text;
  export let options = defaults.options;

  let _desktop;
  // Animation should always be 'none' for desktop notices, but remember
  // the old animation so it can be recovered.
  let _oldAnimation = 'none';
  let _icon;
  let _tag;

  $: {
    if (self.animation !== 'none') {
      _oldAnimation = self.animation;
    }

    // This is necessary so desktop notices don't cause spacing problems
    // when positioning.
    if (self.getAnimatingClass() !== '' && _permission) {
      self.setAnimatingClass('');
    }

    if (!_permission && self.hasModuleClass('elem', 'pnotify-desktop-hide')) {
      self.removeModuleClass('elem', 'pnotify-desktop-hide');
      self.animation = _oldAnimation;
    } else if (
      _permission &&
      !self.hasModuleClass('elem', 'pnotify-desktop-hide')
    ) {
      self.addModuleClass('elem', 'pnotify-desktop-hide');
      self.animation = 'none';
      genNotice();
    }
  }

  $: {
    self.setModuleHandled(_permission);
  }

  self.on('pnotify:beforeOpen', () => {
    if (!_permission) {
      requestPermission();
      return;
    }
    if (_desktop && 'show' in _desktop) {
      self.setModuleOpen(true);
      _desktop.show();
    }
  });

  self.on('pnotify:beforeClose', () => {
    if (!_permission) {
      return;
    }
    if (_desktop && 'close' in _desktop) {
      _desktop.close();
      self.setModuleOpen(false);
    }
  });

  _permission = checkPermission();

  if (_permission) {
    self.addModuleClass('elem', 'pnotify-desktop-hide');
    self.animation = 'none';
    genNotice();
  } else if (!fallback) {
    // Keep the notice from opening if fallback is false.
    self.autoOpen = false;
  }

  function genNotice() {
    if (icon === null) {
      switch (self.type) {
        case 'error':
          _icon =
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gQJATQg7e6HvQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABr0lEQVRYw8WXu0oDQRSGv7hRSFYrLTTWKihaqUgUJO+gphBLL1jYpPSCVcAggpWthYhC7Ows9An0IbSPkMRCw8ZmFuI6yczs9cAPuzNz5v92brtrESxGARtokkCcAg2hk7jNl4G2R/m4zFPAiwTgWdRFHnmJuaulOAAaPQDqUZvv9DB3tR0lwIcGwHtU5uca5q4qYZvngJbHpAZ8CtU8dS1gLEyAisegBGTFKWiL65KnzVlY5uOSId6VtNuTtMupOu/TAHiQlNmSskHNXCOAGWBeUp7VhFoApoMAXAOWJoCszBJ9+ALY6vL0JiPgjsKmKUAaOOoBZwIAcNxlJLsCrAOTIQJMAWu62y4LOIqT7lGS96TIcYCMDkBZ46h1gB+PHI28ssq8X/G6DaqG8Piz2DrjVjGXbtSBy46F5QAHwJAizwZugKKscs7gSaqS/KpB/qxsFxwafhf6Odb/eblJi8BGwJdW26BtURxQpMU83hmaDQsNiPtvYMSwj3tgAqDgYzU7wJdHjo9+CgBvEW47lV5Tgj5DMtG0xIfESkIAF+522gdWxTzGEX3i9+6KpOMXF5UBt0NKJCAAAAAASUVORK5CYII=';
          break;
        case 'success':
          _icon =
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gQJATQPRj+65AAAAdBJREFUWMPtlzsvRFEQx3+7HmEjoiYKolVJJDRqnS8ggvVIVEQhCIUsEYJGCEH2E4h4FPREaLTbEo1IEJXHrmY2GTf33nPuY7ud5OTenTMz//89Z86ZWShLWf5LB3AOfACFiOMF2AkC3qOc88BXxFEAxlX8ftGdaNCEen8H6oFHYBR4FocwkpTngzzHgF01fwL0aYcp9fVtMW/rsMcWXWijK1Hexgye9smRT6CxaHgjytMYwccNSXqoja9FeVbiZS+OVaeDiUBLAPAJA/i2m5MXgRSQk7llC/DBMOBeBGqAe0eAjQhfvurH3EmgQk6EW6CVEHt+ZFo6J4EU8OoTcF35jhnAl2wSx20LFgyB1yyOWtY2c72ScMAAkPeZy6g4zUBdGAIAcyEq4Z7y7xbdTFgCACMBwPVJqVDHeNqvaplkH5i0sNuUwmaNkQxww20ZSOy7gFvX7SAk0i76jPQQlJoAwAEwq35ngfmwVatSdUMArZZ+K9JQ1Bp6iGqgSt7f/AIOqSzujLEn6AV+JG6zm4HuCZ+AJuAbWAQu5aIJu7JDck0ngDugC/j1c2qPqR13jpxuvWyS8liY/kQcean/lX6ACQ99DdAQYe+Lf0zylMUgf7qDKgzv284QAAAAAElFTkSuQmCC';
          break;
        case 'info':
          _icon =
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gQJATQ09zRTwAAAAdxJREFUWMPtl88rRFEUxz8zBolRCgsrpOym8TMSO2WplLKwUrKi/B0W7JSFmhVLNlhSlLKx8CtRGpEsJpofpZk3Nkc9b968e++8mdlw6vTeu/edc773nl/3wl+ngOH/zUAf0AN0AmEgB7wCD8AtcFMJoM3ADpAHLHk62RIwL8B0uQwHgXVRnDfkS2DSj/EW4K0Ew05eLMV4O/CuUJwEUvJUgdgwMd4IpBUKl13kVG6aL+ZjJ20DDQqQXy5jKYVMDBhVrb5f069LLrKfGnInqh040HRTvsTAHgei9oGQ7X0YaNNUNCdFKChgQvKtQ1vAkNvEahlSToez9oXad2BCA30ceHZxRxMQMShuvZLmv+hOA32/h+KUwS7MugVhqwb6Go+5nEEwht0ABDUEzyXdFsrQYwqMJjTbdxio9Qkg6QbgvkpnkLw0uQIAZ1UCYNkXawdw4qPCmVBcuADAMZCpAoCVYr3AKtYyHZSWauakjMx50TWwrzJw6lFARjQOt3se8jM6W9TloSCqIb9bRHbN5Fg+KkEZcow/Ak+KFBsD6h3jR8CUabAMlqn7xfxEbAdwWKLhhO3sGPCbOsNSvSyF0Z/5TaCuEleziLhmAOiWG1NWrmZXwIVU1A/+SZO+AcgLC4wt0zD3AAAAAElFTkSuQmCC';
          break;
        case 'notice':
        default:
          _icon =
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gQJATM4scOJLAAAAcxJREFUWMPtljtLA0EQx3+J0QRfnYqCiCA+MERBrIwgFtoFbMTOR61i5QcQBdEihZWNoEWwsNAvkMJeBLHRQtHC0iIP4utOmw2cx97d7l2SRgcGbufmv/Pf2dmdhb8uIR+YJqAPaBff30AeeAHuxLgqMgRkgS/AAEybGuLfEdBcycCTwKVYmY5mgO6gwdd8BLaqAST9Bs8EDG7VTd3gex4TbgEjwKjQOHDugZlRDb7sMZEJpCS4bYVMJOygsG1cB+wqHN0Gib1RYXFpLwL74nx7Sb3EFlXATQNjTgRagA3FbZIRiCliT5wITGgUaRACA0CPjMC4xtUcDUAgDAzLCCQ0MhALQCAE9MoIdGkQCJIBgE4ZgWiNMvDL10qgUMMMFGQEnjQmkLXbVg38s8y4qtFcTCAnHiJ5oKiJnSoHjVgIXAmHkGIl5yy+YcWruIy9dvqpupIDCfZWEXvh1gsWFVfxIbG9a3RbRwJnYiuqJYfAqxsBgBWFiQyJzfTAlIB1uzEicbwBFoBTl8lSwINoSuXKjrv4F4FBh61zlKUKvgn7/e5ZEngMEDgLdFSieHaAT42LpgTMVbqC24B54Bi4twV9E6cnDcw6PFj+RSo/l6rlSlldhx4AAAAASUVORK5CYII=';
          break;
      }
    } else if (icon === false) {
      _icon = null;
    } else {
      _icon = icon;
    }

    if (!_tag || tag !== null) {
      _tag =
        tag === null ? `PNotify-${Math.round(Math.random() * 1000000)}` : tag;
    }

    const desktopOptions = {
      body: text || self.text,
      tag: _tag
    };
    if (!self.hide) {
      desktopOptions.requireInteraction = true;
    }
    if (_icon !== null) {
      desktopOptions.icon = _icon;
    }
    Object.apply(desktopOptions, options);

    _desktop = notify(
      title || self.title,
      desktopOptions,
      () => {
        self.fire && self.fire('click', { target: _desktop });
      },
      () => {
        self.close && self.close();
      }
    );

    if (!('close' in _desktop) && 'cancel' in _desktop) {
      _desktop.close = () => {
        _desktop.cancel();
      };
    }
  }
</script>

<style>
  :global([data-pnotify].pnotify-desktop-hide) {
    left: -10000px !important;
    display: none !important;
  }
</style>
