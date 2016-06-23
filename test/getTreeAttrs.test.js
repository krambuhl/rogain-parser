const test = require('tape');
const getTreeAttrs = require('../dist/getTreeAttrs');

test('getTreeAttrs(attrs) :: no attributes', function(t) {
  t.plan(2);
  t.equal(getTreeAttrs() === undefined, true);
  t.equal(getTreeAttrs({ }) === undefined, true);
});

test('getTreeAttrs(attrs) :: simple', function(t) {
  const res = getTreeAttrs({ 'no-children': 'no-children' });
  t.plan(3);
  t.equal(res[0].type, 'attr');
  t.equal(res[0].name, 'no-children');
  t.equal(res[0].data, 'no-children');
});

test('getTreeAttrs(attrs) :: multiple', function(t) {
  const res = getTreeAttrs({
    hen: '{hen}',
    roost: 'mountain'
  });
  t.plan(7);
  t.equal(res[0].type, 'attr');
  t.equal(res[0].name, 'hen');
  t.equal(res[0].data[0].type, 'variable');
  t.equal(res[0].data[0].path, 'hen');
  t.equal(res[1].type, 'attr');
  t.equal(res[1].name, 'roost');
  t.equal(res[1].data, 'mountain');
});

test('getTreeAttrs(attrs) :: complex', function(t) {
  const res = getTreeAttrs({ '{data}': 'bungle {colors}' });
  t.plan(7);
  t.equal(res[0].type, 'attr');
  t.equal(res[0].name[0].type, 'variable');
  t.equal(res[0].name[0].path, 'data');
  t.equal(res[0].data[0].type, 'text');
  t.equal(res[0].data[0].data, 'bungle ');
  t.equal(res[0].data[1].type, 'variable');
  t.equal(res[0].data[1].path, 'colors');
});
