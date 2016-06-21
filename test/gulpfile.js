var test = require('tape');
var parser = require('../dist');

var through = require('through2');
var gulp = require('gulp');

gulp.task('default',function() {
  return gulp.src('./fixtures/*.rogain')
    .pipe(through.obj((file, enc, cb) => {
      parser(file.contents)
        .then(function(tree) {
          file.path = file.path.replace('.rogain', '.json');
          console.log(JSON.stringify(tree, null, 2))
          file.contents = new Buffer(JSON.stringify(tree, null, 2));

          cb(null, file);
        })
        .catch(err => console.log('ERRR', err));
    }))
    .pipe(gulp.dest('./fixtures/out'));
});
