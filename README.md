# rogain-parser

Parses html strings with [rogain](https://www.npmjs.com/package/rogain) flavor into JSON compatible trees.  Uses [node-htmlparser](https://github.com/tautologistics/node-htmlparser) for initial pass, then walks the outputed tree looking for components, helpers, variables, and filters.

## Example 

```js
import Parser from 'rogain-parser';

// config can be defined with no contents for parser
const parser = new Parser({ helpers: { If: null } });

parser.parse('<div class="block" data-key={key}>{@children}</div>', tree => {
    console.log(tree.attrs[0].name === 'class') // true
    console.log(tree.children[0].data[0].path === '@children') // true
})
```

## Parser(config[, opts])

Creates a parser with [rogain-config](https://www.npmjs.com/package/rogain-config) and options.  

The config is used to match components, helpers, and variables (only names are required to match, the contents will not be called while parsing). Options are provides to configure the `htmlparser` parser and handler.

___config___

rogain-config instance or plain object with components, helpers, and filters.

___opts___

Object. Optional. Related to the [htmlparser](https://github.com/tautologistics/node-htmlparser) module.

`opts.parserOptions` are options sent to the htmlparser parser.

`opts.handlerOptions` are options sent to the htmlparser default handler.


### parse(template, callback)

Parses template into json tree.  Calls callback function when complete.

___template___

String. Rogain html'ish template.

___callback___

Function.  Called when parsing is complete.

```js
const template = '<div class="block" data-key={key}>{@children}</div>';
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

### parser.parseStream()

Creates a through stream that resolves with a tree when parsing is complete.

```js
fs.createReadStream(__dirname + '/MyForm.rogain')
    .pipe(parser.parseStream())
    .pipe(fs.createWriteStream(__dirname + '/MyForm.json'))
```


## Parser.gulp(config[, options])

Helper function for gulp builds.  Creates a `Parser` instance that takes a gulp stream as input and outputs a through stream.

___config___

Rogain config or Object.

```js
gulp.src('./components/*.rogain')
    .pipe(Parser.gulp({
        helpers: { If: null, Unless: null, Each: null }
        filters: { first: null, last: null }
    }))
    .pipe(gulp.dest('./compiled-components'))
```

## Install 

With [npm](https://www.npmjs.com) do:

```
npm install rogain-parser
```

## License

MIT