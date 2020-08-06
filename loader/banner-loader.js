let loaderUtils = require('loader-utils');
let validateOptions = require('schema-utils');
let fs = require('fs');

function loader(source) {
  this.cacheable && this.cacheable();
  let options = loaderUtils.getOptions(this);

  let schema = {
    type: 'object',
    properties: {
      text: {
        type: 'string',
      },
      filename: {
        type: 'string',
      },
    },
  };

  validateOptions(schema, options, 'banner-loader');

  let cb = this.async();

  if (options.filename) {
    this.addDependency(options.filename);
    fs.readFile(options.filename, 'utf8', (err, data) => {
      cb(err, `/**-----------${data}-------------**/${source}`);
    });
  } else {
    cb(null, `/**----------${options.text}--------------**/${source}`);
  }

  return source;
}

module.exports = loader;
