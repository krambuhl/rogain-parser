# rogain-parser

Parses html strings with [rogain](https://www.npmjs.com/package/rogain) flavor into JSON compatible trees.  Uses [node-htmlparser](https://github.com/tautologistics/node-htmlparser) for initial pass, then walks the outputed tree looking for components, helpers, variables, and filters.

## Example 

```js
import Config from 'rogain-config';
import Parser from 'rogain-parser';

// config can be defined with no contents for parser
var config = new Config({ helpers: { If: null } });
var parser = new Parser(config);

fs.readFile('./template.html')
  .then(template => parser.parse(template))
  .then(tree => fs.writeFile('./template.json', JSON.stringify(tree)));
```

## Parse(config[, opts])

Creates a parser with [rogain-config](https://www.npmjs.com/package/rogain-config) and options.  Configuration is used to match components and helpers (only names are required to match, the contents will not be called while parsing).  A couple options are used by html

<dl>
    <dt>config</dt>
    <dd>rogain-config instance or plain object with components, helpers, and filters.</dd>

    <dt>opts</dt>
    <dd>Object.</dd>
</dl>

`opts` is optional. Options are related to the [htmlparser](https://github.com/tautologistics/node-htmlparser) module.

`opts.parserOptions` are options sent to the htmlparser parser.

`opts.handlerOptions` are options sent to the htmlparser default handler.


### parser.parse(template)

Parses template into json tree.  returns a promise that will resolve with a tree when parsing is complete.

```js
const template = '<div class="block" data-key={key}>{@children}</div>';
parser.parse(template)
  .then(tree => console.log(tree))
  .then(err => console.error('Parsing Error', err))
```

#### Example tree 

```json
{
  "type": "tag",
  "tagName": "div",
  "attrs": [{
    "name": "class",
    "value": "block"
  },{
    "name": "data-key",
    "data": [{
      "type": "variable",
      "path": "key"
    }]
  }],
  "children": [{
    "type": "textnode",
    "data": [{
      "type": "variable",
      "path": "@children"
    }]
  }]
}
```


## Install 

With [npm](https://www.npmjs.com) do:

```
npm install rogain-parser
```

## License

MIT