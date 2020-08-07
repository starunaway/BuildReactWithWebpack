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
        test: /\.(js)$/,
        use: [
          {
            loader: `${path.resolve(__dirname, '../loader/babel-loader.js')}`,
            options: {presets: ['@babel/preset-env']},
          },
        ],
      },
      {
        test: /\.(js)$/,
        use: [
          {
            loader: `${path.resolve(__dirname, '../loader/banner-loader.js')}`,
            options: {
              text: '啦啦啦',
              //   filename: path.resolve(__dirname, '../src/index.js'),
            },
          },
        ],
      },
      {
        test: /\.(jpg)$/,
        use: [
          {
            loader: path.resolve(__dirname, '../loader/url-loader.js'),
            options: {
              limit: 2000 * 1024,
            },
          },
        ],
      },
      {
        test: /\.(less)$/,
        use: [
          path.resolve(__dirname, '../loader/style-loader.js'),
          path.resolve(__dirname, '../loader/less-loader.js'),
        ],
      },
    ],
  },
  devtool: 'source-map',
  plugins: [new P()],
  mode: 'development',
};
