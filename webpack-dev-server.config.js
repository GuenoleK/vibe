const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const homePath = path.resolve(__dirname, 'app');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
  // Entry points to the project
  entry: [
    'webpack/hot/dev-server', 'webpack/hot/only-dev-server', 'babel-polyfill', path.join(__dirname, 'app/app.tsx')
  ],
  // Server Configuration options
  devServer: {
    contentBase: 'app/www', // Relative directory for base of server
    devtool: 'eval',
    hot: true, // Live-reload
    inline: true,
    port: 3000, // Port Number
    host: 'localhost', // Change to '0.0.0.0' for external facing server
  },
  devtool: 'eval',
  output: {
    path: buildPath, // Path of output file
    filename: 'app.js'
  },
  plugins: [
    // Enables Hot Modules Replacement
    new webpack.HotModuleReplacementPlugin(),
    // Allows error warnings but does not stop compiling.
    new webpack.NoErrorsPlugin(),
    // Moves files
    new TransferWebpackPlugin([
      {
        from: 'www'
      }
    ], path.resolve(__dirname, 'app'))
  ],
  module: {
    loaders: [
      {
        // React-hot loader and
        test: /\.js$/, // All .js files
        loaders: ['babel-loader'],
        exclude: [nodeModulesPath]
      }, {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }, {
        test: /\.css$/,
        loaders: ['style', 'css', 'sass']
      }, {
        test: /\.tsx?$/,
        loaders: [
          'babel-loader', 'ts-loader'
        ],
        exclude: [nodeModulesPath]
      }, {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [nodeModulesPath]
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  resolve: {
    extensions: ["", ".tsx", ".ts", ".jsx", ".js"]
  }
};

module.exports = config;
