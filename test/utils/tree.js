var contains = require('object-contains');

function hasChildren(tree) {
  return tree.children !== undefined && tree.children.length > 0;
}

// hasAttribute(tree, 'as')
function hasAttribute(tree, name) {
  if (typeof name === 'string') {
    return findAttribute(tree, name) !== undefined;
  } else {

  }
}

function findAttribute(tree, name) {
  tree.attrs.find(function() {
    return 
  })
}

// find(tree, { type: 'helper', name: 'If' })
function find(tree, match) {

}

// findAll(tree, { type: 'component' })
function findAll(tree, match) {

}