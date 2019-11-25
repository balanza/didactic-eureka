# FLATTEN

## Question

Write some code that will flatten an array of arbitrarily nested arrays of integers into a flat array of integers. e.g. [[1,2,[3]],4] -> [1,2,3,4]. (provide a link to your solution)

## Run test

```
npm i
npm test
```

## Usage

```
const flatten = require('flatten');

// as a first level function
console.log(flatten()) // []
console.log(flatten([1, 2, [3]])) // [1, 2, 3]

// as a reducer
console.log([].reduce(flatten, [])) // []
console.log([1, 2, [3]].reduce(flatten, [])) // [1, 2, 3]

```