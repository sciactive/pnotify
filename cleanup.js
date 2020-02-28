#!/user/bin/env nodejs
'use strict';

const fs = require('fs');

try {
  fs.unlinkSync('dist/PNotifyBrightTheme.js');
  fs.unlinkSync('dist/PNotifyMaterial.js');
} catch (e) {}
