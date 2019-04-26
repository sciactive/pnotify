const path = require('path');
const common = require('./common');

module.exports = {
  entry: {
    PNotifyButtons: path.resolve(__dirname, '..', 'src', 'PNotifyButtonsLoader.js'),
    PNotifyAnimate: path.resolve(__dirname, '..', 'src', 'PNotifyAnimateLoader.js'),
    PNotifyConfirm: path.resolve(__dirname, '..', 'src', 'PNotifyConfirmLoader.js')
  },
  output: {
    path: path.resolve(__dirname, '..', 'lib', 'iife'),
    filename: '[name].js'
  },
  externals: {
    './PNotifyCoreLoader': 'PNotify'
  },
  ...common
};
