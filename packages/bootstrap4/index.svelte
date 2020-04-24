<script context="module">
  export const position = 'PrependContainer';
  export const defaults = {};

  export function init(eventDetail) {
    eventDetail.defaults.styling = {
      prefix: 'bootstrap4',

      container: 'alert',
      notice: 'alert-warning',
      info: 'alert-info',
      success: 'alert-success',
      error: 'alert-danger',

      // Confirm Module
      'action-bar': 'bootstrap4-ml',
      'prompt-bar': 'bootstrap4-ml',
      btn: 'btn mx-1',
      'btn-primary': 'btn-primary',
      'btn-secondary': 'btn-secondary',
      input: 'form-control'
    };
  }
</script>

<style>
  :global(.pnotify .bootstrap4-title) {
    font-size: 1.2rem;
  }
  /* correct positioning of icon. */
  :global(.pnotify .bootstrap4-icon > *) {
    position: relative;
    line-height: 1.2rem;
  }

  /* Confirm Module */
  :global(.pnotify.pnotify-with-icon .bootstrap4-ml) {
    margin-left: 24px;
  }
  :global([dir='rtl'] .pnotify.pnotify-with-icon .bootstrap4-ml) {
    margin-right: 24px;
    margin-left: 0;
  }
</style>
