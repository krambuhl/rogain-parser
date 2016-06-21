const test = require('tape');
const parseExpression = require('../dist/parseExpression');

test('parseExpression(exp) :: simple var', function(t) {
  const res = parseExpression('title');
  t.plan(2);
  t.equal(res.path, 'title');
  t.equal(res.filters === undefined, true);
});

test('parseExpression(exp) :: complex var', function(t) {
  const res = parseExpression('item.0.title');
  t.plan(2);
  t.equal(res.path, 'item.0.title');
  t.equal(res.filters === undefined, true);
});

// filter tests
// disabled for now

test.skip('parseExpression(exp) :: single filter', function(t) {
  const res = parseExpression('title|titleCase');
  t.plan(4);
  t.equal(res.path, 'title');
  t.equal(res.filters.length, 1);
  t.equal(res.filters[0].type, 'filter');
  t.equal(res.filters[0].name, 'titleCase');
});

test.skip('parseExpression(exp) :: multi filters', function(t) {
  const res = parseExpression('title|first|second');
  t.plan(6);
  t.equal(res.path, 'title');
  t.equal(res.filters.length, 2);
  t.equal(res.filters[0].type, 'filter');
  t.equal(res.filters[0].name, 'first');
  t.equal(res.filters[1].type, 'filter');
  t.equal(res.filters[1].name, 'second');
});

test.skip('parseExpression(exp) :: complex / multi filters', function(t) {
  const res = parseExpression('item.0.title|first|second|third');
  t.plan(8);
  t.equal(res.path, 'item.0.title');
  t.equal(res.filters.length, 3);
  t.equal(res.filters[0].type, 'filter');
  t.equal(res.filters[0].name, 'first');
  t.equal(res.filters[1].type, 'filter');
  t.equal(res.filters[1].name, 'second');
  t.equal(res.filters[2].type, 'filter');
  t.equal(res.filters[2].name, 'third');
});
