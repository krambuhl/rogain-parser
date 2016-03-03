import getTreeType from './getTreeType';
import getTreeAttrs from './getTreeAttrs';
import isSingleTextTree from './isSingleTextTree';
import parseString from './parseString';

export default function parseTree(dom) {
  var tree = { type: getTreeType(dom) };
  
  // get tree type
  if (dom.name) {
    tree.name = parseString(dom.name);
  }

  // transform attributes object
  if (dom.attribs) {
    tree.attrs = getTreeAttrs(dom.attribs);
  }

  // get the node data
  if (dom.data) {
    tree.data = parseString(dom.data);
  }
  
  // add children in not script tag
  if (dom.children && dom.type !== 'script') {
    tree.children = dom.children.map(child => parseTree(child));
  } else if (dom.type === 'script') {
    tree.type = 'tag';
    tree.children = dom.children;
  }

  return tree;
}