const test = require('tape');
const parser = require('../dist');

test('parser(tmplate)', function(t) {
  t.plan(16);

  parser('<div class="{mooger} block" data-{key}={keys}><h2><Children /></h2><p>{jalops} y\'all</p></div>')
    .then(tree => {
      t.equal(tree !== undefined, true);
      t.equal(tree.type, 'tag');
      t.equal(tree.attribs[0].name, 'class');
      t.equal(tree.attribs[1].data[0].type, 'variable');
      t.equal(tree.attribs[1].data[0].path, 'keys');
      t.equal(tree.children[0].type, 'tag');
      t.equal(tree.children[0].name, 'h2');
      t.equal(tree.children[0].children[0].type, 'component');
      t.equal(tree.children[0].children[0].name, 'Children');
      t.equal(tree.children[1].type, 'tag');
      t.equal(tree.children[1].name, 'p');
      t.equal(tree.children[1].children[0].type, 'text');
      t.equal(tree.children[1].children[0].data[0].type, 'variable');
      t.equal(tree.children[1].children[0].data[0].path, 'jalops');
      t.equal(tree.children[1].children[0].data[1].type, 'text');
      t.equal(tree.children[1].children[0].data[1].data, ' y\'all');
    })
    .catch(err => console.log('ERR', err));
});
