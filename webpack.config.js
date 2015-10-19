var path = require('path');
var webpack = require('webpack');

var buildEnv = process.env.BUILD || 'dev';

module.exports = {
  entry: {
    create: './src/entry/create.js',
    draft: './src/entry/draft.js'
  },
  output: {
    filename: '[name]_app.js',
    path: path.join(__dirname, 'app/assets'),
    publicPath: 'http://localhost:8080/assets' // Required for webpack-dev-server
  },
  resolve: {
    root: [
      __dirname
    ],
    extensions: ['', '.js']
  },
  node: {
    fs: "empty"
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel?stage=2', exclude: /node_modules/ },
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
