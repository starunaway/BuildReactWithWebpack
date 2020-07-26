const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

module.exports = {
  output: {
    // hash ：每次构建，webpack会生成唯一的hash
    // chunkhash： 根据chunk生成hash，如果打包的时候来源于同一个hash，则hash值一样
    // contenthash:根据文件内容生成hash
    filename: 'js/[name].[contenthash:10].js',
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: 'js/[name].[contenthash:10].js',
  },
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
      filename: 'css/[name].[contenthash:10].css',
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin(),
  ],

  // 可以将node_modules 中的代码单独打包成一个chunk最终输出
  // 如果有自己写的公共文件，也会自动打包成一个chunk
  optimization: {
    splitChunks: {
      chunks: 'all',
      //   一般不用填写，默认即可
      //   miniSize: 30 * 1024, // 分割的chunk的最小大小 30kb
      //   maxSize: 0, // 没有最大限制
      //   minChunks: 1, // 最少被引用过 1 次，才分割出来
    },
    // 将当前模块记录的其他模块的hash单独打包为一个文件
    // 解决：修改a文件导致b文件的contenthash变化，缓存失效
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },

  // 生产环境或自动压缩代码
  // es6模块，开启production，自动开启treeShaking
  //   需要的时候填写sideEffects，避免被误shaking （比如css）
  mode: 'production',
  //   mode: 'development',
};
