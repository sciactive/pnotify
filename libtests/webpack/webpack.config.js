const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'src'),
        loader: require.resolve('babel-loader'),
        options: {
          compact: true
        }
      }
    ]
  },
  optimization: {
    minimize: true
  }
};
