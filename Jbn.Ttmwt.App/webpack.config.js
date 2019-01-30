const path = require('path');
const HWP = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, '/src/index.js'),
  output: {
    filename: 'build.js',
    path: path.join(__dirname, '/dist'),
    publicPath: '/'
  },
  module:{
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/ }
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins:[
    new HWP({ template: path.join(__dirname, '/src/index.html') })
  ]
}