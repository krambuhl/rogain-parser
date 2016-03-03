var fs = require('fs');
var test = require('tape');
var through = require('through2');

var Parser = require('../dist/Parser');

var parser = new Parser();

test('parser.parse()', function(t) {
  t.plan(7);
  parser.parse('<div class="{mooger} block" data-{key}={keys|join}><Children /></div>', tree => {
    t.equal(tree !== undefined, true);
    t.equal(tree.type, 'tag');
    t.equal(tree.attrs[0].name, 'class');
    t.equal(tree.attrs[1].data[0].type, 'variable');
    t.equal(tree.attrs[1].data[0].path, 'keys');
    // t.equal(tree.attrs[1].data[0].filters[0].name, 'join');
    t.equal(tree.children[0].type, 'component');
    t.equal(tree.children[0].name, 'Children');
  });
});

test('parser.parseStream()', function(t) {
  t.plan(7);
  fs.createReadStream(__dirname + '/fixtures/Simple.rogain')
    .pipe(parser.parseStream())
    .pipe(through(function(buf, enc, end) {
      var tree = JSON.parse(buf.toString());
      t.equal(tree !== undefined, true);
      t.equal(tree.type, 'tag');
      t.equal(tree.attrs[0].name, 'class');
      t.equal(tree.attrs[1].data[0].type, 'variable');
      t.equal(tree.attrs[1].data[0].path, 'keys');
      // t.equal(tree.attrs[1].data[0].filters[0].name, 'join');
      t.equal(tree.children[0].type, 'component');
      t.equal(tree.children[0].name, 'Children');
    }))
});
