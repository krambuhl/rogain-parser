var fs = require('fs');
var test = require('tape');
var through = require('through2');
var gulp = require('gulp');

var Parser = require('../dist');

gulp.task('default', function(t) {
  return gulp.src('./fixtures/*.rogain')
    .pipe(Parser.gulp({
      components: { 
        TestComponent: null,
        TestBlock: null
      },
      helpers: { 
        If: null,
        Each: null 
      },
      filter: { 
        join: null } 
    }))
    .pipe(gulp.dest('./fixtures/out'))
})