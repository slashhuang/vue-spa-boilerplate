/**
 * Created by huangxiaogang on 16/8/4.
 * 生产环境编译任务
 */


var path = require('path'),
    gulp = require('gulp'),
    argv = require('yargs').argv,
    fse = require('fs-extra'),
    gutil = require('gutil'),
    zip = require('gulp-zip'),
    chalk =require('chalk');

var gulpWebpack = require("gulp-webpack"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    WebpackNotifierPlugin = require('webpack-notifier'),
    webpackConfig = require('../webpack.conf'),
    webpack = require('webpack'),
    distFolder= path.resolve(process.cwd(),'./dist');
/**
 * 任务名称
 * 1. 打包
 * 2. 上传
 */
var zipTask = require('./zip').zipTask;

var WebpackTask = gulp.task('webpack', function() {
    console.log(chalk.blue('\n以上任务打包完毕 ', new Date().toLocaleString()));
    console.log(chalk.blue('\n---- 开始执行webpack打包任务 '));
    var minify = [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        mangle: {
            except: ['$', 'm', 'webpackJsonpCallback','_m']
        },
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
        }),
    ];
    //如果用watch模式
    if(!argv.watch){
         webpackConfig.watch = false;
     }
    webpackConfig.devtool = false ;
    webpackConfig.plugins = webpackConfig.plugins.concat(minify);
    return gulp.src(__dirname)
        .pipe(gulpWebpack(webpackConfig,null, function(err, stats) {
                var isFirst = false;
            gutil.log('[webpack]',stats.toString({
                chunks:isFirst,
                assets:isFirst,
                children:isFirst,
                colors:true
            }));
            if (!(stats.hasErrors() || stats.hasWarnings())) {
                console.log(chalk.cyan('\n-------------^__^-----编译成功-------------'));
                console.log(chalk.cyan('\nwebpack success at %s', new Date(stats.endTime).toLocaleString()));
            }
        }))
        .pipe(gulp.dest(distFolder));
});

console.log(chalk.cyan('正在处理 ====  打包文件'));
if(!argv.upload){
    fse.emptydirSync(distFolder);
    console.log(chalk.cyan('--- 已清空dist目录'));
}
gulp.task('default', gulp.series('webpack',zipTask));
gulp.task('uglify',gulp.series('webpack'));
gulp.task('zip',gulp.series('webpack',zipTask));




