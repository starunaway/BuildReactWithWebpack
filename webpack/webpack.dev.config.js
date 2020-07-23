module.exports = {
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          //创建style 标签，将js中的css提取出来，插入到style标签中
          'style-loader',
          // 将css | less 文件中的样式插入到js文件中，里面的内容是样式字符串
          'css-loader',
          //   less-loader -> 将less文件转换成css文件
        ],
      },
    ],
  },

  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 10086,
    hot: true,
    open: true,
    historyApiFallback: true,
  },

  mode: 'development',
};
