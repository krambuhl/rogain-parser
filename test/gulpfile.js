var test = require('tape');
var parser = require('../dist');

var through = require('through2');
var gulp = require('gulp');

gulp.task('default', function(t) {
  return gulp.src('./fixtures/*.rogain')
    .pipe(through.obj((file, enc, next) => {
      parser(file.contents.toString())
        .then(function(tree) {
          file.path = file.path.replace('.rogain', '.json');
          file.contents = new Buffer(JSON.stringify(tree, null, 2));
          next(null, file);
        })
        .catch(next);
    }))
    .pipe(gulp.dest('./fixtures/out'))
})