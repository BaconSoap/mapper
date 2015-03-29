var gulp = require('gulp');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var ngHtml2Js = require("gulp-ng-html2js");
var minifyHtml = require("gulp-minify-html");
var L = require('../../gulp-util/localize.js').localize(__dirname);
var runTests = require('../../gulp-util/testing.js').runBrowserTests(L('/js/karma.conf.js'));

gulp.task('test-www-public', ['scripts-www-public'], runTests);
gulp.task('just-test-www-public', runTests);

gulp.task('scripts-www-public', function() {
  var tsResult = gulp.src(L('/js/src/**/*.ts')).pipe(ts({
    declarationFiles: true,
    sortOutput: true
  }));

  return tsResult.js.pipe(concat('app.js')).pipe(gulp.dest(L('/js/build/')))
});

gulp.task('views-www-public', function() {
  return gulp.src(L('/js/src/**/*.tmpl.html'))
          .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
           }))
          .pipe(ngHtml2Js({
            moduleName: "mapper.views",
            stripPrefix: "components/",
            rename: function(templateUrl, templateFile) {
              return templateUrl.replace('.tmpl.html', '').replace('components/', '');
            }
          }))
          .pipe(concat("views.min.js"))
          .pipe(gulp.dest("public/js/build"));
});

gulp.task('default-www-public', function() {
  gulp.watch(L('/js/src/**/*.ts'), ['scripts-www-public', 'test-www-public']);
  gulp.watch(L('/js/test/**/*.js'), ['just-test-www-public']);
  gulp.watch(L('/js/src/**/*.tmpl.html'), ['views-www-public']);
});

gulp.task('default', ['default-www-public']);
