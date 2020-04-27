<script context="module">
  // This file is for referencing while you are making a PNotify module.

  // This is the position your component will be placed inside the notice's DOM
  // structure. It can be 'PrependContainer', 'PrependContent', 'AppendContent',
  // or 'AppendContainer'.
  export const position = 'AppendContent';

  // This is the default values of your options.
  export const defaults = {
    // If you are displaying any text, you should use a labels options to
    // support internationalization.
    labels: {
      text: 'Spin Around'
    }
  };
</script>

<script>
  import { onDestroy } from 'svelte';

  // The PNotify notice.
  export let self = null;

  // Your options must be exported and set to the defaults.
  export let labels = defaults.labels;

  // Here you can define variables not meant to be exported as options.
  let mouseIsIn = false;

  let removeMouseEnter = self.on('mouseenter', () => (mouseIsIn = true));
  let removeMouseLeave = self.on('mouseleave', () => (mouseIsIn = false));

  onDestroy(() => {
    // Remember to clean up.
    removeMouseEnter && removeMouseEnter();
    removeMouseLeave && removeMouseLeave();
  });

  function doSomething() {
    // Spin the notice around.
    let curAngle = 0;
    const timer = setInterval(() => {
      curAngle += 10;
      if (curAngle === 360) {
        curAngle = 0;
        clearInterval(timer);
      }
      self.refs.elem.style.transform = `rotate(${curAngle}deg)`;
    }, 20);
  }
</script>

<!--
We're going to create a button that will be appended to the notice.
It will be disabled by default, so we can enable it on mouseover.
-->
<button
  class={`pnotify-action-button pnotify-reference-button ${self.getStyle('btn')} ${self.getStyle('btn-secondary')}`}
  type="button"
  disabled={!mouseIsIn}
  on:click={doSomething}
>
  <i class={self.getIcon('refresh')} />
  &nbsp;{labels.text}
</button>
<!-- Since our button is floated, we have to add a clearing div. -->
<div class="pnotify-reference-clearing" />

<style>
  .pnotify-reference-button {
    float: right;
    margin-top: 1em;
  }
  .pnotify-reference-clearing {
    clear: right;
    line-height: 0;
  }
</style>
