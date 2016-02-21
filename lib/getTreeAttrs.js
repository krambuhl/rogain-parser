import parseString from './parseString';
import isSingleTextTree from './isSingleTextTree';

export default function getTreeAttrs(attrs) {
  if (!attrs) return attrs;

  var res = [];
  for (var key in attrs) {
    var row = { 
      type: 'attr',
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