import PNotify from '../../dist/es/PNotify.js';
import PNotifyConfirm from '../../dist/es/PNotifyConfirm.js'; // eslint-disable-line no-unused-vars

document.getElementById('button1').addEventListener('click', function () {
  PNotify.notice({
    title: 'Yay!',
    text: 'It works!'
  });
});
document.getElementById('button2').addEventListener('click', function () {
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
