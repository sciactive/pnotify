// Not working? Did you `npm install` first?
var PNotify = require('pnotify/dist/umd/PNotify');

document.getElementById('button1').addEventListener('click', function () {
  PNotify.notice({
    title: 'Yay!',
    text: 'It works!'
  });
});

document.getElementById('button2').addEventListener('click', function () {
  var PNotifyConfirm = require('pnotify/dist/umd/PNotifyConfirm'); // eslint-disable-line no-unused-vars

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
