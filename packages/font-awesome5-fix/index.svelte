<script context="module">
  export const position = 'PrependContainer';
  export const defaults = {};
</script>

<script>
  import { onDestroy, tick } from 'svelte';

  // The PNotify notice.
  export let self = null;

  // This keeps the beforeUpdate handler from going into a loop when we're
  // taming Font Awesome's magic.
  let _updatingIcon = false;
  let _updatingSticker = false;
  // Save the old value of icon, so we can do our magic.
  let _oldIconProp = self.icon;
  let _oldIconValue = self.icon === true ? self.getIcon(self.type) : self.icon;
  let _oldSticker = `${self.getIcon('sticker')} ${
    self.hide ? self.getIcon('unstuck') : self.getIcon('stuck')
  }`;
  let newIconProp;
  let newIconValue;
  let newSticker;

  const removeIconHandler = self.on('pnotify:update', () => {
    if (_updatingIcon) {
      return;
    }

    // Font Awesome 5 uses dark magic by replacing the icon element with an SVG.
    // In order to make it play nice with Svelte, we have to clear the element
    // and make it again.

    newIconProp = self.icon;
    newIconValue = self.icon === true ? self.getIcon(self.type) : self.icon;

    if (
      newIconValue !== _oldIconValue &&
      ((typeof newIconValue === 'string' &&
        newIconValue.match(/(^| )fa[srlb]($| )/)) ||
        (typeof _oldIconValue === 'string' &&
          _oldIconValue.match(/(^| )fa[srlb]($| )/)))
    ) {
      self.icon = false;
      _updatingIcon = true;
      tick().then(() => {
        self.icon = newIconProp;
        _updatingIcon = false;
        // Update seved icon.
        _oldIconProp = newIconProp;
        _oldIconValue = newIconValue;
      });
    } else {
      // Update seved icon.
      _oldIconProp = newIconProp;
      _oldIconValue = newIconValue;
    }
  });

  const removeStickerHandler = self.on('pnotify:update', () => {
    if (_updatingSticker) {
      return;
    }

    // Font Awesome 5 uses dark magic by replacing the icon element with an SVG.
    // In order to make it play nice with Svelte, we have to clear the element
    // and make it again.

    newSticker = `${self.getIcon('sticker')} ${
      self.hide ? self.getIcon('unstuck') : self.getIcon('stuck')
    }`;

    if (
      self.sticker &&
      newSticker !== _oldSticker &&
      typeof newSticker === 'string' &&
      newSticker.match(/(^| )fa[srlb]($| )/)
    ) {
      self.sticker = false;
      _updatingSticker = true;
      tick().then(() => {
        self.sticker = true;
        _updatingSticker = false;
        // Update seved icon.
        _oldSticker = newSticker;
      });
    } else {
      // Update seved icon.
      _oldSticker = newSticker;
    }
  });

  onDestroy(() => {
    removeIconHandler && removeIconHandler();
    removeStickerHandler && removeStickerHandler();
  });
</script>
