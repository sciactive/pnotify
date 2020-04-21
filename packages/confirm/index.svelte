<script context="module">
  export const position = 'AppendContent';
  export const defaults = {
    confirm: false,
    prompt: false,
    promptClass: '',
    promptValue: '',
    promptMultiLine: false,
    focus: null,
    align: 'flex-end',
    buttons: [
      {
        text: 'Ok',
        primary: true,
        promptTrigger: true,
        click: (notice, value) => {
          notice.close();
          notice.fire('pnotify:confirm', { notice, value });
        }
      },
      {
        text: 'Cancel',
        click: notice => {
          notice.close();
          notice.fire('pnotify:cancel', { notice });
        }
      }
    ],
  };
</script>

{#if confirm || prompt}
  <div
    class="
      pnotify-confirm
      {self.getStyle('text')}
      {self.getStyle('confirm')}
    "
  >
    {#if prompt}
      <div
        class="
          pnotify-prompt-bar
          {self.getStyle('prompt-bar')}
        "
      >
        {#if promptMultiLine}
          <textarea
            rows="5"
            on:keypress={handleKeyPress}
            bind:this={promptMultiElem}
            class="
              pnotify-prompt-input
              {self.getStyle('input')}
              {promptClass}
            "
            bind:value={promptValue}
          ></textarea>
        {:else}
          <input
            type="text"
            on:keypress={handleKeyPress}
            bind:this={promptSingleElem}
            class="
              pnotify-prompt-input
              {self.getStyle('input')}
              {promptClass}
            "
            bind:value={promptValue}
          />
        {/if}
      </div>
    {/if}
    <div
      class="
        pnotify-action-bar
        {self.getStyle('action-bar')}
      "
      style="justify-content: {align};"
      bind:this={buttonsElem}
    >
      {#each buttons as button}
        <button
          type="button"
          on:click={event => handleClick(button, event)}
          class="
            pnotify-action-button
            {self.getStyle('btn')}
            {button.primary ? self.getStyle('btn-primary') : self.getStyle('btn-secondary')}
            {button.addClass ? button.addClass : ''}
          "
        >{#if button.textTrusted}{@html button.text}{:else}{button.text}{/if}</button>
      {/each}
    </div>
  </div>
{/if}

<script>
  // The PNotify notice.
  export let self = null;

  export let confirm = defaults.confirm;
  export let prompt = defaults.prompt;
  export let promptClass = defaults.promptClass;
  export let promptValue = defaults.promptValue;
  export let promptMultiLine = defaults.promptMultiLine;
  export let focus = defaults.focus;
  export let align = defaults.align;
  export let buttons = defaults.buttons;

  let promptMultiElem;
  let promptSingleElem;
  let buttonsElem;

  let focusNextChange = false;

  $: {
    if (focusNextChange) {
      if (prompt && focus !== false) {
        if (promptMultiLine) {
          if (promptMultiElem) {
            promptMultiElem.focus();
            focusNextChange = false;
          }
        } else {
          if (promptSingleElem) {
            promptSingleElem.focus();
            focusNextChange = false;
          }
        }
      } else if (confirm &&
        (
          focus === true ||
          (focus === null && self.stack.modal === true)
        )
      ) {
        if (buttons.length && buttonsElem) {
          let i = buttons.length - 1;
          while (i > 0) {
            if (buttons[i].promptTrigger) {
              break;
            }
            i--;
          }
          buttonsElem.children[i].focus();
          focusNextChange = false;
        }
      }
    }
  }

  self.on('pnotify:afterOpen', () => {
    focusNextChange = true;
  });

  function handleClick (button, event) {
    if (button.click) {
      button.click(self, prompt ? promptValue : null, event);
    }
  }

  function handleKeyPress (event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      const { buttons } = this.get();
      for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].promptTrigger && buttons[i].click) {
          buttons[i].click(self, prompt ? promptValue : null, event);
        }
      }
    }
  }
</script>

<style>
  :global(.pnotify-action-bar),
  :global(.pnotify-prompt-bar) {
    margin-top: 5px;
    clear: both;
  }
  :global(.pnotify-action-bar) {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  :global(.pnotify-prompt-input) {
    margin-bottom: 5px;
    display: block;
    width: 100%;
  }
</style>
