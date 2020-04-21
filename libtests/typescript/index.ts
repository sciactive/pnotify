import {notice, Stack, defaultStack} from '@pnotify/core';
import * as PNotifyAnimate from '@pnotify/animate';
import * as PNotifyConfirm from '@pnotify/confirm';

const myNotice = notice({
  text: 'Hello.',
  modules: new Map([
    // This should not produce a TypeScript error:
    [PNotifyAnimate, {
      inClass: 'someClass',
    }] as PNotifyAnimate.Entry,
    [PNotifyConfirm, {
      confirm: true,
    }] as PNotifyConfirm.Entry,
    // This should produce a TypeScript error:
    // [PNotifyAnimate, {
    //   inClass: 'someClass',
    //   something: 'hello',
    // }] as PNotifyAnimate.Entry,
  ])
});

const stack = new Stack({
  dir1: 'up'
});

stack.dir1;
defaultStack.dir1;

myNotice.text;
myNotice.text = document.createElement('span');
myNotice.text;

myNotice.closer;
myNotice.type;