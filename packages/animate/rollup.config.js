import nodeResolve from 'rollup-plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import path from 'path';
import pkg from './package.json';
const devMode = process.env.ENV === 'development';

export default {
  input: pkg.svelte,
  output: {
    file: pkg.main,
    format: 'umd',
    name: path.basename(pkg.main, '.js'),
    exports: 'named'
  },
  plugins: [
    nodeResolve({
      browser: true
    }),
    svelte({
      emitCss: true
    }),
    babel({
      presets: ['@babel/preset-env'],
      extensions: ['.js', '.mjs', '.svelte']
    }),
    postcss({
      extract: true,
      minimize: !devMode
    }),
    ...(devMode ? [] : [terser()])
  ]
};
