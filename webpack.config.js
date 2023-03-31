const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset'
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./index.html'),
      filename: 'index.html',
      hash: true,
      favicon: path.resolve(__dirname, './src/assets/PAL.png'),
    }),
  ],
  mode: 'production'
};
