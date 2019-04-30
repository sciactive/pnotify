#!/user/bin/env nodejs
'use strict';

const fs = require('fs');

try {
  fs.unlinkSync('dist/umd/PNotifyBrightTheme.js');
  fs.unlinkSync('dist/umd/PNotifyMaterial.js');
} catch (e) {}
