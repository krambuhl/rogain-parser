import parseTree from './parseTree';
import createParser from './createParser';

export default function parse(template, options={}) {
  return new Promise(function(resolve, reject) {
    if (template instanceof Buffer) {
      template = template.toString();
    }

    template = template.trim()
      .replace(/^\s*/gm, '')
      .split(/(\r\n|\n|\r)/gm)
      .filter(ln => ln !== '\n')
      .join('');

    createParser((err, tree) => {
      if (err) reject(err);
      else resolve(parseTree(tree));
    }, options).parseComplete(template);
  });
}
