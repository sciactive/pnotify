// Not working? Did you `npm install` first?

// No tree shaking, so include only the files you need.
var PNotify = require('pnotify/dist/umd/PNotify').default;

document.getElementById('button1').addEventListener('click', function () {
  PNotify.notice({
    title: 'Yay!',
    text: 'It works!'
  });
});

document.getElementById('button2').addEventListener('click', function () {
  require('pnotify/dist/umd/PNotifyConfirm');

  PNotify.notice({
    title: 'Yay!',
    text: 'It works!',
    modules: {
      Confirm: {
        confirm: true
      }
    }
  });
});
