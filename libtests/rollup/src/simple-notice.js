import {PNotify} from 'pnotify';

export default function simpleNotice () {
  return PNotify.notice({
    title: 'Yay!',
    text: 'It works!'
  });
}
