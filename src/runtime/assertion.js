const AssertionError = require('assertion-error');
const deepEqual = require('deep-eql');
const comparator = require('./loose-comparator');

class JudoError extends AssertionError {
    constructor(message, props, ssf) {
        super(message, props, ssf);
        this.showDiff = true;
    }
}

module.exports = function assert(expected, actual) {
    const equals = deepEqual(expected, actual, {comparator: comparator});

    if (!equals)
        throw new JudoError(
            `Expected ${expected} but got ${actual}`,
            {
                actual,
                expected
            }, assert);

    return equals;
};
