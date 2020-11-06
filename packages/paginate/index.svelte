<script context="module">
  export const position = 'PrependContainer';
  export const defaults = {
    buttons: true,
    count: true,
    immediateTransition: true,
    waiting: true,
    labels: {
      previous: 'Previous',
      next: 'Next',
      of: 'of'
    }
  };
</script>

<script>
  import { onMount, onDestroy } from 'svelte';

  // The PNotify notice.
  export let self = null;

  export let buttons = defaults.buttons;
  export let count = defaults.count;
  export let immediateTransition = defaults.immediateTransition;
  export let waiting = defaults.waiting;
  export let labels = defaults.labels;

  let currentIndex;
  let stackLength;

  const handlerCallback = () => {
    currentIndex = 0;
    try {
      self.stack.forEach(notice => currentIndex++, {
        start: self,
        dir: 'prev'
      });
    } catch (e) {
      if (e.message !== 'Invalid start param.') {
        throw e;
      }
    }
    stackLength = self.stack.length;
  };

  let addHandlerOff;
  let removeHandlerOff;
  let beforeOpenHandlerOff;

  onMount(() => {
    handlerCallback();
    addHandlerOff = self.stack.on('afterAddNotice', handlerCallback);
    removeHandlerOff = self.stack.on('afterRemoveNotice', handlerCallback);
    beforeOpenHandlerOff = self.on('beforeOpen', handlerCallback);
  });

  onDestroy(() => {
    addHandlerOff();
    removeHandlerOff();
    beforeOpenHandlerOff();
  });

  function handleNext() {
    self.stack.forEach(
      notice => {
        if (
          notice !== self &&
          (notice.getState() === 'waiting' ||
            (!waiting && notice.getState() === 'closed'))
        ) {
          self.stack.swap(self, notice, immediateTransition, waiting);
          return false;
        }
      },
      {
        start: self,
        dir: 'next'
      }
    );
  }

  function handlePrevious() {
    self.stack.forEach(
      notice => {
        if (notice !== self && notice.getState() === 'waiting') {
          self.stack.swap(self, notice, immediateTransition, true);
          return false;
        }
      },
      {
        start: self,
        dir: 'prev'
      }
    );
  }
</script>

<div class={`pnotify-paginate ${self.getStyle('paginate')}`}>
  {#if buttons}
    <div
      class={`pnotify-paginate-buttons ${self.getStyle('paginate-buttons')}`}
    >
      <div
        role="button"
        tabindex={currentIndex === 1 ? '-1' : '0'}
        aria-disabled={currentIndex === 1}
        on:click={event => handlePrevious()}
        class={`pnotify-paginate-button ${self.getStyle('paginate-btn')} ${self.getStyle('paginate-previous')}`}
        title={labels.previous}
      />
      <div
        role="button"
        tabindex={currentIndex === stackLength ? '-1' : '0'}
        aria-disabled={currentIndex === stackLength}
        on:click={event => handleNext()}
        class={`pnotify-paginate-button ${self.getStyle('paginate-btn')} ${self.getStyle('paginate-next')}`}
        title={labels.next}
      />
    </div>
  {/if}
  {#if count}
    <div class={`pnotify-paginate-count ${self.getStyle('paginate-count')}`}>
      <span
        class={`pnotify-paginate-count-current ${self.getStyle('paginate-count-current')}`}
      >
        {currentIndex}
      </span>
      <span
        class={`pnotify-paginate-count-of ${self.getStyle('paginate-count-of')}`}
      >
        {labels.of}
      </span>
      <span
        class={`pnotify-paginate-count-total ${self.getStyle('paginate-count-total')}`}
      >
        {stackLength}
      </span>
    </div>
  {/if}
</div>

<style>
  :global(.pnotify-paginate) {
    float: right;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  :global(.pnotify-paginate-buttons) {
    display: flex;
  }
  :global(.pnotify-paginate-button) {
    display: inline-block;
    margin: 0 0.5em;
    cursor: pointer;
  }
  :global(.pnotify-paginate-button:disabled),
  :global(.pnotify-paginate-button[aria-disabled='true']) {
    cursor: initial;
  }
  :global(.pnotify-paginate-count) {
    font-size: 0.9em;
  }
</style>
