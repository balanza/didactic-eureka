const flatten = require('../index');

const deepN = (n) => (
    Array.from({ length: n }).reduceRight((acc, _, i) => [[i, acc]], [])
);

const flatN = (n) => (
    Array.from({ length: n }).map((_, i) => i)
);

describe('flatten', () => {

    test('is a function', () => {
        expect(flatten).toEqual(expect.any(Function));
    });

    const cases = [
        ['it returns empty array if no argument is passed', undefined, []],
        ['it returns empty array if empty array is passed', [], []],
        ['it returns the same when the array is already flattened', [1, 2, 3], [1, 2, 3]],
        ['it flattens one level', [1, [2, 3], 4], [1, 2, 3, 4]],
        ['it flattens two levels', [1, [2, [3]], 4], [1, 2, 3, 4]],
        ['it flattens nested empty arrays', [1, [2, [3], []], [], 4], [1, 2, 3, 4]],
        ['it flattens head', [[1], 2, 3, 4], [1, 2, 3, 4]],
        ['it flattens tail', [1, 2, 3, [4]], [1, 2, 3, 4]],
        ['it considers undefined values', [1, undefined, [2, undefined], 3, undefined], [1, undefined, 2, undefined, 3, undefined]],
        ['it flattens N levels', deepN(100), flatN(100)],
        ['it flattens N levels /2', [deepN(100), deepN(5)], [...flatN(100), ...flatN(5)]],
    ];

    describe('as a function', () => {
        cases.forEach(([title, subject, expected]) => {
            test(title, () => {
                expect(flatten(subject)).toEqual(expected);
            });
        });
    });

    describe('as a reducer', () => {
        cases.forEach(([title, subject = [], expected]) => {
            test(title, () => {
                expect(subject.reduce(flatten, [])).toEqual(expected);
            });
        });
    });



    [
        ['it throws if not an array (object)', {}],
        ['it throws if not an array (string)', 'any string'],
        ['it throws if not an array (number)', 5],
        ['it throws if not an array (null)', null],
    ]
    .forEach(([title, subject]) => {
        test(title, () => {
            const execution = () => flatten(subject);
            expect(execution).toThrow();
        });
    });
    
});