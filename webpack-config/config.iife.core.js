const path = require('path');
const common = require('./common');

module.exports = {
  entry: {
    PNotify: path.resolve(__dirname, '..', 'src', 'PNotifyCoreLoader.js')
  },
  output: {
    path: path.resolve(__dirname, '..', 'lib', 'iife'),
    filename: '[name].js',
    library: ['[name]'],
    // libraryTarget: 'window',
    libraryExport: 'default'
  },
  ...common
};
