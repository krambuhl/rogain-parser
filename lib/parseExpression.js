export default function parseExpression(exp) {
  return {
    type: 'variable',
    path: exp.split('|').shift()
  };
}