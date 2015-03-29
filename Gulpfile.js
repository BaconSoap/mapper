var gulp = require('gulp');
require('./www/Gulpfile.js');
require('./db/Gulpfile.js');

gulp.task('test', ['test-www', 'test-db'])
gulp.task('default', ['default-www', 'default-db']);
