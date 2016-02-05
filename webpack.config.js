var path = require('path');
var webpack = require('webpack');

var isProdBuild = process.argv.indexOf('-p') !== -1;

var envDefPlugin = new webpack.DefinePlugin({
  __DEBUG__: JSON.stringify(!isProdBuild),
  __RELEASE__: JSON.stringify(isProdBuild),
  'process.env.NODE_ENV': isProdBuild ? '"production"' : '"development"'
});

module.exports = {
  entry: {
    home: './src/home/entry.js',
    create: './src/create/entry.js',
    draft: './src/draft/entry.js'
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
    extensions: ['', '.js', '.jsx', '.raw.less']
  },
  node: {
    fs: "empty"
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel?stage=2', exclude: /node_modules/ },
      { test: /\.raw\.less$/, loader: 'raw!less'},
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), envDefPlugin]
};
