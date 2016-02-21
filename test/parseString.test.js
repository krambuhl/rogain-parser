var test = require('tape');
var parseString = require('../dist/parseString');

test('parseString(str) :: simple string', function(t) {
  t.plan(3);
  var res = parseString('title');
  t.equal(res.length, 1);
  t.equal(res[0].type, 'text');
  t.equal(res[0].data, 'title');
});

test('parseString(str) :: single variable', function(t) {
  t.plan(3);
  var res = parseString('{title}');
  t.equal(res.length, 1);
  t.equal(res[0].type, 'variable');
  t.equal(res[0].path, 'title');
});

test('parseString(str) :: mixed string/variable', function(t) {
  t.plan(5);
  var res = parseString('hello {world}');
  t.equal(res.length, 2);
  t.equal(res[0].type, 'text');
  t.equal(res[0].data, 'hello ');
  t.equal(res[1].type, 'variable');
  t.equal(res[1].path, 'world');
});

test('parseString(str) :: multiple variable', function(t) {
  t.plan(5);
  var res = parseString('{hello}{world}');
  t.equal(res.length, 2);
  t.equal(res[0].type, 'variable');
  t.equal(res[0].path, 'hello');
  t.equal(res[1].type, 'variable');
  t.equal(res[1].path, 'world');
});

test('parseString(str) :: mixed string/multi variable', function(t) {
  t.plan(7);
  var res = parseString('{hello} crazy {world}');
  t.equal(res.length, 3);
  t.equal(res[0].type, 'variable');
  t.equal(res[0].path, 'hello');
  t.equal(res[1].type, 'text');
  t.equal(res[1].data, ' crazy ');
  t.equal(res[2].type, 'variable');
  t.equal(res[2].path, 'world');
});