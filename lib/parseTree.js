export default function parseTree(dom, helpers) {
  var tree = { type: getTreeType(dom, helpers) };
  
  // get tree type
  if (dom.name) {
    let key = tree.type === 'tag' ? 'tagName' : 'name';
    tree[key] = parseString(dom.name);
    
    if (isSingleTextTree(tree[key])) {
      tree[key] = tree[key][0].data
    }
  }

  // transform attributes object
  if (dom.attribs) {
    tree.attrs = getTreeAttrs(dom.attribs);
  }

  // get the node data
  if (dom.data) {
    tree.data = parseString(dom.data);

    if (isSingleTextTree(tree.data)) {
      tree.data = tree.data[0].data;
    }
  }
  
  // add children in not script tag
  if (dom.children && dom.type !== 'script') {
    tree.children = dom.children.map(child => {
      return parseTree(child, helpers); 
    });
  } else if (dom.type === 'script') {
    tree.data = dom.children[0].data;
  }

  return tree;
}

function isSingleTextTree(tree) {
  return tree.length === 1 && tree[0].type === 'text';
}

function getTreeType(dom, helpers) {
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

  if (dom.type === 'text') {
    return 'node';
  }

  return dom.type;
}

function getTreeAttrs(attrs) {
  if (!attrs) return attrs;

  var res = [];
  for (var key in attrs) {
    var row = { 
      name: parseString(key),
      data: parseString(attrs[key])
    };

    if (isSingleTextTree(row.name)) {
      row.name = row.name[0].data;
    }

    if (isSingleTextTree(row.data)) {
      row.data = row.data[0].data;
    }

    res.push(row);
  }

  return res;
}

function parseString(str) {
  var matches = str.match(/{(.*?)}/gi);
  if (matches) {
    var bits = str.split(/{(.*?)}/gi).filter(bit => bit !== '');
    matches = matches.map(match => match.substr(1, match.length - 2));
    
    return bits.map(bit => {
      if (matches.indexOf(bit) !== -1) {
        var { path, filters } = parseExpression(bit);
        var node = { type: 'variable', path: path };
        if (filters && filters.length) node.filters = filters;
        return node;
      }

      return { type: 'text', data: bit };
    });
  }

  return [{ type: 'text', data: str }];
}

function parseExpression(exp) {
  var bits = exp.split('|');

  return {
    path: bits.shift().trim(),
    filters: bits.map(filter => ({ name: filter.trim() }))
  }
}


