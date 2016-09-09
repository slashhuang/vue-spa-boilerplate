/**
 * Created by huangxiaogang on 16/8/4.
 * 开发环境配置
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
    distFolder= path.resolve(process.cwd(),'./dist');

var WebpackTask = gulp.task('webpack',function() {
    console.log(chalk.blue('\n开始执行webpack任务 ', new Date().toLocaleString()));
    var initEntry = webpackConfig.entry;
    var  finalEntry = {};
    if(argv.entry){
        argv.entry.split(',').forEach(function(val){
            finalEntry[val]= initEntry[val];
        });
        finalEntry['common']=initEntry['common'];
        webpackConfig.entry = finalEntry
    }
    return gulp.src(__dirname)
        .pipe(gulpWebpack(webpackConfig,null, function(err, stats) {
            var isFirst=false;
            gutil.log('[webpack]',stats.toString({
                chunks:isFirst,
                assets:isFirst,
                children:isFirst,
                colors:true
            }));
            if (!(stats.hasErrors() || stats.hasWarnings())) {
                console.log(chalk.cyan('\n-------------^__^-----编译成功-------------'));
                console.log(chalk.cyan('\nwebpack success at ', new Date(stats.endTime).toLocaleString()));
            }
        }))
        .pipe(gulp.dest(distFolder));
});

console.log(chalk.cyan('you are now at  ====  ')+chalk.red(' development'));
fse.emptydirSync(distFolder);
console.log(chalk.cyan('----removed dist folder')+chalk.red('== begin webpack compilation'));
gulp.task('default', gulp.series('webpack'));