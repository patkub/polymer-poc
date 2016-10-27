var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');

gulp.task('default', function () {
    return gulp.src('index.html')
        .pipe(vulcanize({
            abspath: '',
            excludes: [],
            stripExcludes: false,
            inlineScripts: true,
            inlineCss: true,
            stripComments: true
        }))
        .pipe(gulp.dest('build'));
});
