var test = require('tape');
var Parser = require('../dist');

var through = require('through2');
var gulp = require('gulp');


const parserConfig = {
  components: { 
    TestComponent: null,
    TestBlock: null
  },
  helpers: { 
    If: null,
    Each: null,
    Children: null
  },
  filter: { 
    join: null 
  } 
};

function gulpParse(config) {
  var parser = new Parser(config);
  return through.obj((file, enc, next) => {
    var htmlParser = parser.createHtmlParser(tree => {
      file.path = file.path.replace('.rogain', '.json');
      file.contents = new Buffer(JSON.stringify(tree, null, 2));
      next(null, file);
    })

    htmlParser.parseComplete(file.contents.toString());
  });
}

gulp.task('default', function(t) {
  return gulp.src('./fixtures/*.rogain')
    .pipe(gulpParse(parserConfig))
    .pipe(gulp.dest('./fixtures/out'))
})