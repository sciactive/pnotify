{#if showCountdown}
  <div
    class={`pnotify-countdown pnotify-countdown-${anchor} ${
      reverse ? 'pnotify-countdown-reverse' : ''
    } ${self.getStyle('countdown')}`}
  >
    <div
      class={`pnotify-countdown-bar ${self.getStyle('countdown-bar')}`}
      style={`height: ${
        anchor === 'right' || anchor === 'left' ? _percent : '100'
      }%; width: ${
        anchor === 'top' || anchor === 'bottom' ? _percent : '100'
      }%;`}
    />
  </div>
{/if}

<script context="module">
  export const position = 'AppendContainer';
  export const defaults = {
    anchor: 'bottom',
    reverse: false,
  };
</script>

<script>
  import { onMount, onDestroy } from 'svelte';

  // The PNotify notice.
  export let self = null;

  export let anchor = defaults.anchor;
  export let reverse = defaults.reverse;

  let _state = self.getState();
  let _timer = self.getTimer();
  let _msLeft = 0;
  let _percent = 100;
  let ival;
  let offUpdate;
  let offAfterOpen;

  $: showCountdown =
    ['opening', 'open', 'closing'].indexOf(_state) !== -1 &&
    self.hide &&
    self.delay !== Infinity;
  $: timeStart =
    showCountdown && _timer && _timer !== 'prevented' ? new Date() : null;
  $: {
    self.removeModuleClass(
      'elem',
      'pnotify-with-countdown',
      'pnotify-with-countdown-bottom',
      'pnotify-with-countdown-top',
      'pnotify-with-countdown-left',
      'pnotify-with-countdown-right'
    );
    if (showCountdown) {
      self.addModuleClass(
        'elem',
        'pnotify-with-countdown',
        `pnotify-with-countdown-${anchor}`
      );
    }
  }

  const getValues = () => {
    _state = self.getState();
    _timer = self.getTimer();
  };

  onMount(() => {
    offUpdate = self.on('pnotify:update', getValues);
    offAfterOpen = self.on('pnotify:afterOpen', getValues);

    ival = setInterval(() => {
      if (showCountdown) {
        if (timeStart) {
          _msLeft = self.delay - (new Date() - timeStart);
          _percent = (_msLeft / self.delay) * 100;
        } else {
          _percent = _state === 'closing' ? 0 : 100;
        }
      }
    }, 100);
  });

  onDestroy(() => {
    offUpdate && offUpdate();
    offAfterOpen && offAfterOpen();
    clearInterval(ival);
  });
</script>

<style>
  :global(.pnotify-countdown) {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 0.5em;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  :global(.pnotify-countdown-top) {
    top: auto;
    bottom: 100%;
  }
  :global(.pnotify-countdown-left) {
    top: 0;
    right: 100%;
    left: auto;
    height: 100%;
    width: 0.5em;
  }
  :global(.pnotify-countdown-right) {
    top: 0;
    left: 100%;
    height: 100%;
    width: 0.5em;
  }
  :global(.pnotify-countdown-bar) {
    position: absolute;
    top: 0;
    left: 0;
    transition: width 0.1s linear;
  }
  :global(.pnotify-countdown-reverse .pnotify-countdown-bar) {
    top: auto;
    left: auto;
    right: 0;
    bottom: 0;
  }
</style>
