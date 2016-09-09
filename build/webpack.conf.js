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
//静态页面打包入口, 爱理财目前为空文件。自动加上static_pages目录
var static_files = utils.add_prefix(require('./config_folder/static_files'), './static_pages/');
//组件打包入口,爱理财目前为空文件，放入alias目录,添加components目录名称
var components_files = utils.add_prefix(require('./config_folder/component_files'), './components/');
//业务打包入口
var main_files = require('./config_folder/main_files');
//设定别名
var moduleAlias = require('./config_folder/alias');
var common = {
  common: [
    'zepto',
    './global/lib/zepto/callbacks.js',
    './global/lib/zepto/deferred.js',
    './global/lib/zepto/selector.js',
    'vue',
    'vue-router',
    'vue-resource',
    'underscore',
    'ES6shim',
    'store',
    'global',
    './global/module/jps.js',
    'iwjwLog',
    'vueCommon',
    'vueComponents',
    'iwjw',
    './global/module/reset.css',
    './global/module/arrow.css',
    './global/iconfont/iconfont.css',
    './module/common.scss',
    './module/footer.scss',
    'vux/vux.css'
  ],
  //微信理财号safe.js相关
  safe: [
    './static_pages/safe/wx.js',
    './static_pages/safe/pagedata.js',
    './static_pages/safe/kzPlayer.js',
    './static_pages/safe/app.js'
  ]
};
var entry_file = extend(
  main_files,
  static_files,
  common
);
let version = '5.4.3'
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
    publicPath: 'http://127.0.0.1/iwjw-p2p-weixin/'
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
      },
      {
        context: 'global/lib/swfupload',
        from: '**/*',
        to: 'swfupload'
      }
    ]),
    new webpack.ProvidePlugin({
      _: 'underscore',
      template: 'template',
      global: 'global',
      // bridge: 'bridge',
      store: 'store',
      FastClick: 'fastclick',
      // dialog: 'dialog',
      iwjw: 'iwjw',
      // smallnote: 'smallnote',
      // h5Common: 'h5Common',
      vueCommon: 'vueCommon',
      weixin: 'weixin',
      Vue: 'vue',
      VueRouter: 'vue-router',
      VueResource: 'vue-resource'
    }),
    // new webpack.optimize.DedupePlugin(),
    new WebpackNotifierPlugin(
      {
        title: '爱理财微信号Webpack 编译成功',
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
  // vue: {
  //     loaders: {
  //         css: ExtractTextPlugin.extract('style-loader', 'css-loader'),
  //         // you can also include <style lang="less"> or other langauges
  //         less: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
  //         sass: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
  //     }
  // },
  vue: {
    loaders: {
      css: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      // you can also include <style lang="less"> or other langauges
      less: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
      sass: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
    }
  }
};
