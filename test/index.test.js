var fs = require('fs');
var test = require('tape');
var through = require('through2');
var gulp = require('gulp');

var tutils = require('rogain-tree-utils');
var Parser = require('../dist');

var parser = new Parser({
  helpers: { Children: null },
  filter: { join: null } 
});


test('parser.parse()', function(t) {
  t.plan(8);
  parser.parse('<div class="{mooger} block" data-{key}={keys|join}><Children /></div>', tree => {
    t.equal(tree !== undefined, true);
    t.equal(tree.type, 'tag');
    t.equal(tree.attrs[0].name, 'class');
    t.equal(tree.attrs[1].data[0].type, 'variable');
    t.equal(tree.attrs[1].data[0].path, 'keys');
    t.equal(tree.attrs[1].data[0].filters[0].name, 'join');
    t.equal(tree.children[0].type, 'helper');
    t.equal(tree.children[0].name, 'Children');
  });
});

test('parser.parseStream()', function(t) {
  t.plan(8);
  fs.createReadStream(__dirname + '/fixtures/Simple.rogain')
    .pipe(parser.parseStream())
    .pipe(through(function(buf, enc, end) {
      var tree = JSON.parse(buf.toString());
      t.equal(tree !== undefined, true);
      t.equal(tree.type, 'tag');
      t.equal(tree.attrs[0].name, 'class');
      t.equal(tree.attrs[1].data[0].type, 'variable');
      t.equal(tree.attrs[1].data[0].path, 'keys');
      t.equal(tree.attrs[1].data[0].filters[0].name, 'join');
      t.equal(tree.children[0].type, 'helper');
      t.equal(tree.children[0].name, 'Children');
    }))
});
