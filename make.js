#!/user/bin/env nodejs
'use strict';

const fs = require('fs');
require('shelljs/make');

let pnotify_src = {
  // Main code.
  'index': 'index.js',
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
  'reference': 'PNotifyReference.html',
};

let pnotify_js = {
  // Main code.
  'index': 'index.js',
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
  'reference': 'PNotifyReference.js',
};

let pnotify_css = {
  'brighttheme': 'PNotifyBrightTheme.css',
};

let root = __dirname + '/';

for (let module in pnotify_src) {
  target[module+'_lib'] = (args) => compile_js(module, pnotify_src[module], args);

  ((target) => {
    const existing = target[module];

    target[module] = (args) => {
      existing && existing(args);
      target[module+'_lib'](args);
    };
  })(target);
}

for (let module in pnotify_js) {
  target[module+'_js'] = (args) => compress_js(module, pnotify_js[module], args);

  ((target) => {
    const existing = target[module];

    target[module] = (args) => {
      existing && existing(args);
      target[module+'_js'](args);
    };
  })(target);
}

for (let module in pnotify_css) {
  target[module+'_css'] = () => compress_css(module, pnotify_css[module]);

  ((target) => {
    const existing = target[module];

    target[module] = (args) => {
      existing && existing(args);
      target[module+'_css'](args);
    };
  })(target);
}

target.dist = (args) => {
  for (let module in pnotify_src) {
    target[module+'_lib'](args);
  }
  for (let module in pnotify_js) {
    target[module+'_js'](args);
  }
  for (let module in pnotify_css) {
    target[module+'_css'](args);
  }
};


// Functions

let compile_js = (module, filename, args) => {
  let format = setup(args);

  if (module === 'index' && format === 'iife') {
    return;
  }

  const src_filename = 'src/' + filename;
  const dst_filename = 'lib/' + format + '/' + filename.replace(/\.html$/, '.js');
  echo('Compiling JavaScript '+module+' from '+src_filename+' to '+dst_filename);
  echo('Generating source map for '+dst_filename+' in '+dst_filename+'.map');

  // Gather code.
  let code, map, inputCode, inputMap, isSvelte = filename.slice(-4) === 'html';
  inputCode = code = fs.readFileSync(src_filename, 'utf8');
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
    ({code, map} = svelte.compile(code, {
    	format: format === 'iife' ? 'iife' : 'es',
    	filename: src_filename,
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
      cascade: false
    }));
    [inputCode, inputMap] = [code, map];
    inputMap.file = filename.replace(/\.html$/, '.js');
    inputCode += '\n//# sourceMappingURL='+filename.replace(/\.html$/, '.js')+'.map';
  }
  if (format !== 'es') {
    const babel = require('babel-core');
    const babelOptions = {
      moduleId: filename.replace(/\.(html|js)$/, ''),
      filename: filename.replace(/\.html$/, '.js'),
      filenameRelative: src_filename,
      sourceMapTarget: src_filename,
      moduleRoot: '',
      sourceMaps: 'both',
      sourceRoot: '../',
      presets: [
        'env',
        'stage-3'
      ],
      plugins: [
        'transform-class-properties',
        'transform-object-assign'
      ],
      sourceType: (format === 'iife' && isSvelte) ? 'script' : 'module'
    };

    if (inputMap) {
      babelOptions.inputSourceMap = inputMap;
    }

    if (format === 'iife' && !isSvelte) {
      babelOptions.passPerPreset = true;
      babelOptions.presets.push({
        plugins: ['iife-wrap']
      });
    }
    if (format !== 'iife') {
      babelOptions.plugins.push('transform-es2015-modules-'+format);
    }

    ({code, map} = babel.transform(inputCode, babelOptions));
  }

  // Post-compile transforms.
  if (format === 'es') {
    code = code.replace(/import PNotify(\w*) from ["']\.\/PNotify(\w*)\.html["'];/g, 'import PNotify$1 from "./PNotify$2.js";');
  }
  if (format === 'umd') {
    code = code.replace(/require\(["']\.\/PNotify(\w*)\.html["']\)/g, 'require("./PNotify$1")');
    code = code.replace(/, ["']\.\/PNotify(\w*)\.html["']/g, ', "PNotify$1"');
  }

  code.to(dst_filename);
  if (map) {
    JSON.stringify(map).to(dst_filename+'.map');
  }
};

let compress_js = (module, filename, args) => {
  let format = setup(args);

  if (module === 'index' && format === 'iife') {
    return;
  }

  const src_filename = 'lib/' + format + '/' + filename;
  const dst_filename = 'dist/' + format + '/' + filename;
  echo('Compressing JavaScript '+module+' from '+src_filename+' to '+dst_filename);
  echo('Generating source map for '+dst_filename+' in '+dst_filename+'.map');

  const UglifyJS = format === 'es' ? require('uglify-es') : require('uglify-js');
  const options = {
    sourceMap: {
      root: '../',
      filename: filename,
      url: filename+'.map'
    }
  };
  const {code, map} = UglifyJS.minify({
    [filename]: fs.readFileSync(src_filename, 'utf8')
  }, options);
  code.to(dst_filename);
  if (map) {
    map.to(dst_filename+'.map');
  }
};

let compress_css = (module, filename) => {
  setup();
  const src_filename = 'src/' + filename;
  const dst_filename = 'dist/' + filename;
  echo('Compressing CSS '+module+' from '+src_filename+' to '+dst_filename);

  const CleanCSS = require('clean-css');
  const options = {
    rebase: false
  };
  (new CleanCSS(options).minify(fs.readFileSync(src_filename, 'utf8'))).styles.to(dst_filename);
};

let setup = (args) => {
  let format = 'iife';
  (args || []).filter(arg => arg.match(/^--format=/)).map(arg => format = arg.slice(9));
  cd(__dirname);
  mkdir('-p', 'lib/'+(args ? format : ''));
  mkdir('-p', 'dist/'+(args ? format : ''));
  return format;
};

let get_intro = (filename) => {
  let code = fs.readFileSync(filename, 'utf8');
  if (code.slice(0, 2) == '//') {
    return code.slice(0, code.indexOf('\n') + 1);
  } else if (code.slice(0, 2) == '/*') {
    return code.slice(0, code.indexOf('*/\n') + 3);
  } else {
    return '';
  }
};
