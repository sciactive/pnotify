import {notice, Stack, defaultStack} from '@pnotify/core';

const myNotice = notice({
  text: 'Hello.'
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