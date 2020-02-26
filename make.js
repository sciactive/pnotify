#!/user/bin/env nodejs
'use strict';

const fs = require('fs');
const svelte = require('svelte/compiler');

const pnotifyComponents = [
  // Main code.
  'PNotifyCore',
  'PNotifyAnimate',
  'PNotifyButtons',
  'PNotifyConfirm',
  'PNotifyDesktop',
  'PNotifyMobile',

  // Reference module.
  'PNotifyReference'
];

const pnotifySrc = [
  // Main code.
  'PNotify',
  'Stack'
];

try {
  fs.mkdirSync('dist');
} catch (e) {}
try {
  fs.mkdirSync('dist/es');
} catch (e) {}

// Compile Svelte component.
for (const name of pnotifyComponents) {
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
  if (map) {
    code += '\n//# sourceMappingURL=' + name + '.js.map';
  }

  fs.writeFileSync(dstFilename, code);
  if (map) {
    fs.writeFileSync(dstFilename + '.map', JSON.stringify(map));
  }
}

// Alter module to import correctly.
for (const name of pnotifySrc) {
  const srcFilename = 'src/' + name + '.js';
  const dstFilename = 'dist/es/' + name + '.js';
  let code = fs.readFileSync(srcFilename, 'utf8');

  code = code.replace(/(import|export) (.*) from (["'])\.\/(\w*)\.html(["'])/g, '$1 $2 from $3./$4.js$5');

  fs.writeFileSync(dstFilename, code);
}
