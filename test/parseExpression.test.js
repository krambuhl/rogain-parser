var test = require('tape');
var parseExpression = require('../dist/parseExpression');

test('parseExpression(exp) :: simple var', function(t) {
  t.plan(2);
  var res = parseExpression('title');
  t.equal(res.path, 'title');
  t.equal(res.filters.length, 0);
});

test('parseExpression(exp) :: complex var', function(t) {
  t.plan(2);
  var res = parseExpression('item.0.title');
  t.equal(res.path, 'item.0.title');
  t.equal(res.filters.length, 0);
});

test('parseExpression(exp) :: single filter', function(t) {
  t.plan(3);
  var res = parseExpression('title|titleCase');
  t.equal(res.path, 'title');
  t.equal(res.filters.length, 1);
  t.equal(res.filters[0].name, 'titleCase');
});

test('parseExpression(exp) :: multi filters', function(t) {
  t.plan(4);
  var res = parseExpression('title|first|second');
  t.equal(res.path, 'title');
  t.equal(res.filters.length, 2);
  t.equal(res.filters[0].name, 'first');
  t.equal(res.filters[1].name, 'second');
});

test('parseExpression(exp) :: complex / multi filters', function(t) {
  t.plan(5);
  var res = parseExpression('item.0.title|first|second|third');
  t.equal(res.path, 'item.0.title');
  t.equal(res.filters.length, 3);
  t.equal(res.filters[0].name, 'first');
  t.equal(res.filters[1].name, 'second');
  t.equal(res.filters[2].name, 'third');
});
