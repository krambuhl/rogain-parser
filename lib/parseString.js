import parseExpression from './parseExpression';
import isSingleTextTree from './isSingleTextTree';

export default function parseString(str) {
  var res = [{ type: 'text', data: str }];
  var matches = str.match(/{(.*?)}/gi);

  if (matches) {
    let paths = matches.map(match => match.substr(1, match.length - 2));
    let bits = str.split(/{(.*?)}/gi).filter(bit => bit !== '');  
    
    res = bits.map(bit => {
      if (paths.indexOf(bit) !== -1) {
        let node = parseExpression(bit);
        node.type = 'variable';
        return node;
      }

      return { type: 'text', data: bit };
    });
  }

  if (isSingleTextTree(res)) {
    return res[0].data;
  }

  return res;
}