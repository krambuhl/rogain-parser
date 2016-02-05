var test = require('tape');
var Parser = require('../dist');

const simpleTemplate = '<div class="block" data-key={keys|join}>{@children}</div>';

var parser = new Parser({
  components: { Wrapper: null },
  helpers: { If: null },
  filter: { join: null } 
});


test('basic test', function(t) {
  t.plan(9);

  parser.parse(simpleTemplate)
    .then(tree => {
      t.equal(tree !== undefined, true);
      t.equal(tree.type, 'tag');
      t.equal(tree.attrs[0].name, 'class');
      t.equal(tree.attrs[1].data[0].type, 'variable');
      t.equal(tree.attrs[1].data[0].path, 'keys');
      t.equal(tree.attrs[1].data[0].filters[0].name, 'join');
      t.equal(tree.children[0].type, 'textnode');
      t.equal(tree.children[0].data[0].type, 'variable');
      t.equal(tree.children[0].data[0].path, '@children');
    })
});