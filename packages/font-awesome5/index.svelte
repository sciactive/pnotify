<script context="module">
  export const position = 'PrependContainer';
  export const defaults = {};

  // If you use this module, you might should also use the "FontAwesome5Fix"
  // module, which provides support for changing Font Awesome icons in notices.

  export function init(eventDetail) {
    // You must have Font Awesome v5.0+
    eventDetail.defaults.icons = {
      prefix: 'fontawesome5',

      notice: 'fas fa-exclamation-circle',
      info: 'fas fa-info-circle',
      success: 'fas fa-check-circle',
      error: 'fas fa-exclamation-triangle',

      // Buttons Module
      closer: 'fas fa-times',
      sticker: 'fas',
      stuck: 'fa-play',
      unstuck: 'fa-pause',

      // Reference Module (Useful for other modules.)
      refresh: 'fas fa-sync'
    };
  }
</script>
