import PNotify from 'pnotify/dist/es/PNotify';

export default function simpleNotice () {
  return PNotify.notice({
    title: 'Yay!',
    text: 'It works!'
  });
}
