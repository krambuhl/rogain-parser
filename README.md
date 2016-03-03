# rogain-parser

Parses html strings with [rogain](https://www.npmjs.com/package/rogain) flavor into JSON compatible trees.  Uses [node-htmlparser](https://github.com/tautologistics/node-htmlparser) for initial pass, then walks the outputed tree looking for components and variables.

## Example 

```js
import Parser from 'rogain-parser';

const parser = new Parser();

parser.parse('<div class="block" data-key={key}><Children /></div>', tree => {
  console.log(tree.name) // div
  console.log(tree.attrs[0]) // { type: 'attr', name: 'class', data: 'block' }
  console.log(tree.children[0]) // { type: 'component', name: 'Children' }
})
```

## Parser([opts])

Creates a parser with optional options to configure the `htmlparser` parser and handler.

___opts___

Object. Optional. Used with the [htmlparser](https://github.com/tautologistics/node-htmlparser) module.

`opts.parserOptions` are options sent to the htmlparser parser.

`opts.handlerOptions` are options sent to the htmlparser default handler.


### parse(template, callback)

Parses template into json tree. Calls callback function when complete.

___template___

String. Rogain template.

___callback___

Function. Called when parsing is complete.

```js
const template = '<Box class="heavy" data-key={key}><Children /></Box>';
```

#### Example tree 

```json
{
  "type": "component",
  "name": "Box",
  "attrs": [
    { "type": "attr", "name": "class", "data": "heavy" },
    { "type": "attr", "name": "data-key", "data": [
        { "type": "variable", "path": "key"}
    ] }
  ],
  "children": [
    { "type": "component", "name": "Children" }
  ]
}
```

### parser.parseStream()

Creates a through stream that resolves with a tree when parsing is complete.

```js
fs.createReadStream(__dirname + '/MyForm.rogain')
    .pipe(parser.parseStream())
    .pipe(fs.createWriteStream(__dirname + '/MyForm.json'))
```

## Install

With [npm](https://www.npmjs.com) do:

```
npm install rogain-parser
```

## License

MIT