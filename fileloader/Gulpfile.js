var gulp = require('gulp');
var L = require('../gulp-util/localize.js').localize(__dirname);
var runTests = require('../gulp-util/testing.js').runHapiTests({ root: L('/model'), files: L('/test/**/*_spec.js') });

var files = L(["/model/**/*.js", '/test/**/*_spec.js']);


gulp.task('test-fileloader', runTests);

gulp.task('watch-test-fileloader', function() {
  gulp.watch(files, ['test-fileloader']);
});

gulp.task('default-fileloader', ['watch-test-fileloader']);
gulp.task('default', ['default-fileloader']);
