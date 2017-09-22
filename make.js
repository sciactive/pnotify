#!/user/bin/env nodejs
'use strict';

require('shelljs/make');

let pnotify_src = {
  'core': 'PNotify.html',
  'animate': 'pnotify.animate.js',
  'buttons': 'pnotify.buttons.js',
  'callbacks': 'pnotify.callbacks.js',
  'confirm': 'pnotify.confirm.js',
  'desktop': 'pnotify.desktop.js',
  'history': 'pnotify.history.js',
  'mobile': 'pnotify.mobile.js',
  'nonblock': 'pnotify.nonblock.js',
};

let pnotify_js = {
  'core': 'PNotify.js',
  'animate': 'pnotify.animate.js',
  'buttons': 'pnotify.buttons.js',
  'callbacks': 'pnotify.callbacks.js',
  'confirm': 'pnotify.confirm.js',
  'desktop': 'pnotify.desktop.js',
  'history': 'pnotify.history.js',
  'mobile': 'pnotify.mobile.js',
  'nonblock': 'pnotify.nonblock.js',
};

let pnotify_css = {
  'brighttheme': 'pnotify.brighttheme.css',
  'buttons': 'pnotify.buttons.css',
  'history': 'pnotify.history.css',
  'mobile': 'pnotify.mobile.css',
  'nonblock': 'pnotify.nonblock.css',
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
  target[module+'_js'] = () => compress_js(module, pnotify_js[module]);

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
  setup();
  let format = 'iife';
  (args || []).filter(arg => arg.match(/^--format=/)).map(arg => format = arg.slice(9));
  const src_filename = 'src/' + filename;
  const dst_filename = 'lib/' + filename.replace(/\.html$/, '.js');
  echo('Compiling JavaScript '+module+' from '+src_filename+' to '+dst_filename);
  echo('Generating source map for '+dst_filename+' in '+dst_filename+'.map');

  let inputCode, inputMap;
  if (filename.slice(-4) === 'html') {
    // Use Svelte to compile the code first.
    const svelte = require('svelte');
    const {code, map} = svelte.compile(cat(src_filename).stdout, {
    	format: format === 'iife' ? 'iife' : 'es',
    	filename: src_filename,
    	name: filename.replace(/\.html$/, ''),
    	onerror: err => {
    		console.error(err.message);
    	},
    	onwarn: warning => {
    		console.warn(warning.message);
    	}
    });
    [inputCode, inputMap] = [code, map];
    inputMap.file = filename.replace(/\.html$/, '.js');
    inputCode += '\n//# sourceMappingURL='+filename.replace(/\.html$/, '.js')+'.map';
  } else {
    inputCode = cat(src_filename).stdout;
    inputMap = null;
  }
  const babel = require('babel-core');
  const plugins = ["transform-class-properties", "transform-object-assign"];
  if (['iife', 'es'].indexOf(format) === -1) {
    plugins.push('transform-es2015-modules-'+format);
  }
  const {code, map} = babel.transform(inputCode, {
    inputSourceMap: inputMap,
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
    plugins: plugins,
    sourceType: format === 'iife' ? 'script' : 'module'
  });

  code.to(dst_filename);
  JSON.stringify(map).to(dst_filename+'.map');
};

let compress_js = (module, filename) => {
  setup();
  const src_filename = 'lib/' + filename;
  const dst_filename = 'dist/' + filename;
  echo('Compressing JavaScript '+module+' from '+src_filename+' to '+dst_filename);
  echo('Generating source map for '+dst_filename+' in '+dst_filename+'.map');

  const UglifyJS = require('uglify-js');
  const options = {
    sourceRoot: '../',
    outSourceMap: filename,
    sourceMapUrl: filename+'.map'
  };
  const {code, map} = UglifyJS.minify(src_filename, options);
  code.to(dst_filename);
  map.to(dst_filename+'.map');
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
  (new CleanCSS(options).minify(cat(src_filename).stdout)).styles.to(dst_filename);
};

let setup = () => {
  cd(__dirname);
  mkdir('-p', 'lib');
  mkdir('-p', 'dist');
};

let get_intro = (filename) => {
  let code = cat(filename);
  if (code.slice(0, 2) == '//') {
    return code.slice(0, code.indexOf('\n') + 1);
  } else if (code.slice(0, 2) == '/*') {
    return code.slice(0, code.indexOf('*/\n') + 3);
  } else {
    return '';
  }
};
