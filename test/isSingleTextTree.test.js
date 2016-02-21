var test = require('tape');
var through = require('through2');

var tutils = require('rogain-tree-utils');
var isSingleTextTree = require('../dist/isSingleTextTree');

var list = [
  { data: "Read More", type: "text" }
];

test('isSingleTextTree(treeList)', function(t) {
  t.plan(1);

  // var res = isSingleTextTree()
});