var test = require('tape');
var parseTree = require('../dist/parseTree');

var helpers = { If: null, Each: null };

test('parseTree(dom) :: dom.name', function(t) {
  var res = parseTree({ type: 'tag', name: '{tag}' }, helpers);
  t.plan(3);
  t.equal(res.type, 'component');
  t.equal(res.name[0].type, 'variable');
  t.equal(res.name[0].path, 'tag');
});

test('parseTree(dom) :: dom.name - unwrap text', function(t) {
  var res = parseTree({ type: 'tag', name: 'a' }, helpers);
  t.plan(2);
  t.equal(res.type, 'tag');
  t.equal(res.tagName, 'a');
});

test('parseTree(dom) :: dom.attribs', function(t) {
  var res = parseTree({ type: 'tag', name: 'a', 'attribs': { "no-children": "no-children" }}, helpers);
  t.plan(3);
  t.equal(res.attrs[0].type, 'attr');
  t.equal(res.attrs[0].name, 'no-children');
  t.equal(res.attrs[0].data, 'no-children');
});

test('parseTree(dom) :: dom.data', function(t) {
  var res = parseTree({ type: 'text', data: 'tag-{tag}' }, helpers);
  t.plan(5);
  t.equal(res.type, 'text');
  t.equal(res.data[0].type, 'text');
  t.equal(res.data[0].data, 'tag-');
  t.equal(res.data[1].type, 'variable');
  t.equal(res.data[1].path, 'tag');
});

test('parseTree(dom) :: dom.data - unwrap text', function(t) {
  var res = parseTree({ type: 'text', data: 'dreamy' }, helpers);
  t.plan(2);
  t.equal(res.type, 'text');
  t.equal(res.data, 'dreamy');
});

test('parseTree(dom) :: dom.children - not script', function(t) {
  var children = [{ "type": "text", "data": "monkies" }];
  var res = parseTree({ type: 'tag', name: 'a', children: children }, helpers);
  t.plan(4);
  t.equal(res.type, 'tag');
  t.equal(res.tagName, 'a');
  t.equal(res.children[0].type, 'text');
  t.equal(res.children[0].data, 'monkies');
});

test('parseTree(dom) :: dom.children - script tag', function(t) {
  var children = [{ "type": "text", "data": "monkies" }];
  var res = parseTree({ type: 'script', name: 'script', children: children }, helpers);
  t.plan(4);
  t.equal(res.type, 'script');
  t.equal(res.name, 'script');
  t.equal(res.children[0].type, 'text');
  t.equal(res.children[0].data, 'monkies');
});