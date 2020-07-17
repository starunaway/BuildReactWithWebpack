const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

console.log('111111111111111111111111', __dirname);

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
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './webpack/index.html',
    }),
  ],
};
