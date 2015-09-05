var gulp        = require('gulp'),
  gutil         = require('gulp-util'),
  plumber       = require('gulp-plumber'),
  jshint        = require('gulp-jshint');

// Error
var onError = function (err) {
  gutil.beep();
  gutil.log(gutil.colors.red(err));
};

var js_files = ['./lib/**.js', './bin/*.js'];

// Default watch tasks
gulp.task('default', function () {
  // watch for js changes
  gulp.watch(js_files, ['js_lint']);
});

gulp.task('js_lint', function () {
  return gulp.src(js_files)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});