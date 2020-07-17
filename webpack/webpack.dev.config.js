module.exports = {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 10086,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
};
