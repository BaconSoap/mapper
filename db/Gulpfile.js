var gulp = require('gulp');
var L = require('../gulp-util/localize.js').localize(__dirname);
var runTests = require('../gulp-util/testing.js').runHapiTests({ root: L('/model'), files: L('/test/**/*_spec.js') });

var files = L(["/model/**/*.js", '/test/**/*_spec.js']);


gulp.task('test-db', runTests);

gulp.task('watch-test-db', function() {
  gulp.watch(files, ['test-db']);
});


gulp.task('default-db', ['watch-test-db']);
gulp.task('default', ['default-db']);
