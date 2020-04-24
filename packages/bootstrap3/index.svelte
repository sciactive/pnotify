<script context="module">
  export const position = 'PrependContainer';
  export const defaults = {};

  export function init(eventDetail) {
    eventDetail.defaults.styling = {
      prefix: 'bootstrap3',

      container: 'alert',
      notice: 'alert-warning',
      info: 'alert-info',
      success: 'alert-success',
      error: 'alert-danger',

      // Confirm Module
      'action-bar': 'bootstrap3-ml',
      'prompt-bar': 'bootstrap3-ml',
      btn: 'btn btn-default bootstrap3-mx-1',
      'btn-primary': 'btn-primary',
      'btn-secondary': '',
      input: 'form-control'
    };
  }
</script>

<style>
  /* correct positioning of icon. */
  :global(.pnotify .bootstrap3-icon > *) {
    position: relative;
    top: 0.1rem;
  }

  /* Confirm Module */
  :global(.bootstrap3-mx-1) {
    margin: 0 5px;
  }
  :global(.pnotify.pnotify-with-icon .bootstrap3-ml) {
    margin-left: 24px;
  }
  :global([dir='rtl'] .pnotify.pnotify-with-icon .bootstrap3-ml) {
    margin-right: 24px;
    margin-left: 0;
  }
</style>
