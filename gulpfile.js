var gulp        = require('gulp'),
  gutil         = require('gulp-util'),
  plumber       = require('gulp-plumber'),
  source        = require('vinyl-source-stream'),
  browserify    = require('browserify'),
  jshint        = require('gulp-jshint');

// Error
var onError = function (err) {
  gutil.beep();
  gutil.log(gutil.colors.red(err));
};

// Default watch tasks
gulp.task('default', function () {
  // watch for js changes
  gulp.watch('./_src/*.js', ['js']);
});

gulp.task('js', ['js_lint', 'js_browserify']);

gulp.task('js_lint', function () {
  return gulp.src('./_src/*.js')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('js_browserify', function () {
  return browserify('./_src/app.js', {
    debug: argv.dev, // to output source maps for easy debuging run task with --dev flag
  })
    .bundle()
    .pipe(source('app.min.js'))
    .pipe(gulp.dest('./_dist/'));
});