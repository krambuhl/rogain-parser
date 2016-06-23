import parseExpression from './parseExpression';
import isSingleTextTree from './isSingleTextTree';

const varRegEx = /{(.*?)}/gi;
const matcher = match => match.substr(1, match.length - 2);
const parseExp = paths => str => {
  if (paths.indexOf(str) !== -1) {
    return parseExpression(str);
  }

  return { type: 'text', data: str };
};

export default function parseString(str) {
  const matches = str.match(varRegEx);

  if (matches) {
    const res = str
      .split(varRegEx)
      .filter(str => str !== '')
      .map(parseExp(matches.map(matcher)));

    return isSingleTextTree(res) ? res[0].data : res;
  }

  return str;
}