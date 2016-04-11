# rogain-parser

Parses html strings with [rogain](https://www.npmjs.com/package/rogain) flavor into JSON compatible trees.  Uses [node-htmlparser](https://github.com/tautologistics/node-htmlparser) for initial pass, then walks the outputed tree looking for components and variables.

## Example 

```js
import parser from 'rogain-parser';

parser('<div class="block" data-key={key}><Children /></div>')
  .then(tree => {
    console.log(tree.name) // div
    console.log(tree.attrs[0]) // { type: 'attr', name: 'class', data: 'block' }
    console.log(tree.children[0]) // { type: 'component', name: 'Children' }
  })
```

## Parser(template[, options])

Parses template into json tree with options to configure the `htmlparser` parser and handler, returns a Promise.

___template___

String. Rogain template.

___options___

Object. Optional. Used with the [htmlparser](https://github.com/tautologistics/node-htmlparser) module.

`opts.parserOptions` are options sent to the htmlparser parser.

`opts.handlerOptions` are options sent to the htmlparser default handler.


## Install

With [npm](https://www.npmjs.com) do:

```
npm install rogain-parser
```

## License

MIT