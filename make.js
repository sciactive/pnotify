#!/user/bin/env nodejs
'use strict';

const fs = require('fs');
const svelte = require('svelte/compiler');

const pnotifyComponents = [
  // Main code.
  'PNotify',
  'PNotifyAnimate',
  'PNotifyBootstrap3',
  'PNotifyBootstrap4',
  'PNotifyConfirm',
  'PNotifyDesktop',
  'PNotifyFontAwesome',
  'PNotifyFontAwesome4',
  'PNotifyFontAwesome5',
  'PNotifyGlyphicon',
  'PNotifyMobile',

  // Reference module.
  'PNotifyReference'
];

const pnotifySrc = [
  // Main code.
  'Component',
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
  const srcFilename = 'src/' + name + '.svelte';
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

  code = code.replace(/(import|export) (.*) from (["'])\.\/(\w*)\.svelte(["'])/g, '$1 $2 from $3./$4.js$5');

  fs.writeFileSync(dstFilename, code);
}
