var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');
var rename = require('gulp-rename');
var replace = require('gulp-replace');

gulp.task('default', ['vulcanize', 'replace', 'copy']);

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

gulp.task('replace', function() {
    gulp.src('index.html')
      .pipe(replace('src/components.html', 'critical.html'))
      .pipe(replace('/bower_components/webcomponentsjs/webcomponents-lite.min.js', 'webcomponents-lite.min.js'))
      .pipe(gulp.dest('./build'));
});

gulp.task('copy', function() {
    gulp.src('./bower_components/webcomponentsjs/webcomponents-lite.min.js')
      .pipe(gulp.dest('./build'));

    gulp.src('./assets/**/*')
      .pipe(gulp.dest('./build/assets'));
});
