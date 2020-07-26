const {resolve} = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    jquery: ['jquery'],
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, '../dll'),
    library: '[name].[hash:10]', // 打包的库里面向外暴露出去的内容叫什么
  },
  plugins: [
    // 打包生成manifest.json ——> 提供映射
    new webpack.DllPlugin({
      name: '[name].[hash:10]',
      path: resolve(__dirname, '../manifest.json'),
    }),
  ],
};
