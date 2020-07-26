const path = require('path');

module.exports = {
  output: {
    // hash ：每次构建，webpack会生成唯一的hash
    // chunkhash： 根据chunk生成hash，如果打包的时候来源于同一个hash，则hash值一样
    // contenthash:根据文件内容生成hash
    filename: 'js/[name].[hash:10].js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          //创建style 标签，将js中的css提取出来，插入到style标签中
          //   style-loader 实现了 HMR 功能，开发环境使用
          'style-loader',
          // 将css | less 文件中的样式插入到js文件中，里面的内容是样式字符串
          'css-loader',
          //   less-loader -> 将less文件转换成css文件
        ],
      },
    ],
  },

  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist',
    compress: true,
    port: 10086,
    hot: true,
    open: true,
    historyApiFallback: true,
    // 不显示启动服务器时的日志
    clientLogLevel: 'none',
    // 除了基本启动信息，其他的都不显示
    quiet: true,
  },

  mode: 'development',
};
