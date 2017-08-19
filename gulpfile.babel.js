import gulp from 'gulp4';
import autoprefixer from 'gulp-autoprefixer';
import notify from 'gulp-notify';
import stylus from 'gulp-stylus';
import {resolver} from 'stylus';
import webpackStream from 'webpack-stream';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import del from 'del';
import browserSync from 'browser-sync';
import historyFallback from 'connect-history-api-fallback';
import debug from 'gulp-debug';

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
        .pipe(stylus())
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

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('styles', 'scripts', 'html')
));

gulp.task('watch', () => {
    gulp.watch('src/**/*.styl', gulp.series('styles'));
    gulp.watch('src/**/*.js', gulp.series('scripts'));
    gulp.watch('src/**/*.html', gulp.series('html'));
});

gulp.task('dev', gulp.series('build', gulp.parallel('browserSync', 'watch')));

