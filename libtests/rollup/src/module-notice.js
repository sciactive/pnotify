// Tree shaking, so you can include from the index.

// TODO(hperrin): Is there anything I can do to make this work in Rollup?

import {PNotify, PNotifyConfirm} from 'pnotify';
PNotifyConfirm; // eslint-disable-line no-unused-expressions

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
