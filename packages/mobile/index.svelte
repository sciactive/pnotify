<script context="module">
  export const position = 'PrependContainer';
  export const defaults = {
    swipeDismiss: true
  };
</script>

<script>
  import { onMount, onDestroy } from 'svelte';

  // The PNotify notice.
  export let self = null;

  export let swipeDismiss = defaults.swipeDismiss;

  let origXY = null;
  let diffXY = null;
  let noticeWidthHeight = null;
  let noticeOpacity = null;
  let csspos = 'left';
  let direction = 'X';
  let span = 'Width';
  let windowInnerWidth = window.innerWidth;
  let offs = [];

  $: {
    const stack = self.stack;
    if (stack) {
      if (windowInnerWidth <= 480) {
        if (!('_m_spacing1' in stack)) {
          stack._m_spacing1 = stack.spacing1;
          stack._m_firstpos1 = stack.firstpos1;
          stack._m_spacing2 = stack.spacing2;
          stack._m_firstpos2 = stack.firstpos2;
          stack.spacing1 = 0;
          stack.firstpos1 = 0;
          stack.spacing2 = 0;
          stack.firstpos2 = 0;
          stack.queuePosition();
        }
      } else {
        if ('_m_spacing1' in stack) {
          stack.spacing1 = stack._m_spacing1;
          delete stack._m_spacing1;
          stack.firstpos1 = stack._m_firstpos1;
          delete stack._m_firstpos1;
          stack.spacing2 = stack._m_spacing2;
          delete stack._m_spacing2;
          stack.firstpos2 = stack._m_firstpos2;
          delete stack._m_firstpos2;
          stack.queuePosition();
        }
      }
    }
  }

  onMount(() => {
    offs = [
      self.on('touchstart', e => {
        if (!swipeDismiss) {
          return;
        }

        const stack = self.stack;
        if (stack) {
          switch (stack.dir1) {
            case 'up':
            case 'down':
              csspos = 'left';
              direction = 'X';
              span = 'Width';
              break;
            case 'left':
            case 'right':
              csspos = 'top';
              direction = 'Y';
              span = 'Height';
              break;
          }
        }

        origXY = e.touches[0][`screen${direction}`];
        noticeWidthHeight = self.refs.elem[`scroll${span}`];
        noticeOpacity = window.getComputedStyle(self.refs.elem)['opacity'];
        self.refs.container.style[csspos] = 0;
      }),

      self.on('touchmove', e => {
        if (!origXY || !swipeDismiss) {
          return;
        }

        const curXY = e.touches[0][`screen${direction}`];

        diffXY = curXY - origXY;
        const opacity =
          (1 - Math.abs(diffXY) / noticeWidthHeight) * noticeOpacity;

        self.refs.elem.style.opacity = opacity;
        self.refs.container.style[csspos] = `${diffXY}px`;
      }),

      self.on('touchend', () => {
        if (!origXY || !swipeDismiss) {
          return;
        }

        self.refs.container.classList.add('pnotify-mobile-animate-left');
        if (Math.abs(diffXY) > 40) {
          const goLeft =
            diffXY < 0 ? noticeWidthHeight * -2 : noticeWidthHeight * 2;
          self.refs.elem.style.opacity = 0;
          self.refs.container.style[csspos] = `${goLeft}px`;
          self.close();
        } else {
          self.refs.elem.style.removeProperty('opacity');
          self.refs.container.style.removeProperty(csspos);
        }
        origXY = null;
        diffXY = null;
        noticeWidthHeight = null;
        noticeOpacity = null;
      }),

      self.on('touchcancel', () => {
        if (!origXY || !swipeDismiss) {
          return;
        }

        self.refs.elem.style.removeProperty('opacity');
        self.refs.container.style.removeProperty(csspos);
        origXY = null;
        diffXY = null;
        noticeWidthHeight = null;
        noticeOpacity = null;
      }),

      self.on('pnotify:afterClose', () => {
        // Remove any styling we added to close it.
        if (!swipeDismiss) {
          return;
        }

        self.refs.elem.style.removeProperty('opacity');
        self.refs.container.style.removeProperty('left');
        self.refs.container.style.removeProperty('top');
      })
    ];
  });

  onDestroy(() => {
    offs.forEach(off => off());
  });
</script>

<svelte:window on:resize={() => (windowInnerWidth = window.innerWidth)} />

<style>
  :global([data-pnotify] .pnotify-container) {
    position: relative;
  }
  :global([data-pnotify] .pnotify-mobile-animate-left) {
    transition: left 0.1s ease;
  }
  :global([data-pnotify] .pnotify-mobile-animate-top) {
    transition: top 0.1s ease;
  }
  @media (max-width: 480px) {
    /* -- Notice */
    :global([data-pnotify].pnotify) {
      font-size: 1.2em;
      -webkit-font-smoothing: antialiased;
      -moz-font-smoothing: antialiased;
      -ms-font-smoothing: antialiased;
      font-smoothing: antialiased;
    }
    :global(body > [data-pnotify].pnotify) {
      position: fixed;
    }
    :global([data-pnotify].pnotify.pnotify-stack-down),
    :global([data-pnotify].pnotify.pnotify-stack-up) {
      width: 100% !important;
    }
    :global([data-pnotify].pnotify.pnotify-stack-right),
    :global([data-pnotify].pnotify.pnotify-stack-left) {
      height: 100% !important;
    }
    :global([data-pnotify].pnotify .pnotify-shadow) {
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
    }
    :global([data-pnotify].pnotify.pnotify-stack-down .pnotify-shadow) {
      border-bottom-width: 5px;
    }
    :global([data-pnotify].pnotify.pnotify-stack-up .pnotify-shadow) {
      border-top-width: 5px;
    }
    :global([data-pnotify].pnotify.pnotify-stack-right .pnotify-shadow) {
      border-right-width: 5px;
    }
    :global([data-pnotify].pnotify.pnotify-stack-left .pnotify-shadow) {
      border-left-width: 5px;
    }
    :global([data-pnotify].pnotify .pnotify-container) {
      -webkit-border-radius: 0;
      -moz-border-radius: 0;
      border-radius: 0;
    }
    :global([data-pnotify].pnotify.pnotify-stack-down .pnotify-container),
    :global([data-pnotify].pnotify.pnotify-stack-up .pnotify-container) {
      width: auto !important;
    }
    :global([data-pnotify].pnotify.pnotify-stack-right .pnotify-container),
    :global([data-pnotify].pnotify.pnotify-stack-left .pnotify-container) {
      height: 100% !important;
    }
  }
</style>
