export default function parseExpression(exp) {
  var bits = exp.split('|');

  return {
    path: bits.shift().trim(),
    filters: bits.map(filter => ({ name: filter.trim() }))
  }
}
