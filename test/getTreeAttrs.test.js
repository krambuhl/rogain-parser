var test = require('tape');
var isSingleTextTree = require('../dist/isSingleTextTree');

test('getTreeType(tree) :: tag', function(t) {
  t.plan(1);
  var res = getTreeType({ type: "tag", name: "a" }, helpers);
  t.equal(res, 'tag');
});