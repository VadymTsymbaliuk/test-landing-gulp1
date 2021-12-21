const {src, dest, watch, series, parallel} = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug')
const connect = require('gulp-connect');
const sourcemaps = require('gulp-sourcemaps');
const appPath = {
    scss:'./app/scss/**/*.scss',
    pug: './app/index.pug',
    img: './app/img/**/*.*'
}
const destPath = {
    css: './dest/css',
    html: './dest',
    img: './dest/img',
}
function buildStyles() {
    return src(appPath.scss)
        .pipe(sourcemaps.init())
        .pipe(sass(/*{
            outputStyle:'compact'
        }*/).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(dest(destPath.css))
        .pipe(connect.reload())
};

function buildHtml() {
    return src(appPath.pug)
        .pipe(sourcemaps.init())
        .pipe(pug({
                preaty: true
            // TODO: параметри для формування html
        }))
        .pipe(sourcemaps.write())
        .pipe(dest(destPath.html))
        .pipe(connect.reload())
};

function startLocalServer(){
    connect.server({
        root: 'dest',
        port: 8080,
        livereload: true
    });
}
function copyImages(){
    return src(appPath.img)
        .pipe(dest(destPath.img))
}

function watchCode(){
    watch(appPath.scss, buildStyles)
    watch(appPath.pug, buildHtml)
}

exports.default = series(buildStyles , buildHtml, copyImages, parallel(startLocalServer, watchCode))
