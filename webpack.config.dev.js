const path = require('path');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    static: path.resolve(__dirname, 'build'),
    host: '0.0.0.0',
    port: 3000,
    open: true,
    client: {
      overlay: true,
      progress: true,
    }
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // ... other options
              // DO NOT apply the plugin in production mode!
              plugins: [require.resolve('react-refresh/babel')],
            },
          },
        ]
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
    new ErrorOverlayPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve('./index.html'),
      filename: 'index.html',
      hash: true,
      favicon: path.resolve(__dirname, './src/assets/PAL.png'),
    }),
    new ReactRefreshWebpackPlugin()
  ],
  mode: 'development'
};
