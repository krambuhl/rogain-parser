# rogain-parser

Parses html strings with [rogain](https://www.npmjs.com/package/rogain) flavor into JSON-compatible rogain trees.  Uses [htmlparser2](https://www.npmjs.com/package/htmlparser2) for initial pass, then walks the outputed tree searching for components (Uppercase elements) and variables (demarcated using `{}`).

## Example

```js
import parse from 'rogain-parser';

parse('<div class="block {key}"><Children /></div>')
  .then(function(tree) {
    // output json
    {
      type: 'tag', 
      name: 'div', 
      attribs: [
        { 
          type: 'attr',
          name: 'class',
          data: [
            { type: 'text', data: 'block '  }, 
            { type: 'variable', path: 'key' }
          ]
        }
      ],
      children: [
        { type: 'component', name: 'Children' }
      ]
    }

  })
```

## parse(template[, options])

Parses template into json tree with options to configure the [htmlparser2](https://www.npmjs.com/package/htmlparser2) parser and handler, returns a Promise resolving a rogain tree.

___template___

String. Rogain template.

___options___

Object. Optional. Used with the [htmlparser2](https://www.npmjs.com/package/htmlparser2) module.

`opts.parserOptions` are options sent to the htmlparser parser.

`opts.handlerOptions` are options sent to the htmlparser default handler.


## Install

With [npm](https://www.npmjs.com) do:

```
npm install rogain-parser
```

## License

MIT
