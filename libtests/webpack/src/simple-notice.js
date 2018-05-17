import PNotify from 'pnotify/dist/es/PNotify';
// const PNotify = require('pnotify/dist/umd/PNotify');

export default function simpleNotice () {
  return PNotify.notice({
    title: 'Yay!',
    text: 'It works!'
  });
}
