var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');
var swPrecache = require('sw-precache');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var path = require('path');

gulp.task('default', ['vulcanize', 'generate-service-worker', 'replace', 'copy']);

gulp.task('vulcanize', function () {
    gulp.src('src/components.html')
      .pipe(vulcanize({
          stripComments: true,
          inlineScripts: true,
          inlineCss: true
      }))
      .pipe(rename('critical.html'))
      .pipe(gulp.dest('./build'));
});

gulp.task('generate-service-worker', function(callback) {
  var rootDir = 'assets';

  swPrecache.write(path.join('build', 'service-worker.js'), {
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}']
  }, callback);
});

gulp.task('replace', function() {
    gulp.src('index.html')
      .pipe(replace('src/components.html', 'critical.html'))
      .pipe(replace('/bower_components/webcomponentsjs/webcomponents-lite.min.js', 'webcomponents-lite.min.js'))
      .pipe(gulp.dest('./build'));
});

gulp.task('copy', function() {
    gulp.src('./bower_components/webcomponentsjs/webcomponents-lite.min.js').pipe(gulp.dest('./build'));
    gulp.src('./assets/**/*').pipe(gulp.dest('./build/assets'));
});
