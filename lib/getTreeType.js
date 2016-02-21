export default function getTreeType(dom, helpers) {
  if (dom.type === 'tag') {
    let first = dom.name.substr(0, 1);
    
    // if tag name uppercase we parse to see if
    // the component/helper is registered
    if (first === first.toUpperCase()) {
      if (helpers[dom.name] !== undefined) {
        return 'helper';
      } else {
        return 'component';
      }
    }
  }

  return dom.type;
}