/**
 * Created by huangxiaogang on 16/8/3.
 * webpack打包相关
 */
'use strict';
var webpack = require("webpack"),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  WebpackNotifierPlugin = require('webpack-notifier'),
  utils = require('./util'),
  extend = require('extend'),
  path = require('path'),
  pkgJSON = require('../package.json');
var main_files = require('./config_folder/main_files');
//设定别名
var moduleAlias = require('./config_folder/alias');
var common = {
  common: [
    'vue',
    'vue-router',
    'vue-resource',
    'ES6shim',
    'vueCommon',
    'vueComponents',
    './global/module/reset.css',
    './global/iconfont/iconfont.css'
  ]
};
var entry_file = extend(
  main_files,
  common
);
//webpack配置文件
module.exports = {
  watch: true,
  entry: entry_file,
  debug: true,
  devtool: 'source-map',
  output: {
    path: path.resolve(process.cwd(), 'dist/'),
    filename: '[name].js',
    chunkFilename: '[name]_' + pkgJSON['version'] + '.js',
    publicPath: 'http://127.0.0.1:8000'
  },
  resolve: {
    alias: utils.addResolve(extend(moduleAlias, components_files))
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'html',
        to: 'html'
      },
      {
        context: 'global/img',
        from: '**/*',
        to: 'img/common'
      },
      {
        from: 'img',
        to: 'img'
      }
    ]),
    new webpack.ProvidePlugin({
      vueCommon: 'vueCommon',
      Vue: 'vue',
      VueRouter: 'vue-router',
      VueResource: 'vue-resource'
    }),
    // new webpack.optimize.DedupePlugin(),
    new WebpackNotifierPlugin(
      {
        title: 'Webpack 编译成功',
        contentImage: path.resolve(process.cwd(), './global/img/logo.png'),
        alwaysNotify: true
      }),
    new ExtractTextPlugin("[name].css"),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: Infinity
    })
  ],
  module: {
    loaders: [{
      test: /\.js[x]?$/,
      exclude: /(node_modules)|(global\/lib\/)/,
      loader: 'babel-loader'
    },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap&-convertValues')
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-convertValues!less-loader')
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap&-convertValues!sass-loader?sourceMap')
      }, {
        test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg|swf)$/,
        loader: "file-loader?name=[name]_[sha512:hash:base64:7].[ext]"
      }, {
        test: /\.html/,
        loader: "html-loader?" + JSON.stringify({
          attrs: false,
          minimize: true,
          removeAttributeQuotes: false,
          collapseInlineTagWhitespace: true,
          preserveLineBreaks: false,
          conservativeCollapse: false,
          ignoreCustomFragments: [{
            source: '\\s?\\{\\{[\\s\\S]*?\\}\\}\\s?'
          }],
          customEventAttributes: [/^\@/]
        })
      },
      {
        test: /\.json$/,
        loader: "json"
      }
    ]
  },
  vue: {
    loaders: {
      css: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      // you can also include <style lang="less"> or other langauges
      less: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
      sass: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
    }
  }
};
