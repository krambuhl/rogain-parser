const test = require('tape');
const getTreeType = require('../dist/getTreeType');

test('getTreeType(tree) :: tag', function(t) {
  const res = getTreeType({ type: "tag", name: "a" });
  t.plan(1);
  t.equal(res, 'tag');
});

test('getTreeType(tree) :: variable', function(t) {
  const res = getTreeType({ type: "tag", name: "{tagName}" });
  t.plan(1);
  t.equal(res, 'component');
});

test('getTreeType(tree) :: component', function(t) {
  const res = getTreeType({ type: "tag", name: "Heading" });
  t.plan(1);
  t.equal(res, 'component');
});

test('getTreeType(tree) :: text', function(t) {
  const res = getTreeType({ type: "text", data: "ReadMe" });
  t.plan(1);
  t.equal(res, 'text');
});

test('getTreeType(tree) :: other', function(t) {
  const res = getTreeType({ type: "script", name: "script" });
  t.plan(1);
  t.equal(res, 'script');
});
