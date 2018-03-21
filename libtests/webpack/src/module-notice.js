import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyReference from 'pnotify/dist/es/PNotifyReference'; // eslint-disable-line no-unused-vars

export default function moduleNotice () {
  return PNotify.notice({
    title: 'Yay!',
    text: 'It works!',
    modules: {
      Reference: {
        putThing: true
      }
    }
  });
}
