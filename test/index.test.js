var fs = require('fs');
var test = require('tape');
var through = require('through2');
var gulp = require('gulp');

var Parser = require('../dist');

var parser = new Parser({
  components: { Wrapper: null },
  helpers: { If: null },
  filter: { join: null } 
});

// test('parser.parseStream()', function(t) {
//   t.plan(9);
//   fs.createReadStream(__dirname + '/fixtures/Simple.rogain')
//     .pipe(parser.parseStream())
//     .pipe(through(function(buf, enc, end) {
//       var tree = JSON.parse(buf.toString());
//       t.equal(tree !== undefined, true);
//       t.equal(tree.type, 'tag');
//       t.equal(tree.attrs[0].name, 'class');
//       t.equal(tree.attrs[1].data[0].type, 'variable');
//       t.equal(tree.attrs[1].data[0].path, 'keys');
//       t.equal(tree.attrs[1].data[0].filters[0].name, 'join');
//       t.equal(tree.children[0].type, 'node');
//       t.equal(tree.children[0].data[0].type, 'variable');
//       t.equal(tree.children[0].data[0].path, '@children');
//     }))
// });

// test('Parser.gulp(config)', function(t) {
//   t.plan(9);
//   fs.readFile(__dirname + '/fixtures/out/Simple.json', function(err, json) {
//     var tree = JSON.parse(json);
//     t.equal(tree !== undefined, true);
//     t.equal(tree.type, 'tag');
//     t.equal(tree.attrs[0].name, 'class');
//     t.equal(tree.attrs[1].data[0].type, 'variable');
//     t.equal(tree.attrs[1].data[0].path, 'keys');
//     t.equal(tree.attrs[1].data[0].filters[0].name, 'join');
//     t.equal(tree.children[0].type, 'node');
//     t.equal(tree.children[0].data[0].type, 'variable');
//     t.equal(tree.children[0].data[0].path, '@children');
//   });
// });

// test('parser.parse()', function(t) {
//   t.plan(9);
//   parser.parse('<div class="{mooger} block" data-{key}={keys|join}>{@children}</div>', tree => {
//     t.equal(tree !== undefined, true);
//     t.equal(tree.type, 'tag');
//     t.equal(tree.attrs[0].name, 'class');
//     t.equal(tree.attrs[1].data[0].type, 'variable');
//     t.equal(tree.attrs[1].data[0].path, 'keys');
//     t.equal(tree.attrs[1].data[0].filters[0].name, 'join');
//     t.equal(tree.children[0].type, 'node');
//     t.equal(tree.children[0].data[0].type, 'variable');
//     t.equal(tree.children[0].data[0].path, '@children');
//   });
// });