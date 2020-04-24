<script context="module">
  export const position = 'PrependContainer';
  export const defaults = {};

  export function init(eventDetail) {
    // You must have Font Awesome v4.0+
    eventDetail.defaults.icons = {
      prefix: 'fontawesome4',

      notice: 'fa fa-exclamation-circle',
      info: 'fa fa-info-circle',
      success: 'fa fa-check-circle',
      error: 'fa fa-exclamation-triangle',

      // Buttons Module
      closer: 'fa fa-times',
      sticker: 'fa',
      stuck: 'fa-play',
      unstuck: 'fa-pause',

      // Reference Module (Useful for other modules.)
      refresh: 'fa fa-refresh'
    };
  }
</script>
