var test = require('tape');
var getTreeAttrs = require('../dist/getTreeAttrs');

test('getTreeAttrs(attrs) :: no attributes', function(t) {
  t.plan(2);
  t.equal(getTreeAttrs() === undefined, true);
  t.equal(getTreeAttrs({}) === undefined, true);
});

test('getTreeAttrs(attrs) :: simple', function(t) {
  t.plan(3);

  var res = getTreeAttrs({ 'no-children': 'no-children' });
  
  t.equal(res[0].type, 'attr');
  t.equal(res[0].name, 'no-children');
  t.equal(res[0].data, 'no-children');
});

test('getTreeAttrs(attrs) :: multiple', function(t) {
  t.plan(7);
  
  var res = getTreeAttrs({ 
    hen: '{hen}',
    roost: 'mountain'
  });

  t.equal(res[0].type, 'attr');
  t.equal(res[0].name, 'hen');
  t.equal(res[0].data[0].type, 'variable');
  t.equal(res[0].data[0].path, 'hen');

  t.equal(res[1].type, 'attr');
  t.equal(res[1].name, 'roost');
  t.equal(res[1].data, 'mountain');
});

test('getTreeAttrs(attrs) :: complex', function(t) {
  t.plan(8);

  var res = getTreeAttrs({ '{data}': 'bungle {colors|first}' });
  
  t.equal(res[0].type, 'attr');
  t.equal(res[0].name[0].type, 'variable');
  t.equal(res[0].name[0].path, 'data');
  t.equal(res[0].data[0].type, 'text');
  t.equal(res[0].data[0].data, 'bungle ');
  t.equal(res[0].data[1].type, 'variable');
  t.equal(res[0].data[1].path, 'colors');
  t.equal(res[0].data[1].filters.length, 1);
});