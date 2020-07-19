const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
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
        test: /\.(less|css)$/,
        use: [
          //创建style 标签，将js中的css提取出来，插入到style标签中
          'style-loader',
          // 将css | less 文件中的样式插入到js文件中，里面的内容是样式字符串
          'css-loader',
          //   less-loader -> 将less文件转换成css文件
        ],
      },
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
        },
      },
      {
        test: /\.html$/,
        // 处理html文件中引入的img图片（负责引入img，从而能被url-loader处理）
        loader: 'html-loader',
      },
      {
        // 打包其他资源
        //   test: /\.(|||)$/,
        // 除了 js css html 之外的其他文件，要排除什么，就在下面加上
        exclude: /\.(js|css|html)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './webpack/index.html',
    }),
  ],
};
