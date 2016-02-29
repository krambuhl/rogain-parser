import parseString from './parseString';

export default function getTreeAttrs(attrs) {
  if (attrs && Object.keys(attrs).length > 0) {
    return Object.keys(attrs).map(key => ({ 
      type: 'attr',
      name: parseString(key),
      data: parseString(attrs[key])
    }));
  }
}