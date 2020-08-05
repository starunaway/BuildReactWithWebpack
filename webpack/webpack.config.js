// const merge = require('webpack-merge');
// const baseConfig = require('./webpack.base.config');
// const devConfig = require('./webpack.dev.config');
// const prdConfig = require('./webpack.prd.config');

// module.exports = (env, argv) => {
//   const config = process.env.NODE_ENV === 'development' ? devConfig : prdConfig;
//   return merge(baseConfig, config);
// };

const path = require('path');

class P {
  apply(compiler) {
    console.log('start');
    compiler.hooks.emit.tap('emit', function () {
      console.log('emit event');
    });
  }
}

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.(less)$/,
        use: [
          path.resolve(__dirname, '../loader/style-loader.js'),
          path.resolve(__dirname, '../loader/less-loader.js'),
        ],
      },
    ],
  },

  plugins: [new P()],
  mode: 'development',
};
