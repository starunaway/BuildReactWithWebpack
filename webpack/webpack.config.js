const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const devConfig = require('./webpack.dev.config');
const prdConfig = require('./webpack.prd.config');

module.exports = (env, argv) => {
  const config = process.env.NODE_ENV === 'development' ? devConfig : prdConfig;
  return merge(baseConfig, config);
};
