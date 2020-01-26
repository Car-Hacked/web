var gulp = require("gulp");
var sass = require('gulp-sass');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var neat = require("node-neat").includePaths;
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var gutil = require("gulp-util");
var ghPages = require('gulp-gh-pages');

gulp.task('bundle', function () {
  return browserify({
    debug: true,
    entries: './src/js/app.js'
  })
    .require('normalize-css')
    .transform(babelify, { presets: ["@babel/preset-env", "@babel/preset-react"] })
    .bundle()
    .on('error', (error) => { console.error(error.name + ":", error.message, error.codeFrame); })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('sass', function () {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass({ includePaths: [neat] }).on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});


gulp.task('watch', function () {
  gulp.watch('./src/js/**/*.js', gulp.parallel('bundle'));
  gulp.watch('./src/scss/*.scss', gulp.parallel('sass'));
  return gulp.watch(['./src/*', '!./src/js/**/*'], gulp.parallel('copy'));
});

gulp.task('copy', function () {
  return gulp.src(['./src/**/*', '!./src/js', '!./src/scss', '!./src/react/*'])
    .pipe(gulp.dest('dist'));
});


gulp.task('deploy', function () {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});


gulp.task('default', gulp.parallel(
  'watch',
  'bundle',
  'sass',
  'copy'));