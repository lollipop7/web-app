/**
 * Created by lulj on 2017/3/9.
 */
const fs = require('fs'),
    join = require('path').join,
    gulp = require('gulp'),
    ejs = require('ejs'),
    $ = require('gulp-load-plugins')(),
    //src folder
    srcDir = join(__dirname,'src'),
    //ejs folder
    ejsDir = join(srcDir,'ejs'),
    //scss folder
    sassDir = join(srcDir,'sass'),
    //www folder
    wwwDir = join(srcDir, 'www'),
    _ = require('lodash');

// config
let ejsFileName = 'index';
/*
 process.argv是返回的一个数组，使用process.argv[2]获取的就是下表是2的some。
 process.argv.slice首先需要理解slice，process.argv.slice(2)获取的就是下表从2开始拷贝出来的一个数组['some', 'param']。
 */
/*
 process.argv
 返回当前命令行指令参数 ，但不包括node特殊(node-specific) 的命令行选项（参数）。
 常规第一个元素会是 'node'， 第二个元素将是 .Js 文件的名称。接下来的元素依次是命令行传入的参数：
 */
let fileArray = ['corpdetail','duty','index','jobinfo','resume','send-interview','cancel-interview','corprecru','news'];
//compile ejs to html
gulp.task('tpl',() => {
    _.each(fileArray,ejsFileName=>{
        let templateStr = fs.readFileSync(join(ejsDir,`${ejsFileName}/${ejsFileName}.ejs`),'utf8'),
            htmlTemplate = ejs.render(templateStr,{
                filename:join(ejsDir,`${ejsFileName}/head.ejs`),
                data:_.extend({},require(join(srcDir,`data/data.js`)),{filename:ejsFileName})
            });
        let destDir = '';
        switch(`${ejsFileName}`){
            case `send-interview`:
                destDir = `www/interview/sendInterView/detail.html`;
                break;
            case `cancel-interview`:
                destDir = `www/interview/cancelInterView/cancel.html`;
                break;
            case `corprecru`:
                destDir = `www/corprecru/dream.html`;
                break;
            default:
                destDir = `www/${ejsFileName}.html`;
        };
        fs.writeFile(
            join(srcDir, destDir)
            ,htmlTemplate,err => {
                if(err) throw new Error(err);
                console.log(`${ejsFileName} is saved`);
            });

    });

});
//compile watch
gulp.task('tpl:watch', () => {
   gulp.watch(join(ejsDir,`**/*.ejs`),['tpl']);
});
//compile sass to css
gulp.task('sass',() => {
    fileArray.forEach(ejsFileName=>{
        return gulp.src(join(sassDir,`${ejsFileName}/${ejsFileName}.scss`))
        //初始化
            .pipe($.sourcemaps.init())
            .pipe($.sass().on('error',$.sass.logError))
            //生成sourcemap文件
            .pipe($.sourcemaps.write())
            .pipe(gulp.dest(join(srcDir,'www/css/')));
    });
});
//sass watch
gulp.task('sass:watch',()=> {
    gulp.watch(join(sassDir,'**/*.scss'),['sass']);
});

/**
 * 图片base64
 */
gulp.task('base64', () => {
    return gulp.src(join(wwwDir, 'css', '*.css'))
        .pipe($.base64({
            extensions: ['svg', 'png', '\.jpg#datauri$/i'],
            maxImageSize: 15*1024,
            deleteAfterEncoding: false,
            debug: true
        }))
        .pipe(gulp.dest('./src/www/css'));
});

//compile base64 watch
gulp.task('base64:watch', () => {
    gulp.watch(join(wwwDir, 'css', 'index.css'), ['base64'])
});

//js
gulp.task('js',()=> {
    fileArray.forEach(ejsFileName=>{
        return gulp.src(join(srcDir,`script/${ejsFileName}.js`))
            .pipe($.babel())
            .pipe(gulp.dest(join(srcDir,'www/js/')));
        console.log(`js is saved`);
    })

});
//sass watch
gulp.task('js:watch',()=> {
    gulp.watch(join(srcDir,'script/*.js'),['js']);
});

//web server
gulp.task('ws',['sass:watch','tpl:watch','js:watch','base64:watch'],() => {

});

var browserSync = require('browser-sync').create();
gulp.task('watch:html:css:js', function () {
    browserSync.init({
        files: ['**/*.html','**/*.css','**/*.js'],
        server: {
            baseDir: './src/www/'
        },
        ghostMode: {
            click: true,
            scroll: true
        },
        logPrefix: "real-time",
        browser: ['chrome'],
        port:8080
    })
});




