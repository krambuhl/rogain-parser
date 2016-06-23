import parseString from './parseString';

const parse = attrs => key => ({
  type: 'attr',
  name: parseString(key),
  data: parseString(attrs[key])
});

export default function getTreeAttrs(attrs) {
  if (attrs && Object.keys(attrs).length > 0) {
    return Object.keys(attrs).map(parse(attrs));
  }
}
