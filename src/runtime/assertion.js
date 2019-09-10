const AssertionError = require('assertion-error');
const deepEqual = require('deep-eql');
const comparator = require('./loose-comparator');

class JudoError extends AssertionError {
    constructor(message, props, ssf) {
        super(message, props, ssf);
        this.showDiff = true;
    }
}

module.exports = function assertEquals(expected, actual, message) {
    const equals = deepEqual(expected, actual, {comparator});

    if (!equals)
        return Promise.reject(
            new JudoError(
                message || buildMessage(expected, actual),
                {
                    actual,
                    expected
                },
                assertEquals)
        );

    return Promise.resolve(equals);
};

function buildMessage(expected, actual) {
    return `Expected ${expected instanceof Array ? expected.length + ' rows' : expected} and got ${actual instanceof Array ? actual.length + ' rows' : actual}`;
}