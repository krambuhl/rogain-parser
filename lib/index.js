import htmlparser from 'htmlparser';
import parseTree from './parseTree';
import through from 'through2';

const handlerDefaults = { 
  verbose: false,
  ignoreWhitespace: true,
  enforceEmptyTags: false
};

const parserDefaults = {
  lowerCaseTags: false
};

export default function RogainParser(template, options={}) {
  options.parserOptions = Object.assign({}, parserDefaults, options.parserOptions);
  options.handlerOptions = Object.assign({}, handlerDefaults, options.handlerOptions);

  return new Promise(function(fulfill, reject) {
    createHtmlParser(options, function(err, tree) {
      if (err) reject(err);
      else fulfill(parseTree(tree));
    }).parseComplete(template);
  });
}

function createHtmlParser(options={}, done) {
  return new htmlparser.Parser(createHandler(options, done), options.parserOptions);
}

function createHandler(options={}, done) {
  return new htmlparser.DefaultHandler((err, tree) => {
    if (err) done(err);
    else if (tree.length > 1) done('Tree should contain a single root node');
    else done(err, tree[0]);
  }, options.handlerOptions);
}