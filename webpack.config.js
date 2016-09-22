const webpack = require('webpack');

module.exports = {
  entry: './index.js',
  target: 'web',
  output: {
    path: './bin',
    filename: 'dbc.hack4dk.bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    })
  ]
}
