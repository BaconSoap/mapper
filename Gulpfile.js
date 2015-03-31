var gulp = require('gulp');
require('./www/Gulpfile.js');
require('./db/Gulpfile.js');
require('./fileloader/Gulpfile.js');

gulp.task('test', ['test-www', 'test-db', 'test-fileloader'])
gulp.task('default', ['default-www', 'default-db', 'default-fileloader']);
