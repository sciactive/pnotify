<script context="module">
  export const position = 'PrependContainer';
  export const defaults = {};

  export function init(eventDetail) {
    // You must have Glyphicon (or Bootstrap 3)
    eventDetail.defaults.icons = {
      prefix: 'glyphicon',

      notice: 'glyphicon glyphicon-exclamation-sign',
      info: 'glyphicon glyphicon-info-sign',
      success: 'glyphicon glyphicon-ok-sign',
      error: 'glyphicon glyphicon-warning-sign',

      // Buttons Module
      closer: 'glyphicon glyphicon-remove',
      sticker: 'glyphicon',
      stuck: 'glyphicon-play',
      unstuck: 'glyphicon-pause',

      // Reference Module (Useful for other modules.)
      refresh: 'glyphicon glyphicon-refresh'
    };
  }
</script>
