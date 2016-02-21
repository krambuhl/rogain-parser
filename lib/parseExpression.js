export default function parseExpression(exp) {
  var bits = exp.split('|');
  var res = { path: bits.shift().trim() };

  if (bits.length) {
    res.filters = bits.map(filter => ({ name: filter.trim() }));
  }

  return res;
}
