import htmlparser from 'htmlparser';
import parseTree from './parseTree'

const handlerDefaults = { 
  verbose: false,
  ignoreWhitespace: true,
  enforceEmptyTags: false
};

const parserDefaults = {
  lowerCaseTags: false
};

export default class Parser {
  constructor(config, options) {
    let opts = options || {};
    this.helpers = config && config.helpers || {};
    if (config.get) this.helpers = config.get('helpers');
    this.parserOptions = Object.assign({}, parserDefaults, opts.parserOptions);
    this.handlerOptions = Object.assign({}, handlerDefaults, opts.handlerOptions);
  }

  parse(template) {
    return new Promise((accept, reject) => {
      var handler = new htmlparser.DefaultHandler((err, tree) => {
        if (err) reject(err);
        else if (tree.length > 1) reject('Tree should contain a single root node');
        else accept(parseTree(tree[0], this.helpers));
      }, this.handlerOptions);

      var parser = new htmlparser.Parser(handler, this.parserOptions);
      parser.parseComplete(template.toString())
    });

  }
}