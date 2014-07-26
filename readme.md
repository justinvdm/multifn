# multifn

create functions with multiple overrides.

```javascript
var multifn = require('multifn');

var fn = multifn()
  .if(function(a, b) { return a && b; })
  .do(function(a, b) { return a + b; })

  .if(function(a, b) { return a && !b; })
  .do(function(a) { return this(a, 1); })

  .else(function() { return 1; });

fn();  // 1
fn(3);  // 4
fn(2, 3);  // 5
```

## install

node:

```
$ npm install multifn
```

browser:

```
$ bower install multifn
```

```html
<script src="/bower_components/multifn/multifn.js"></script>
```

## api

### `multifn()`

Creates a new multifn. When the multifn is invoked, its `if` functions will be invoked in the order they were specified, short circuiting when a matching `if` function is found and returning the result of the corresponding `do` function.

```javascript
var fn = multifn()
  .if(function(a, b) { return a && !b; })
  .do(function(a) { return a; })

  .if(function(a, b) { return a && b; })
  .do(function(a, b) { return a + b; });

fn(3);  // 3
fn(2, 3);  // 5
```

### `multifn().if(ifFn).do(doFn)`

Defines a new override for the multifn. When `ifFn` returns `true`, `doFn` will be invoked, its result used as the multifn's invokation result. Both `ifFn` and `doFn` will be invoked with the arguments that the multifn was invoked with, and will both have the multifn as their `this` context. 

```javascript
var fn = multifn()
  .if(function(a, b) { return a && b; })
  .do(function(a) { return a + b; })

fn(2, 3);  // 5
```

### `multifn().else(elseFn)`

Defines a new fallback function to use when none of the overrides match. Defaults to a 'noop': `function() {}`.

```javascript
var fn = multifn()
  .if(function(a, b) { return a && b; })
  .do(function(a) { return a + b; })
  .else(function() { return 1; });

fn();  // 1
```
