#!/user/bin/env nodejs
'use strict';

const fs = require('fs');
const svelte = require('svelte/compiler');

let pnotifyComponents = [
  // Main code.
  'PNotifyCoreComponent',
  'PNotifyAnimateComponent',
  'PNotifyButtonsComponent',
  'PNotifyMobileComponent',
  // 'PNotifyHistoryComponent',
  // 'PNotifyDesktopComponent',
  'PNotifyConfirmComponent'

  // Styles.
  'PNotifyStyleMaterialComponent',

  // Reference module.
  'PNotifyReferenceComponent',
];

let pnotifySrc = [
  // Main code.
  'PNotifyCore',
  'PNotifyAnimate',
  'PNotifyButtons',
  'PNotifyMobile',
  // 'PNotifyHistory',
  // 'PNotifyDesktop',
  'PNotifyConfirm',
  'PNotifyCallbacks',

  // Styles.
  'PNotifyStyleMaterial',

  // Reference module.
  'PNotifyReference',
];

try {
  fs.mkdirSync('dist');
} catch (e) {}
try {
  fs.mkdirSync('dist/es');
} catch (e) {}

// Compile Svelte component.
for (let name of pnotifyComponents) {
  const srcFilename = 'src/' + name + '.html';
  const dstFilename = 'dist/es/' + name + '.js';
  let code = fs.readFileSync(srcFilename, 'utf8');
  let map;

  const { js } = svelte.compile(code, {
    format: 'esm',
    filename: srcFilename,
    name,
    css: false
  });
  ({ code, map } = js);
  code += '\n//# sourceMappingURL=' + name + '.js.map';

  fs.writeFileSync(dstFilename, code);
  if (map) {
    fs.writeFileSync(dstFilename + '.map', JSON.stringify(map));
  }
}

// Alter module to import correctly.
for (let name of pnotifySrc) {
  const srcFilename = 'src/' + name + '.js';
  const dstFilename = 'dist/es/' + name + '.js';
  let code = fs.readFileSync(srcFilename, 'utf8');

  code = code.replace(/import (.*) from (["'])\.\/(\w*)\.html(["'])/g, 'import $1 from $2./$3$4');

  fs.writeFileSync(dstFilename, code);
}
