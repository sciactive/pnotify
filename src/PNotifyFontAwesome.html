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
  let _oldIcon = self.icon === true ? self.getIcon(self.type) : self.icon;
  let _oldSticker = self.getIcon('sticker') + ' ' + (self.hide ? self.getIcon('unstuck') : self.getIcon('stuck'));
  let newIcon;
  let newSticker;

  const removeIconHandler = self.on('pnotify:update', async () => {
    if (_updatingIcon) {
      return;
    }

    // Font Awesome 5 uses dark magic by replacing the icon element with an SVG.
    // In order to make it play nice with Svelte, we have to clear the element
    // and make it again.

    newIcon = self.icon === true ? self.getIcon(self.type) : self.icon;

    if (newIcon !== _oldIcon && typeof newIcon === 'string' && newIcon.match(/(^| )fa[srlb]($| )/)) {
      self.icon = false;
      _updatingIcon = true;
      await tick();
      self.icon = newIcon;
      _updatingIcon = false;
    }

    // Update seved icon.
    _oldIcon = newIcon;
  });

  const removeStickerHandler = self.on('pnotify:update', async () => {
    if (_updatingSticker) {
      return;
    }

    // Font Awesome 5 uses dark magic by replacing the icon element with an SVG.
    // In order to make it play nice with Svelte, we have to clear the element
    // and make it again.

    newSticker = self.getIcon('sticker') + ' ' + (self.hide ? self.getIcon('unstuck') : self.getIcon('stuck'));

    if (self.sticker && newSticker !== _oldSticker && typeof newSticker === 'string' && newSticker.match(/(^| )fa[srlb]($| )/)) {
      self.sticker = false;
      _updatingSticker = true;
      await tick();
      self.sticker = true;
      _updatingSticker = false;
    }

    // Update seved icon.
    _oldSticker = newSticker;
  });

  onDestroy(() => {
    removeIconHandler && removeIconHandler();
    removeStickerHandler && removeStickerHandler();
  });
</script>