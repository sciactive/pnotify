module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.html']
  },
  module: {
    rules: [
      {
        test: /\.(html|svelte)$/,
        exclude: /\/node_modules\//,
        use: {
          loader: 'svelte-loader'
        }
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
