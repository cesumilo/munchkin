/**
 * @author Guillaume Robin <>
 * @file Development webpack configuration
 * @desc Created on 2019-10-15 10:57:53 pm
 * @copyright GPL-3.0
 */
const path = require('path');
// eslint-disable-next-line
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, '../src', 'index.jsx'),
  output: {
    path: path.join(__dirname, '../../server/public'),
    filename: 'index.bundle.js',
  },
  mode: 'production',
  resolve: {
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
        },
      },
      {
        test: /\.svg$/,
        use: ['babel-loader', '@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public', 'index.html'),
    }),
  ],
  optimization: {
    minimize: true,
  },
};
