const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')

const vendors = [
    'vue', 
		'element-datepicker',
		'axios',
		'vue-router'
];

module.exports = {
  entry: {
    common: vendors,
  },
  // 生成common.js
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    library: '[name]_library',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    // 首先清空整个dist
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '..')
    }),
    new webpack.DllPlugin({
      // 指定路径，依照json文件生成common.js
      path: path.join(__dirname, '../dist', '[name]-manifest.json'),
      // 指定依赖库的名称
      name: '[name]_library'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      output: false,
      compress: {
        unused: true,
        dead_code: true,
        pure_getters: true,
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        comparisons: true,
        sequences: true,
        evaluate: true,
        join_vars: true,
        if_return: true
      },
      comments: false,
      minimize: true
    })
  ]
}
