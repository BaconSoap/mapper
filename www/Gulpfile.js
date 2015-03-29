var gulp = require('gulp');
var L = require('../gulp-util/localize.js').localize(__dirname);
var runTests = require('../gulp-util/testing.js').runHapiTests({ root: L('/plugins/'), files: L('/test/**/*_spec.js') });

require('./public/Gulpfile.js');

var files = L(["/app.js", '/server.js', "/plugins/**/*.js", '/test/**/*_spec.js']);

gulp.task('test-www', runTests);

gulp.task('watch-test-www', function() {
  gulp.watch(files, ['test-www']);
});

gulp.task('default-www', ['default-www-public', 'watch-test-www'])
gulp.task('default', ['default-www']);
