var contains = require('object-contains');

function hasChildren(tree) {
  return tree.children !== undefined && tree.children.length > 0;
}

// hasAttribute(tree, 'as')
function hasAttribute(tree, name) {
  return findAttribute(tree, name) !== undefined;
}

function findAttribute(tree, name) {
  return tree.attrs.find(function(attr) {
    if (attr.name === name) {
      return attr;
    }
  })
}

// find(tree, { type: 'helper', name: 'If' })
function find(tree, match) {
  return tree.children.find(child => contains(child, match));
}

// findAll(tree, { type: 'component' })
function findAll(tree, match) {
  return tree.children.filter(child => contains(child, match));
}

module.exports = {
  hasAttribute: hasAttribute,
  hasChildren: hasChildren,
  find: find,
  findAll: findAll,
  findAttribute: findAttribute
}