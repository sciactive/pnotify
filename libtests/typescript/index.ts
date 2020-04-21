import {info, Stack, defaultStack, defaultModules, Notice, ModuleEntry} from '@pnotify/core';
import * as PNotifyBootstrap4 from '@pnotify/bootstrap4';
import * as PNotifyAnimate from '@pnotify/animate';
import * as PNotifyConfirm from '@pnotify/confirm';

defaultModules.set(PNotifyBootstrap4, {});

// This *will not* produce an error, because TypeScript doesn't know the options
// are for PNotifyAnimate.
const entry: ModuleEntry = [PNotifyAnimate, {
  inClass: 'someClass',
  // This is bad, because if you get the options wrong or they change in a
  // future version of PNotify, TypeScript won't tell you about it.
  something: true,
}];

const entry2: ModuleEntry<typeof PNotifyAnimate> = [PNotifyAnimate, {
  inClass: 'someClass',
  // This *will* produce an error, as it should.
  // something: true,
}];

const stack = new Stack({
  dir1: 'up'
});

const myNotice = info({
  text: 'Hello.',
  hide: false,
  closer: false,
  sticker: false,
  // This is good, because it's a Stack instance.
  stack,
  // This is bad, because it's just an object. This will produce an error.
  // stack: { dir1: 'up' },
  // This will produce an error, because it is the wrong type.
  // delay: 'string',
  modules: new Map([
    ...defaultModules,
    [PNotifyAnimate, {
      inClass: 'bounceIn',
      outClass: 'bounceOut',
      // This *will* produce a TypeScript error, as it should.
      // something: true,
    }] as ModuleEntry<typeof PNotifyAnimate>,
    [PNotifyConfirm, {
      confirm: true,
      buttons: [
        {
          text: 'Hi',
          primary: true,
          click: (notice: Notice) => notice.close()
        }
      ]
    }] as ModuleEntry<typeof PNotifyConfirm>,
  ])
});

// Hover over these in your IDE to see what TypeScript says about their value.
stack.dir1;
defaultStack.dir1;

// Unfortunately, TypeScript doesn't yet provide a way to spread the options
// over the notice, so here, TypeSript says `text` could be
// `string | false | HTMLElement`.
myNotice.text;
// But if you assign the value after the notice is created (which you probably
// shouldn't do usually),
myNotice.text = document.createElement('span');
// TypeScript knows now that it's an HTMLElement.
myNotice.text;
// And if you assign it back,
myNotice.text = 'Hello.';
// TypeScript knows it's a string.
myNotice.text;

// It does know that `type` defaults to `"info"` here because we used the `info`
// function.
myNotice.type;


// Something you can do is to assert the type of the options on the notice.
const myOptions2 = {
  text: 'Hello.'
};
const myNotice2 = info(myOptions2) as Notice & typeof myOptions2;

// Now TypeScript knows that `text` is a string.
myNotice2.text;
// But you can't then assign anything else. :(
// myNotice2.text = document.createElement('span'); // TypeScript error.