import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyConfirm from 'pnotify/dist/es/PNotifyConfirm'; // eslint-disable-line no-unused-vars
// const PNotify = require('pnotify/dist/umd/PNotify');
// const PNotifyConfirm = require('pnotify/dist/umd/PNotifyConfirm'); // eslint-disable-line no-unused-vars

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
