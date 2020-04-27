import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyConfirm from 'pnotify/dist/es/PNotifyConfirm';

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
