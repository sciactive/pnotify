<script context="module">
  export const position = 'PrependContainer';
  export const defaults = {
    inClass: null,
    outClass: null,
  };
</script>
<script>
  import { onDestroy } from 'svelte';

  // The PNotify notice.
  export let self = null;

  export let inClass = defaults.inClass;
  export let outClass = defaults.outClass;

  let _animation = self.animation;
  let _animateIn = self.animateIn;
  let _animateOut = self.animateOut;

  $: if (inClass || outClass) {
    self.$set({
      animation: 'none',
      animateIn,
      animateOut
    });
  } else {
    self.$set({
      animation: _animation,
      animateIn: _animateIn,
      animateOut: _animateOut
    });
  }

  onDestroy(() => {
    self.$set({
      animation: _animation,
      animateIn: _animateIn,
      animateOut: _animateOut
    });
  });

  self.on('pnotify:update', () => {
    if (self.refs.elem) {
      var animSpeed = 250;
      if (self.animateSpeed === 'slow') {
        animSpeed = 400;
      } else if (self.animateSpeed === 'fast') {
        animSpeed = 100;
      } else if (self.animateSpeed > 0) {
        animSpeed = self.animateSpeed;
      }
      animSpeed = animSpeed / 1000;
      if (self.refs.elem.style.animationDuration !== animSpeed + 's') {
        self.refs.elem.style.animationDuration = animSpeed + 's';
      }
    }
  });

  function animateIn (callback, immediate) {
    // Declare that the notice is animating in.
    self.setAnimating('in');

    let off;
    const finished = event => {
      if (event && self.refs.elem && event.target !== self.refs.elem) {
        return;
      }
      off();
      self.setAnimatingClass('pnotify-in animated');
      if (callback) {
        callback.call();
      }
      // Declare that the notice has completed animating.
      self.setAnimating(false);
    };

    off = self.on('animationend', finished);
    if (immediate) {
      finished();
    } else {
      self.setAnimatingClass('pnotify-in animated ' + (inClass || outClass));
    }
  }

  function animateOut (callback, immediate) {
    // Declare that the notice is animating out.
    self.setAnimating('out');

    let off;
    const finished = event => {
      if (event && self.refs.elem && event.target !== self.refs.elem) {
        return;
      }
      off();
      self.setAnimatingClass('animated');
      if (callback) {
        callback.call();
      }
      // Declare that the notice has completed animating.
      if (self.setAnimating) {
        self.setAnimating(false);
      }
    };

    off = self.on('animationend', finished);
    if (immediate) {
      finished();
    } else {
      self.setAnimatingClass('pnotify-in animated ' + (outClass || inClass));
    }
  }

  self.attention = (aniClass, callback) => {
    let off;
    const cb = () => {
      off();
      self.removeModuleClass('container', 'animated', aniClass);
      if (callback) {
        callback.call(self);
      }
    };
    off = self.on('animationend', cb);
    self.addModuleClass('container', 'animated', aniClass);
  };
</script>
