var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var jade = require('gulp-jade');
var babel = require('gulp-babel');

gulp.task('js', function () {
  return gulp.src('angular/*js')
    .pipe(concat('all.min.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
})

gulp.task('index', function () {
  return gulp.src('angular/index.jade')
    .pipe(jade())
    .pipe(gulp.dest('dist'))
})

gulp.task('sass', function () {
  gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watchout', function () {
  // gulp.watch('sass/*.scss', ['sass'])
  // gulp.watch('css/assets/*', ['assets'])
  // gulp.watch(['js/*js', 'index.html'], ['fingerprint'])
  gulp.watch('angular/index.jade', ['index']);
})

gulp.task('default', ['index', 'sass', 'js', 'watchout'])
