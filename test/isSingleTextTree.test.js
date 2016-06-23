var test = require('tape');
var isSingleTextTree = require('../dist/isSingleTextTree');


test('isSingleTextTree(treeList) :: empty list', function(t) {
  const res = isSingleTextTree([]);
  t.plan(1);
  t.equal(res, false);
});

test('isSingleTextTree(treeList) :: single text list', function(t) {
  const res = isSingleTextTree([{ type: 'text', data: 'Read More' }]);
  t.plan(1);
  t.equal(res, true);
});

test('isSingleTextTree(treeList) :: single other list', function(t) {
  const res = isSingleTextTree([{ type: 'component', name: 'ReadMore' }]);
  t.plan(1);
  t.equal(res, false);
});

test('isSingleTextTree(treeList) :: multiple text list', function(t) {
  const res = isSingleTextTree([
    { type: 'text', data: 'Item 1' },
    { type: 'text', data: 'Item 2' },
    { type: 'text', data: 'Item 3' },
  ]);
  t.plan(1);
  t.equal(res, false);
});

test('isSingleTextTree(treeList) :: multiple mixed list', function(t) {
  const res = isSingleTextTree([
    { type: 'component', name: 'Helper' },
    { type: 'text', data: 'Read More' }
  ]);
  t.plan(1);
  t.equal(res, false);
});

test('isSingleTextTree(treeList) :: multiple other list', function(t) {
  const res = isSingleTextTree([
    { type: 'component', name: 'Helper' },
    { type: 'component', name: 'Heading' }
  ]);
  t.plan(1);
  t.equal(res, false);
});

test('isSingleTextTree(treeList) :: single other list', function(t) {
  const res = isSingleTextTree([{ type: 'component', name: 'Helper' }]);
  t.plan(1);
  t.equal(res, false);
});

test('isSingleTextTree(treeList) :: weird list', function(t) {
  const res = isSingleTextTree([{ }]);
  t.plan(1);
  t.equal(res, false);
});
