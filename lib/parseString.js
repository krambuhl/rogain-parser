import parseExpression from './parseExpression';
import isSingleTextTree from './isSingleTextTree';

export default function parseString(str) {
  const matches = str.match(/{(.*?)}/gi);

  if (matches) {
    const paths = matches.map(match => match.substr(1, match.length - 2));
    const res = str.split(/{(.*?)}/gi).filter(bit => bit !== '').map(bit => {
      if (paths.indexOf(bit) !== -1) {
        return parseExpression(bit);
      }

      return { type: 'text', data: bit };
    });

    return isSingleTextTree(res) ? res[0].data : res;
  }

  return str;
}
