const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: './',
  },
  devServer: {
    publicPath: '/',
    contentBase: path.resolve(__dirname, 'build'),
    stats: { colors: true },
    port: 3000,
    open: true,
    inline: true,
    hotOnly: true,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(svg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./index.html'),
      filename: 'index.html',
      path: path.join(__dirname, './build/'),
      hash: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
