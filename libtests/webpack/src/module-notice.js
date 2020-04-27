import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyConfirm from 'pnotify/dist/es/PNotifyConfirm';
// const PNotify = require('pnotify/dist/umd/PNotify');
// const PNotifyConfirm = require('pnotify/dist/umd/PNotifyConfirm');

export default function moduleNotice () {
  return PNotify.notice({
    title: 'Yay!',
    text: 'It works!',
    modules: {
      Confirm: {
        confirm: true
      }
    }
  });
}
