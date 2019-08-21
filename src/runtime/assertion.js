const AssertionError = require('assertion-error');
const deepEqual = require('deep-eql');
const comparator = require('./loose-comparator');


module.exports = function assert(expected, actual) {
    const equals = deepEqual(expected, actual, {comparator: comparator});

    if (!equals)
        throw new AssertionError('Values do not match', {
            actual,
            expected
        });

    return equals;
};
