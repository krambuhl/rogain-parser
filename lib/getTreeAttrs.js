import parseString from './parseString';
import isSingleTextTree from './isSingleTextTree';

export default function getTreeAttrs(attrs) {
  if (attrs && Object.keys(attrs).length > 0) {
    return Object.keys(attrs).map(key => {
      var row = { 
        type: 'attr',
        name: parseString(key),
        data: parseString(attrs[key])
      };

      if (isSingleTextTree(row.name)) row.name = row.name[0].data;
      if (isSingleTextTree(row.data)) row.data = row.data[0].data;

      return row;
    });
  }
}