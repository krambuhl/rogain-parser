import parseExpression from './parseExpression';

export default function parseString(str) {
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