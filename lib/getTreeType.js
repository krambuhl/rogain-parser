export default function getTreeType(dom) {
  if (dom.type === 'tag') {
    const first = dom.name.substr(0, 1);

    // if tag name is uppercase/symbol the tag is a component
    if (first === first.toUpperCase()) {
      return 'component';
    }
  }

  return dom.type;
}