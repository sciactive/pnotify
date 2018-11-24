#!/user/bin/env nodejs
'use strict';
/* eslint-env shelljs */

const fs = require('fs');
require('shelljs/make');

let pnotifySrc = {
  // Main code.
  'core': 'PNotify.html',
  'animate': 'PNotifyAnimate.html',
  'buttons': 'PNotifyButtons.html',
  'callbacks': 'PNotifyCallbacks.html',
  'nonblock': 'PNotifyNonBlock.html',
  'mobile': 'PNotifyMobile.html',
  'history': 'PNotifyHistory.html',
  'desktop': 'PNotifyDesktop.html',
  'confirm': 'PNotifyConfirm.html',

  // Compat module.
  'compat': 'PNotifyCompat.js',

  // Styles.
  'stylematerial': 'PNotifyStyleMaterial.html',

  // Reference module.
  'reference': 'PNotifyReference.html'
};

let pnotifyJs = {
  // Main code.
  'core': 'PNotify.js',
  'animate': 'PNotifyAnimate.js',
  'buttons': 'PNotifyButtons.js',
  'callbacks': 'PNotifyCallbacks.js',
  'nonblock': 'PNotifyNonBlock.js',
  'mobile': 'PNotifyMobile.js',
  'history': 'PNotifyHistory.js',
  'desktop': 'PNotifyDesktop.js',
  'confirm': 'PNotifyConfirm.js',

  // Compat module.
  'compat': 'PNotifyCompat.js',

  // Styles.
  'stylematerial': 'PNotifyStyleMaterial.js',

  // Reference module.
  'reference': 'PNotifyReference.js'
};

let pnotifyCss = {
  'brighttheme': 'PNotifyBrightTheme.css'
};

for (let module in pnotifySrc) {
  target[module + '_lib'] = (args) => compileJs(module, pnotifySrc[module], args);

  ((target) => {
    const existing = target[module];

    target[module] = (args) => {
      existing && existing(args);
      target[module + '_lib'](args);
    };
  })(target);
}

for (let module in pnotifyJs) {
  target[module + '_js'] = (args) => compressJs(module, pnotifyJs[module], args);

  ((target) => {
    const existing = target[module];

    target[module] = (args) => {
      existing && existing(args);
      target[module + '_js'](args);
    };
  })(target);
}

for (let module in pnotifyCss) {
  target[module + '_css'] = () => compressCss(module, pnotifyCss[module]);

  ((target) => {
    const existing = target[module];

    target[module] = (args) => {
      existing && existing(args);
      target[module + '_css'](args);
    };
  })(target);
}

target.dist = (args) => {
  for (let module in pnotifySrc) {
    target[module + '_lib'](args);
  }
  for (let module in pnotifyJs) {
    target[module + '_js'](args);
  }
  for (let module in pnotifyCss) {
    target[module + '_css'](args);
  }
};

// Functions

let compileJs = (module, filename, args) => {
  let format = setup(args);

  const srcFilename = 'src/' + filename;
  const dstFilename = 'lib/' + format + '/' + filename.replace(/\.html$/, '.js');
  console.log('Compiling JavaScript ' + module + ' from ' + srcFilename + ' to ' + dstFilename);
  console.log('Generating source map for ' + dstFilename + ' in ' + dstFilename + '.map');

  // Gather code.
  let code;
  let map;
  let inputCode;
  let inputMap;
  let isSvelte = filename.slice(-4) === 'html';
  inputCode = code = fs.readFileSync(srcFilename, 'utf8');
  inputMap = map = null;

  // Pre-compile transforms.
  if (module === 'compat' && format === 'iife') {
    inputCode = code = code.replace(/import PNotify(\w*) from ["']\.\/PNotify(\w*)\.html["'];/g, 'var PNotify$1 = window.PNotify$2;');
    inputCode = code = code.replace(/export default PNotifyCompat;/g, 'window.PNotifyCompat = PNotifyCompat;');
  }

  // Compile.
  if (isSvelte) {
    // Use Svelte to compile the code first.
    const svelte = require('svelte');
    const { js } = svelte.compile(code, {
      format: format,
      filename: srcFilename,
      name: filename.replace(/\.html$/, ''),
      amd: {
        id: filename.replace(/\.html$/, '')
      },
      globals: {
        './PNotify.html': 'PNotify'
      },
      onerror: err => {
        console.error(err);
      },
      onwarn: warning => {
        console.warn(warning);
      },
      css: true,
      cascade: false
    });
    ({ code, map } = js);
    [inputCode, inputMap] = [code, map];
    inputMap.file = filename.replace(/\.html$/, '.js');
    inputCode += '\n//# sourceMappingURL=' + filename.replace(/\.html$/, '.js') + '.map';
  }
  if (format !== 'es') {
    const babel = require('babel-core');
    const babelOptions = {
      moduleId: filename.replace(/\.(html|js)$/, ''),
      filename: filename.replace(/\.html$/, '.js'),
      filenameRelative: srcFilename,
      sourceMapTarget: srcFilename,
      moduleRoot: '',
      sourceMaps: 'both',
      sourceRoot: '../',
      plugins: [
        'transform-object-assign'
      ],
      sourceType: (format !== 'es' && isSvelte) ? 'script' : 'module'
    };

    if (inputMap) {
      babelOptions.inputSourceMap = inputMap;
    }

    if (format === 'umd' && !isSvelte) {
      babelOptions.passPerPreset = true;
      babelOptions.presets = [
        ['env', {
          modules: 'umd'
        }],
        'stage-3'
      ];
      babelOptions.plugins.push('add-module-exports');
    } else {
      babelOptions.presets = [
        ['env', {
          modules: false
        }],
        'stage-3'
      ];
    }

    ({ code, map } = babel.transform(inputCode, babelOptions));
  }

  // Post-compile transforms.
  if (format === 'es') {
    code = code.replace(/import PNotify(\w*) from ["']\.\/PNotify(\w*)\.html["'];/g, 'import PNotify$1 from "./PNotify$2.js";');
  }
  if (format === 'umd') {
    code = code.replace(/require\(["']\.\/PNotify(\w*)?\.html["']\)/g, 'require(\'./PNotify$1\')');
    code = code.replace(/, ["']\.\/PNotify(\w*)?\.html["']/g, ', \'./PNotify$1\'');
  }

  fs.writeFileSync(dstFilename, code);
  if (map) {
    fs.writeFileSync(dstFilename + '.map', JSON.stringify(map));
  }
};

let compressJs = (module, filename, args) => {
  let format = setup(args);

  const srcFilename = 'lib/' + format + '/' + filename;
  const dstFilename = 'dist/' + format + '/' + filename;
  console.log('Compressing JavaScript ' + module + ' from ' + srcFilename + ' to ' + dstFilename);
  console.log('Generating source map for ' + dstFilename + ' in ' + dstFilename + '.map');

  const UglifyJS = format === 'es' ? require('uglify-es') : require('uglify-js');
  const options = {
    sourceMap: {
      root: '../',
      filename: filename,
      url: filename + '.map'
    }
  };
  const { code, map, error } = UglifyJS.minify({
    [filename]: fs.readFileSync(srcFilename, 'utf8')
  }, options);
  if (!code) {
    console.log('error:', error);
  }
  fs.writeFileSync(dstFilename, code);
  if (map) {
    fs.writeFileSync(dstFilename + '.map', map);
  }
};

let compressCss = (module, filename) => {
  setup();
  const srcFilename = 'src/' + filename;
  const dstFilename = 'dist/' + filename;
  console.log('Compressing CSS ' + module + ' from ' + srcFilename + ' to ' + dstFilename);

  const CleanCSS = require('clean-css');
  const options = {
    rebase: false
  };
  fs.writeFileSync(dstFilename, (new CleanCSS(options).minify(fs.readFileSync(srcFilename, 'utf8'))).styles);
};

let setup = (args) => {
  let format = 'iife';
  (args || []).filter(arg => arg.match(/^--format=/)).map(arg => (format = arg.slice(9)));
  cd(__dirname);
  mkdir('-p', 'lib/' + (args ? format : ''));
  mkdir('-p', 'dist/' + (args ? format : ''));
  return format;
};
