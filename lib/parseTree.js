import getTreeType from './getTreeType';
import getTreeAttrs from './getTreeAttrs';
import parseString from './parseString';

export default function parseTree(dom) {
  let tree = { type: getTreeType(dom) };

  // get tree type
  if (dom.name) {
    tree.name = parseString(dom.name);
  }

  // transform attributes object
  if (dom.attribs) {
    tree.attribs = getTreeAttrs(dom.attribs);
  }

  // get the node data
  if (dom.data) {
    tree.data = parseString(dom.data);
  }

  // add children
  if (dom.children) {
    if (dom.type !== 'script') {
      tree.children = dom.children.map(child => parseTree(child));
    } else {
      tree.type = 'tag';
      tree.children = dom.children;
    }
  }

  return tree;
}
