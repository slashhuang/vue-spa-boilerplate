/**
 * Created by huangxiaogang on 16/8/4.
 * 上传阿里云服务器
 */
//配置文件
'use strict'
let config = require('../config.json'),
    gulp= require('gulp'),
    fse = require('fs-extra'),
    fs=require('fs'),
    confirm = require('gulp-confirm'),
    request =require('request'),
    path= require('path'),
    chalk = require('chalk');
let distFolder= path.resolve(process.cwd(),'./dist'),
    ServerEnv = config['serverEnv'],
    Project= config['project'],
    Api = config['api'];

/**
 * 处理用户输入
 */
let _InputEnv = {
    projectId:'',//服务器环境的产品ID
    versionUrl:'',//版本号获取地址
    uploadUrl:'',//上传地址
    autoOpenUrl:'',//自动开启接口地址
    env:'',//选择的上传环境
    version:'',//指定的版本号
    oldVersion:''//存在的版本号
};


gulp.task('version', function(){
    console.log(chalk.cyan('\n----------  准备上线  -----------'));
    return new Promise(function(resolve){
        gulp.src(__dirname)
            .pipe(confirm({
                question: '选择发布环境 test/beta',
                proceed: function(answer) {
                    if (answer == 'test' || answer == 'beta') {
                        _InputEnv.env=answer;
                        _InputEnv.uploadUrl = ServerEnv[answer]['serverUrl'] + Api['resourceSuffix'];
                        _InputEnv.autoOpenUrl = ServerEnv[answer]['serverUrl'] + Api['openAutoSuffix'];
                        _InputEnv.versionUrl = ServerEnv[answer]['serverUrl'] + Api['versionSuffix'];
                        _InputEnv.projectId = ServerEnv[answer]['projectId'];

                        request.post({
                            url: _InputEnv.versionUrl,
                            formData: {folderName: Project}
                        }, function optionalCallback(err, httpResponse, body) {
                            if (err || !body) {
                                console.log(chalk.red('\n-----+————+版本号获取失败---- 接口出错或网络异常-------'));
                                console.log(chalk.red('---- 上传失败,任务被迫终止 ----'));
                            } else { 
                                body = JSON.parse(body);
                                _InputEnv.oldVersion = body.data.version;
                                console.log(chalk.cyan(`--- 版本获取成功: 当前环境为${_InputEnv.env} -- 版本号为: ${_InputEnv.oldVersion}------`));
                                resolve( _InputEnv.oldVersion);
                            }
                        });
                 }
            }}))
         })
});

gulp.task('upload',function(resolve) {
    return new Promise(function(resolve) {
        gulp.src(__dirname)
            .pipe(confirm({
                question: '请输入新版本号',
                proceed: function (answer) {
                    console.log(chalk.yellow(`您输入的版本号为${answer},目前${_InputEnv.env}环境的版本号为 ${_InputEnv.oldVersion}`));
                    _InputEnv.version = answer;
                    return true;
                }
            }))
            .pipe(confirm({
                question: '是否立即发布? y/n',
                proceed: function (answer) {
                    console.log(chalk.yellow(`您为${Project}在${_InputEnv.env}环境指定的版本号为${_InputEnv.version}`));
                    if (answer == 'y') {
                        var param = {
                            url: _InputEnv.uploadUrl,
                            formData: {
                                project: _InputEnv.projectId,
                                versionType: '1',
                                version: _InputEnv.version,
                                isCoverVer: 1,
                                file: fs.createReadStream(distFolder + path.sep + `${Project}.zip`)
                            }
                        };
                        console.log(chalk.blue('\n----- 上传中,请一定要耐心，毕竟zip包很大…………'));
                        request.post(param, function optionalCallback(err) {
                            if (err) {
                                console.log(chalk.red('---- 上传失败,请查实查询dist目录是不是未成功生成zip包。任务被迫终止 ----'));
                                return true;
                            }
                            console.log(chalk.cyan(`--- 已上传至${_InputEnv.env}环境 ---`));
                            resolve();
                        });
                    } else {
                        return false;
                    }
                }
            }))
    })
});
gulp.task('autoOpen',function(){
    return gulp.src(__dirname)
        .pipe(confirm({
            question: '是否开启资源? y/n',
            proceed: function(answer) {
                if(answer=='y'){
                    var param = {
                        url: _InputEnv.autoOpenUrl,
                        formData:{
                            id:_InputEnv.projectId
                        }
                    };
                    console.log(chalk.blue('\n-----正在请求开启资源中……'));
                    request.post(param, function optionalCallback(err, httpResponse, body) {
                        if (err) {
                            console.log(chalk.red('---- 开启失败 ----'));
                            return true;
                        }
                        console.log(chalk.cyan(`---开启成功^_^---${_InputEnv.env}环境已开启 ---`));
                        request.post({
                            url: _InputEnv.versionUrl,
                            formData: {folderName: Project}
                        }, function optionalCallback(err,http,body) {
                                console.log(chalk.cyan(`--- 新的版本号为: ${JSON.parse(body).data.version}------`));
                        });
                        return true;
                    });
                }else{
                    return false;
                }
            }
        }))
});

exports.uploadTask = gulp.series('version','upload','autoOpen');