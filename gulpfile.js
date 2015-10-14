var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var jade = require('gulp-jade');
var babel = require('gulp-babel');

gulp.task('js', function () {
  return gulp.src(['angular/app.js', 'angular/directive.js', 'angular/factory.js','angular/controller.js','angular/client.js'])
    .pipe(concat('all.min.js'))
    .pipe(babel())
    // .pipe(uglify())
    .pipe(gulp.dest('dist'));
})

gulp.task('map', function () {
  return gulp.src('angular/map/*js')
    .pipe(concat('allmap.min.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('dist/map'));
})

gulp.task('particles', function () {
  return gulp.src('angular/particles/*js')
    .pipe(concat('allparticles.min.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('dist/particles'));
})

gulp.task('index', function () {
  return gulp.src('angular/index.jade')
    .pipe(jade())
    .pipe(gulp.dest('dist'))
})

gulp.task('bower', function () {
  return gulp.src('bower_components/**')
    .pipe(gulp.dest('dist/bower_components'))
})

gulp.task('sass', function () {
  gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('partials', function () {
  gulp.src(['angular/partials/*jade'])
    .pipe(jade())
    .pipe(gulp.dest('dist/partials'))
})

gulp.task('images', function () {
  gulp.src('images/**')
    .pipe(gulp.dest('dist/images'))
})

gulp.task('watchout', function () {
  gulp.watch('angular/index.jade', ['index'])
  gulp.watch('sass/*.scss', ['sass'])
  gulp.watch('angular/*js', ['js'])
  gulp.watch('angular/map/*js', ['map'])
  gulp.watch('angular/particles/*js', ['particles'])
  gulp.watch('images/**', ['images'])
  gulp.watch('bower_components/**', ['bower'])
  gulp.watch('angular/partials/**', ['partials'])
})

gulp.task('default', ['index', 'sass', 'map', 'particles', 'images', 'js', 'bower', 'partials', 'watchout'])
