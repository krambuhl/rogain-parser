var test = require('tape');
var getTreeType = require('../dist/getTreeType');

var helpers = { If: null, Each: null };

test('getTreeType(tree) :: tag', function(t) {
  t.plan(1);
  var res = getTreeType({ type: "tag", name: "a" }, helpers);
  t.equal(res, 'tag');
});

test('getTreeType(tree) :: variable', function(t) {
  t.plan(1);
  var res = getTreeType({ type: "tag", name: "{tagName}" }, helpers);
  t.equal(res, 'component');
});

test('getTreeType(tree) :: component', function(t) {
  t.plan(1);
  var res = getTreeType({ type: "tag", name: "Heading" }, helpers);
  t.equal(res, 'component');
});

test('getTreeType(tree) :: text', function(t) {
  t.plan(1);
  var res = getTreeType({ type: "text", data: "ReadMe" }, helpers);
  t.equal(res, 'text');
});

test('getTreeType(tree) :: other', function(t) {
  t.plan(1);
  var res = getTreeType({ type: "script", name: "script" }, helpers);
  t.equal(res, 'script');
});