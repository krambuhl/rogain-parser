const test = require('tape');
const parseTree = require('../dist/parseTree');

test('parseTree(dom) :: dom.name', function(t) {
  const res = parseTree({ type: 'tag', name: '{tag}' });
  t.plan(3);
  t.equal(res.type, 'component');
  t.equal(res.name[0].type, 'variable');
  t.equal(res.name[0].path, 'tag');
});

test('parseTree(dom) :: dom.name - unwrap text', function(t) {
  const res = parseTree({ type: 'tag', name: 'a' });
  t.plan(2);
  t.equal(res.type, 'tag');
  t.equal(res.name, 'a');
});

test('parseTree(dom) :: dom.attribs', function(t) {
  const res = parseTree({ type: 'tag', name: 'a', 'attribs': { "no-children": "no-children" }});
  t.plan(3);
  t.equal(res.attribs[0].type, 'attr');
  t.equal(res.attribs[0].name, 'no-children');
  t.equal(res.attribs[0].data, 'no-children');
});

test('parseTree(dom) :: dom.data', function(t) {
  const res = parseTree({ type: 'text', data: 'tag-{tag}' });
  t.plan(5);
  t.equal(res.type, 'text');
  t.equal(res.data[0].type, 'text');
  t.equal(res.data[0].data, 'tag-');
  t.equal(res.data[1].type, 'variable');
  t.equal(res.data[1].path, 'tag');
});

test('parseTree(dom) :: dom.data - unwrap text', function(t) {
  const res = parseTree({ type: 'text', data: 'dreamy' });
  t.plan(2);
  t.equal(res.type, 'text');
  t.equal(res.data, 'dreamy');
});

test('parseTree(dom) :: dom.children - not script', function(t) {
  const children = [{ type: 'text', data: 'monkies' }];
  const res = parseTree({ type: 'tag', name: 'a', children: children });
  t.plan(4);
  t.equal(res.type, 'tag');
  t.equal(res.name, 'a');
  t.equal(res.children[0].type, 'text');
  t.equal(res.children[0].data, 'monkies');
});

test('parseTree(dom) :: dom.children - script tag', function(t) {
  const children = [{ type: 'text', data: 'monkies' }];
  const res = parseTree({ type: 'script', name: 'script', children: children });
  t.plan(4);
  t.equal(res.type, 'tag');
  t.equal(res.name, 'script');
  t.equal(res.children[0].type, 'text');
  t.equal(res.children[0].data, 'monkies');
});
