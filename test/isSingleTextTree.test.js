var test = require('tape');
var isSingleTextTree = require('../dist/isSingleTextTree');


var elist = [];
test('isSingleTextTree(treeList) :: empty list', function(t) {
  t.plan(1);
  t.equal(isSingleTextTree(elist), false);
});

var slist = [{ type: "text", data: "Read More" }];
test('isSingleTextTree(treeList) :: single text list', function(t) {
  t.plan(1);
  t.equal(isSingleTextTree(slist), true);
});

var mlist = [
  { type: "text", data: "Item 1" },
  { type: "text", data: "Item 2" },
  { type: "text", data: "Item 3" },
];
test('isSingleTextTree(treeList) :: multiple text list', function(t) {
  t.plan(1);
  t.equal(isSingleTextTree(mlist), false);
});

var mxlist = [
  { type: "helper", name: "Helper" },
  { type: "text", data: "Read More" }
];
test('isSingleTextTree(treeList) :: multiple mixed list', function(t) {
  t.plan(1);
  t.equal(isSingleTextTree(mxlist), false);
});

var molist = [
  { type: "helper", name: "Helper" },
  { type: "component", name: "Heading" }
];
test('isSingleTextTree(treeList) :: multiple other list', function(t) {
  t.plan(1);
  t.equal(isSingleTextTree(molist), false);
});

var nslist = [{ type: "helper", name: "Helper" }];
test('isSingleTextTree(treeList) :: single other list', function(t) {
  t.plan(1);
  t.equal(isSingleTextTree(nslist), false);
});

var wlist = [{ }];
test('isSingleTextTree(treeList) :: weird list', function(t) {
  t.plan(1);
  t.equal(isSingleTextTree(wlist), false);
});
