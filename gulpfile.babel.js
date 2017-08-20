import gulp from 'gulp4';
import autoprefixer from 'gulp-autoprefixer';
import notify from 'gulp-notify';
import stylus from 'gulp-stylus';
import {resolver, url} from 'stylus';
import webpackStream from 'webpack-stream';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import del from 'del';
import browserSync from 'browser-sync';
import historyFallback from 'connect-history-api-fallback';
import debug from 'gulp-debug';
import iconfont from 'gulp-iconfont';
import rename from 'gulp-rename';
import consolidate from 'gulp-consolidate';
import imagemin from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
const webpack = webpackStream.webpack;
const webpackConfig = require('./webpack.config');
const bundler = webpack(webpackConfig);

gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: './public',
            middleware: [
                historyFallback()
            ]
        },
        files: [
                'public/*.css',
                'public/*.html',
                'public/*.js'
            ]
    });
});

gulp.task('clean', () => {
    return del('public');
});

gulp.task('styles', () => {
    return gulp.src('src/*.styl')
        .pipe(stylus({
            resolve_url: true,
            define: {
                url: resolver({
                    paths : ['/src/modules'],
                })
            }
        }))
        .on('error', notify.onError({
            message: "Error: <%= error.message %>",
            title: "Error in task styles"
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('public/'))
});

gulp.task('scripts', () => {
    return gulp.src('src/app.js')
        .pipe(webpackStream(require('./webpack.config.js')))
        .on("error", notify.onError(function (error) {
            this.emit('end');
            return "Message to the notifier: " + error.message;
        }))
        .pipe(gulp.dest('public/'));
});

gulp.task('html', () => {
    return gulp.src('src/*.html', {since: gulp.lastRun('html')})
        .pipe(gulp.dest('public/'));
});

gulp.task('iconfont', () => {
    return gulp.src('src/modules/Icon/glyphs/**.svg')
        .pipe(iconfont({
            fontName: 'icons',
            formats: ['ttf', 'eot', 'woff'],
            normalize: true,
            fontHeight: 1001
        }))
        .on('glyphs', function (glyphs, options) {
            var Icons = [],
                iconNames = [];

            for (var i = 0; i < glyphs.length; i++) {
                var item = {name: glyphs[i].name, icon: glyphs[i].unicode[0].charCodeAt(0).toString(16)};
                iconNames.push(glyphs[i].name);
                Icons.push(item)
            }

            gulp.src("./icons.mustache")
                .pipe(consolidate("swig", {
                    icons: Icons,
                    iconFont: options.fontName,
                    allIcons: iconNames
                }))
                .pipe(rename({suffix: '__vars', extname: '.styl'}))
                .pipe(gulp.dest("./src/modules/Icon"));
        })
        .pipe(gulp.dest('./public/fonts'));
});

gulp.task('images', () => {
    return gulp.src('src/modules/**/*.{png,jpg,svg}', {since: gulp.lastRun('images')})
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [
                imageminPngquant()
            ]
        }))
        .pipe(gulp.dest('./public/modules'))
});

gulp.task('build', gulp.series(
    'clean',
    'iconfont',
    gulp.parallel('styles', 'scripts', 'html', 'images')
));

gulp.task('watch', () => {
    gulp.watch('src/**/*.styl', gulp.series('styles'));
    gulp.watch('src/**/*.js', gulp.series('scripts'));
    gulp.watch('src/**/*.html', gulp.series('html'));
    gulp.watch('src/modules/Icon/glyphs/*.svg', gulp.series('iconfont'));
    gulp.watch('src/modules/**/*.{png,jpg,svg}', gulp.series('images'));
});

gulp.task('dev', gulp.series('build', gulp.parallel('browserSync', 'watch')));

