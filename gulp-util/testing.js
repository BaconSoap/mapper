var karma = require('karma').server;
var gulp = require('gulp');
var mocha = require('gulp-spawn-mocha');

exports.runBrowserTests = function(configFile){
  return function(done) {
    karma.start({
      configFile: configFile,
      singleRun: true
    }, done);
  };
};

exports.runHapiTests = function(options) {
  return function(done) {
    return gulp.src(options.files)
      .pipe(mocha({istanbul: false}));
  }
}
