require('coffee-script/register');

var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var cjsx = require('gulp-cjsx');
var sass = require('gulp-sass');
var del = require('del');

gulp.task('clean', function(cb) {
  del(['public/**/*']);
  del(['prod-public/**/*']);
  cb();
});

gulp.task('coffee', function() {
  gulp.src('app/scripts/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./public/assets/scripts'));
});

gulp.task('spec-coffee', function() {
  gulp.src('spec/scripts/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./public/spec/scripts'))
});

gulp.task('cjsx', function() {
  gulp.src('app/scripts/views/**/*.cjsx')
    .pipe(cjsx({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./public/assets/scripts/views/'));
});

gulp.task('sass', function () {
  gulp.src('./app/styles/**.sass')
    .pipe(sass({indentedSyntax: true}))
    .pipe(gulp.dest('./public/assets/styles'));
});

gulp.task('js-libs', function () {
  gulp.src('./vendor/**.js')
    .pipe(gulp.dest('./public/libs'));
});

gulp.task('html-files', function () {
  gulp.src('./app/**.html')
    .pipe(gulp.dest('./public'));
});

gulp.task('spec-files', function () {
  gulp.src('./spec/**/*.html')
    .pipe(gulp.dest('./public'));
  gulp.src('./spec/libs/**/*')
    .pipe(gulp.dest('./public/libs'));
});

gulp.task('build-development', ['coffee', 'spec-coffee', 'cjsx', 'sass', 'js-libs', 'html-files', 'spec-files']);
gulp.task('build-production', ['coffee', 'spec-coffee', 'cjsx', 'sass', 'js-libs', 'html-files']);

gulp.task('default', ['build-development']);

// node r.js -o require.config --keepBuildDir=true
