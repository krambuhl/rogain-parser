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

export default class Parser {
  constructor(config, options) {
    let opts = options || {};
    this.helpers = config && config.helpers || {};
    if (config.get) this.helpers = config.get('helpers');
    this.parserOptions = Object.assign({}, parserDefaults, opts.parserOptions);
    this.handlerOptions = Object.assign({}, handlerDefaults, opts.handlerOptions);
  }

  htmlHandler(done) {
    return new htmlparser.DefaultHandler((err, tree) => {
      if (err) throw new Error(err);
      else if (tree.length > 1) throw new Error('Tree should contain a single root node');
      else done(parseTree(tree[0], this.helpers));
    }, this.handlerOptions);
  }

  createHtmlParser(done) {
    return new htmlparser.Parser(this.htmlHandler(done), this.parserOptions);
  }

  parse(template, done) {
    var parser = this.createHtmlParser(done);
    parser.parseComplete(template);
  }

  parseStream() {
    var parser = this.createHtmlParser(tree => stream.push(JSON.stringify(tree)));
    var stream = through(function(buf, enc, next) {
      parser.parseChunk(buf.toString());
      next();    
    }, function(done) {
      parser.done();
      done();
    });

    return stream;
  }
}