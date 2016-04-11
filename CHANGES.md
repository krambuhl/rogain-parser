# Change Log

### 0.5.0 

- Removed `parseStream`.
- Parser now uses promises to hide the OOP style `htmlparser`.

### 0.4.0

- Removes `helper` tree type, `component` type will cover both helper and components.

### 0.3.2

- Removed unused dependencies.

### 0.3.1

- Updates tag tree output from `tagName` to `name`.
- Updates script tree type from `script` to `tag`.

### 0.3.0

- Updates generic tree type from `textnode` to `text`.
- Removed gulp function, use [gulp-rogain](https://github.com/krambuhl/gulp-rogain) instead.
- Improves consistancy of output, all objects now define a type.
- Test coverage.