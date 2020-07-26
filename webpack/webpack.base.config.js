const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    // hash ：每次构建，webpack会生成唯一的hash
    // chunkhash： 根据chunk生成hash，如果打包的时候来源于同一个hash，则hash值一样
    // contenthash:根据文件内容生成hash
    filename: 'js/[name].[contenthash:10].js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.js', 'jsx'],
    mainFiles: ['index'],
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@action': path.resolve(__dirname, '../src/action'),
      '@app': path.resolve(__dirname, '../src/app'),
      '@models': path.resolve(__dirname, '../src/models'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@routes': path.resolve(__dirname, '../src/routes'),
      '@utils': path.resolve(__dirname, '../src/utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        // 处理图片资源
        loader: 'url-loader',
        options: {
          // 小于 8kb，转成base64
          limit: 8 * 1024,
          // url-loader 使用的是ES6模块化解析,html-loader 是commonjs,现在可以不打开
          //   esModule: false,
          //    [hash:10]: 取打包后图片hash的前10位
          // [ext] 取原来文件的扩展名
          name: '[hash:10].[ext]',
          // 单独将改类型的资源输出到指定目录
          outputPath: 'imgs',
        },
      },
      {
        test: /\.html$/,
        // 处理html文件中引入的img图片（负责引入img，从而能被url-loader处理）
        loader: 'html-loader',
      },
      {
        // 打包其他资源
        test: /\.(|ttf|woff|eot|woff2)$/,
        // 除了 js css html 之外的其他文件，要排除什么，就在下面加上
        // exclude: /\.(js|css|html|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      // 不用加了，新版本（当前）会自动处理
      //   minify: {
      // // 移除空格
      // collapseWhitespace: true,
      // // 移除注释
      // removeComments: true,
      //   },
    }),
  ],
};
