const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

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
          //   less-loader -> 将less文件转换成css文件,需要提前安装less
          //   'less-loader',
          // 帮postcss找到package.json中的browserlist配置，通过配置加载指定的css兼容样式
          // 默认生产环境，是nodejs的运行环境，和webpack的mode无关
          // process.env.NODE_ENV="development"
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                //postcss 插件
                require('postcss-preset-env')(),
              ],
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    // 使用插件生成单独的文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  mode: 'production',
};
