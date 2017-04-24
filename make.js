#!/user/bin/env nodejs
"use strict"

require('shelljs/make')

let pnotify_js = {
  "core": "pnotify.js",
  "animate": "pnotify.animate.js",
  "buttons": "pnotify.buttons.js",
  "callbacks": "pnotify.callbacks.js",
  "confirm": "pnotify.confirm.js",
  "desktop": "pnotify.desktop.js",
  "history": "pnotify.history.js",
  "mobile": "pnotify.mobile.js",
  "nonblock": "pnotify.nonblock.js",
}

let pnotify_css = {
  "core": "pnotify.css",
  "brighttheme": "pnotify.brighttheme.css",
  "buttons": "pnotify.buttons.css",
  "history": "pnotify.history.css",
  "mobile": "pnotify.mobile.css",
  "nonblock": "pnotify.nonblock.css",
}

let root = __dirname + '/'

for (let module in pnotify_js) {
  target[module+"_js"] = () => compress_js(module, pnotify_js[module])

  ;((target) => {
    const existing = target[module]

    target[module] = () => {
      existing && existing()
      target[module+"_js"]()
    }
  })(target)
}

for (let module in pnotify_css) {
  target[module+"_css"] = () => compress_css(module, pnotify_css[module])

  ;((target) => {
    const existing = target[module]

    target[module] = () => {
      existing && existing()
      target[module+"_css"]()
    }
  })(target)
}

target.dist = () => {
  for (let module in pnotify_js) {
    target[module+"_js"]()
  }
  for (let module in pnotify_css) {
    target[module+"_css"]()
  }
}


// Functions

let compress_js = (module, filename) => {
  setup()
  const src_filename = "src/" + filename
  const dst_filename = "dist/" + filename
  echo("Compressing JavaScript "+module+" from "+src_filename+" to "+dst_filename)
  echo("Generating source map for "+dst_filename+" in "+dst_filename+".map")

  const intro = get_intro(src_filename)
  const UglifyJS = require('uglify-js')
  const options = {
    sourceRoot: "../",
    outSourceMap: filename,
    sourceMapUrl: filename+".map"
  }
  const result = UglifyJS.minify(src_filename, options)
  ;(intro + result.code).to(dst_filename)
  result.map.to(dst_filename+".map")
}

let compress_css = (module, filename) => {
  setup()
  const src_filename = "src/" + filename
  const dst_filename = "dist/" + filename
  echo("Compressing CSS "+module+" from "+src_filename+" to "+dst_filename)

  const CleanCSS = require('clean-css')
  const options = {
    rebase: false
  }
  ;(new CleanCSS(options).minify(cat(src_filename).stdout)).styles.to(dst_filename)
}

let setup = () => {
  cd(__dirname)
  mkdir('-p', 'dist')
}

let get_intro = (filename) => {
  let code = cat(filename)
  if (code.slice(0, 2) == "//") {
    return code.slice(0, code.indexOf("\n") + 1)
  } else if (code.slice(0, 2) == "/*") {
    return code.slice(0, code.indexOf("*/\n") + 3)
  } else {
    return ""
  }
}
