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
  if (dom.attribs && Object.keys(dom.attribs).length) {
    tree.attribs = getTreeAttrs(dom.attribs);
  }

  // get the node data
  if (dom.data) {
    tree.data = parseString(dom.data);
  }

  // add children
  if (dom.children && dom.children.length > 0) {
    if (dom.type === 'script') {
      tree.type = 'tag';
      tree.name = 'script';
      tree.children = [{
        type: 'text',
        data: dom.children[0].data
      }];
    } else {
      tree.children = dom.children.map(child => parseTree(child));
    }
  }

  return tree;
}
