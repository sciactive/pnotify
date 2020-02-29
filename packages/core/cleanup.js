#!/user/bin/env nodejs
'use strict';

const fs = require('fs');

try {
  fs.unlinkSync('dist/BrightTheme.js');
  fs.unlinkSync('dist/Material.js');
} catch (e) {}
