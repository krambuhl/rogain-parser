import { Parser, DefaultHandler } from 'htmlparser2';

export default function(done, options={}) {
  const parserOptions = Object.assign({
    lowerCaseTags: false
  }, options.parserOptions);

  const handlerOptions = Object.assign({
    verbose: false,
    ignoreWhitespace: true,
    enforceEmptyTags: false
  }, options.handlerOptions);

  return new Parser(createHandler(done, handlerOptions), parserOptions);
}

function createHandler(done, options={}) {
  return new DefaultHandler((err, tree) => {
    if (err) done(err);
    else if (tree.length > 1) done('Tree should contain a single root node');
    else done(err, tree[0]);
  }, options);
}
