/**
 * Created by Zjp on 2017/06/16.
 */
'use strict';
//---------------------------------引用各种包-------------------------------------------
//const utils = require('util');
//---------------------------------设置各种变量------------------------------------------
const pCwd = process.cwd();    //返回运行当前脚本的工作目录的路径
const src = pCwd + '/src';     //源码路径
const dist = pCwd + '/dist';   //编译生成后的代码路径
//const externalsJS = pCwd + '/externalsJS';
const minimist = require('minimist');   //命令行参数解析工具,用于解析gulp传递参数
const argv = minimist(process.argv.slice(2), {  //npm run deploy-dev -- --url /dsf/sd.js
    string: ['env', 'url'],
    default: {env: process.env.NODE_ENV || 'production'}
});
//---------------------------------加载webpack配置-----------------------------------------
const webpackConf = {
    test: require('./webpack.config.test.js'),              //测试环境的webpack配置
    development: require('./webpack.config.js'),            //开发环境的webpack配置
    production: require('./webpack.config.production.js'),  //正式环境的webpack配置
};
//---------------------------------服务器配置----------------------------------------------
const serverConf = {
    test: {                        //测试环境服务器
        host: '192.168.56.129',
        remotePath: '/data/website/website1',
        user: 'root',
        pass: 'password'
    },
    development: {                 //开发环境服务器
        host: '183.63.6.116',
        remotePath: '/new_prj_test',
        user: 'zjp',
        pass: 'zjp',
    },
    production: {                 //正式环境服务器
        host: '19.88.211.235',
        remotePath: 'G:\\new_prj_test',
        user: 'administrator',
        pass: 'FmEe*&ahUnw'
    }
};
//---------------------------------gulp任务------------------------------------------------
const gulp = require('gulp');
const gutil = require('gulp-util');
gulp.task('hint', function () {                  //校验JS代码的gulp任务
    const jshint = require('gulp-jshint');
    const stylish = require('jshint-stylish');
    return gulp.src([
        '!' + src + '/utilLib/**/*.js',
        src + '/*.js'
    ])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});
gulp.task('clean', ['hint'], function () {           //删除之前编译好的代码的gulp任务
    const clean = require('gulp-clean');
    return gulp.src(dist, {read: true}).pipe(clean());
});
gulp.task('pack', ['clean'], function (done) {     //运行webpack的gulp任务
    const webpack = require('webpack');
    const _conf = webpackConf[argv.env] ? webpackConf[argv.env] : webpackConf["development"];
    webpack(_conf, function (err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({colors: true}));
        done();
    });
});
gulp.task('deploy', function () {                //发布编译后的代码到服务器的gulp任务
    const ftp = require('gulp-ftp');
    const _conf = serverConf[argv.env] ? serverConf[argv.env] : serverConf["development"];
    return gulp.src([
        dist + '/**']
    )
        .pipe(ftp(_conf))
        .pipe(gutil.noop());
});
gulp.task('default', ['pack']);                 //默认的gulp任务是：运行webpack