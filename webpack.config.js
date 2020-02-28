const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.ENV === 'development';

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: {
    PNotify: path.resolve(__dirname, 'src', 'PNotify.svelte'),
    PNotifyAnimate: path.resolve(__dirname, 'src', 'PNotifyAnimate.svelte'),
    PNotifyBootstrap3: path.resolve(__dirname, 'src', 'PNotifyBootstrap3.svelte'),
    PNotifyBootstrap4: path.resolve(__dirname, 'src', 'PNotifyBootstrap4.svelte'),
    PNotifyBrightTheme: path.resolve(__dirname, 'src', 'PNotifyBrightTheme.css'),
    PNotifyConfirm: path.resolve(__dirname, 'src', 'PNotifyConfirm.svelte'),
    PNotifyDesktop: path.resolve(__dirname, 'src', 'PNotifyDesktop.svelte'),
    PNotifyFontAwesome: path.resolve(__dirname, 'src', 'PNotifyFontAwesome.svelte'),
    PNotifyFontAwesome4: path.resolve(__dirname, 'src', 'PNotifyFontAwesome4.svelte'),
    PNotifyFontAwesome5: path.resolve(__dirname, 'src', 'PNotifyFontAwesome5.svelte'),
    PNotifyGlyphicon: path.resolve(__dirname, 'src', 'PNotifyGlyphicon.svelte'),
    PNotifyMaterial: path.resolve(__dirname, 'src', 'PNotifyMaterial.css'),
    PNotifyMobile: path.resolve(__dirname, 'src', 'PNotifyMobile.svelte'),
    PNotifyReference: path.resolve(__dirname, 'src', 'PNotifyReference.svelte')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: ['[name]']
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
        test: /\.(html|svelte)$/,
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
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/transform-classes',
                {
                  builtins: ['Error']
                }
              ]
            ]
          }
        }
      }
    ]
  }
};
