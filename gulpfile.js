

var gulp  = require('gulp'),
     jshint = require('gulp-jshint'),
     sass   = require('gulp-sass');

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: 35729}));
  app.use(express.static(__dirname));
  app.listen(8080, '0.0.0.0');
});

var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
    tinylr.listen(35729);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}


gulp.task('jshint', function() {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});


gulp.task('build-css', function() {
  return gulp.src('scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
   gulp.watch('js/*.js', ['jshint']);
   gulp.watch('scss/**/*.scss', ['build-css']);
   gulp.watch('js/*.js', notifyLiveReload);
   gulp.watch('*.html', notifyLiveReload);
   gulp.watch('**/*.html', notifyLiveReload);
   gulp.watch('css/*.css', notifyLiveReload);
});




gulp.task('default', ['watch', 'build-css', 'express', 'livereload']);