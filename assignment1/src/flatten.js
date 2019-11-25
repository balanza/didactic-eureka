const flatten = (arr = []) => (
    arr.reduce(flattenReducer, [])
);

const flattenReducer = (acc, item) => (
    Array.isArray(item)
        ? [...acc, ...flatten(item)]
        : [...acc, item]
);

module.exports = (arr, item) => (
    typeof item !== 'undefined'
        ? flattenReducer(arr, item)
        : flatten(arr)
); 
