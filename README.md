# Madonna Function
Creates a function that validates its arguments via
[madonna-fp](https://github.com/olsonpm/madonna-fp), passing them to another
function.  You can optionally configure mapper functions to modify the arguments
after validation.  I created this because I often want to call a function and
know for certain the arguments are valid.  The optional mapper is for
convenience since I also often need arguments to come in as raw json and passed
through a class or constructor.  The mapping functionality is provided by
[madonna-map](https://github.com/olsonpm/madonna-fp).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

 - [Examples](#examples)
 - [API](#api)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Examples
```js
const createMadonnaFn = require('madonna-function').create
  , printArgs = console.dir.bind(console);

// creates a function requiring the argument 'name' and prints it
let mfn = createMadonnaFn({
  marg: { name: ['require', 'isLadenString'] }
  , fn: printArgs
});

mfn({ name: 'matt' });
// prints
// { name: 'matt' }


// lets do the same but map name to all uppercase letters
let mfn = createMadonnaFn({
  marg: { name: ['require', 'isLadenString'] }
  , fn: printArgs
  , argMap: { name: fp.toUpper }
});

mfn({ name: 'matt' });
// prints
// { name: 'MATT' }


// madonna-fp validation errors will be thrown if you pass invalid arguments
mfn({ name: 1 });
// throws the error
// Invalid Input: The following arguments didn't pass their criterion
// invalid arguments and values: {
//   "name": 1
// }
// failed criterion per argument: {
//   "name": {
//     "flags": [
//       "isLadenString"
//     ]
//   }
// }
```

## API
`require('madonna-function').create`
 - Takes the following arguments
   - **marg**: `require` `isLadenPlainObject`
     - marg stands for 'madonna-fp argument'.  It is passed to madonna-fp which
       is used to validate the arguments in calls to the returned function.
   - **fn**: `require` `fp.isFunction`
     - The function called with the validated, and possibly mapped arguments
   - **argMap**: `isLadenPlainObject`
     - An object with keys present in **marg** to functions whose input
       will be the validated value, and output will be passed to **fn**.
       Examples above should clarify any confusion.
 - Returns a function that validates its input against **marg**.  Any properties
   in **argMap** will pass through their mappers.  All validated and mapped
   values will be passed into **fn**.
