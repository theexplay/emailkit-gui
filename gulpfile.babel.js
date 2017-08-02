import gulp from 'gulp4';
import autoprefixer from 'gulp-autoprefixer';
import notify from 'gulp-notify';
import stylus from 'gulp-stylus';
import { resolver } from 'stylus';
import del from 'del';
import webpackStream from 'webpack-stream';
import named from 'vinyl-named';
// import babel from 'babel-cli';
import browserify from 'browserify';


const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
const webpack = webpackStream.webpack;

gulp.task('styles', () => {
  return gulp.src('src/*.styl')
    .pipe(stylus({
      define: {
        url: resolver()
      }
    }))
    .on('error', notify.onError())
    .pipe(gulp.dest('public'))
});

