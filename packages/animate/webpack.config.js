const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.ENV === 'development';

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: {
    PNotifyAnimate: path.resolve(__dirname, 'index.svelte')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: ['[name]'],
    libraryTarget: 'umd'
  },
  externals: {
    './PNotify': 'PNotify'
  },
  optimization: {
    usedExports: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.svelte', '.html', '.css']
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|svelte)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.svelte$/,
        exclude: /\/node_modules\//,
        use: {
          loader: 'svelte-loader',
          options: {
            dev: devMode,
            emitCss: true
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  }
};
