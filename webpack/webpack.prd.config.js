const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          // 取代style-loader，提取css成单独的文件
          MiniCssExtractPlugin.loader,
          // 将css | less 文件中的样式插入到js文件中，里面的内容是样式字符串
          'css-loader',
          //   less-loader -> 将less文件转换成css文件
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
  mode: 'production',
};
