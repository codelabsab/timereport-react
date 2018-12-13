const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtendedDefinePlugin = require('extended-define-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  plugins: [
    new ExtendedDefinePlugin({
      API_ROOT: process.env.API_ROOT,
      SLACK_CLIENT_ID: process.env.SLACK_CLIENT_ID,
      SLACK_CLIENT_SECRET: process.env.SLACK_CLIENT_SECRET,
      SLACK_REDIRECT_URI: process.env.SLACK_REDIRECT_URI,
      SLACK_ROOT_API_URL: process.env.SLACK_ROOT_API_URL,
      SLACK_ACCESS_TOKEN: process.env.SLACK_ACCESS_TOKEN,
      UserPoolId: process.env.UserPoolId,
      ClientId: process.env.ClientId,
      VERSION: process.env.VERSION || 'v1'
    }),
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    })
  ]
};
