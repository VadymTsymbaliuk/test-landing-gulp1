const {src, dest, watch, series, parallel} = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const connect = require('gulp-connect');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const favicons = require('gulp-favicons');

const appPath = {
    scss:'./app/scss/**/*.scss',
    pug: './app/index.pug',
    js: './app/js/**/*.js',
    img: './app/img/**/*.*',
    fonts: './app/fonts/**/*.*',

}

const destPath = {
    css: './dest/css',
    html: './dest',
    img: './dest/img',
    fonts: './dest/fonts',
    js:'./dest/js'
}

const jsPath = [
    './node_modules/jquery/dist/jquery.js',
    './node_modules/bootstrap/dist/js/bootstrap.js',
    './node_modules/masonry-layout/dist/masonry.pkgd.min.js',
    './app/js/script.js'
]


function buildStyles() {
    return src(appPath.scss)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle:'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(dest(destPath.css))
        .pipe(connect.reload())
};

function buildHtml() {
    return src(appPath.pug)
        .pipe(pug({
                preaty: false
            // TODO: параметри для формування html
        }))
        .pipe(dest(destPath.html))
        .pipe(connect.reload())
};

function buildJs(){
    return src(jsPath)
        .pipe(sourcemaps.init())
        .pipe(concat('script.js'))
        .pipe(minify())
        .pipe(sourcemaps.write())
        .pipe(dest(destPath.js))
        .pipe(connect.reload())
}

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

function copyFonts(){
    return src(appPath.fonts)
        .pipe(dest(destPath.fonts))
}

function makeFavicon(){
    return src('./app/img/icons/Favicon.png')
        .pipe(
            favicons({
                appName: 'My App',
                appShortName: 'App',
                appDescription: 'This is my application',
                developerName: 'Hayden Bleasel',
                developerURL: 'http://haydenbleasel.com/',
                background: '#020307',
                path: 'favicons/',
                url: 'http://haydenbleasel.com/',
                display: 'standalone',
                orientation: 'portrait',
                scope: '/',
                start_url: '/?homescreen=1',
                version: 1.0,
                logging: false,
                html: 'index.html',
                pipeHTML: true,
                replace: true,
            })
        )
        .pipe(dest('./dest/img/favicons'))
}

function watchCode(){
    watch(appPath.scss, buildStyles)
    watch(appPath.pug, buildHtml)
    watch(appPath.js, buildJs)
}

exports.build = series(makeFavicon, buildStyles , buildHtml, buildJs, copyFonts, copyImages)

exports.default = series(makeFavicon, buildStyles , buildHtml, buildJs, copyFonts, copyImages, parallel(startLocalServer, watchCode))
