export default function parseExpression(exp) {
  const bits = exp.split('|');
  let res = {
    type: 'variable',
    path: bits[0]
  };

  // if (bits.length > 1) {
  //   res.filters = bits.slice(1).map(filter => ({
  //     type: 'filter',
  //     name: filter.trim()
  //   }));
  // }

  return res;
}
