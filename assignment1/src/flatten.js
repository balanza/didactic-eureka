const flatten = (arr = []) => (
    arr.reduce(flattenReducer, [])
);

const flattenReducer = (acc, item) => (
    Array.isArray(item)
        ? [...acc, ...flatten(item)]
        : [...acc, item]
);

module.exports = (...args) => {
    const [arr = [], item] = args;
    const isReducer = args.length >= 2;
    return (
        isReducer
            ? flattenReducer(arr, item)
            : flatten(arr)
    ); 
};
