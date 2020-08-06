let loaderUtils = require('loader-utils');
let fs = require('fs');

function loader(source) {
  let filename = loaderUtils.interpolateName(this, '[hash].[ext]', {content: source});
  this.emitFile(filename, source);

  return `module.exports="${filename}"`;
}
loader.raw = true; //二进制

module.exports = loader;
