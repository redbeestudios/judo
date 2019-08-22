const transform = require('../../runtime/transform-data');
const assertEquals = require('../../runtime/assertion');

/**
 * Validate key and value are equals
 *
 * @param {string} key
 * @param {string} value
 */
module.exports = function variableEqualsStep(key, value) {
    return assertEquals(transform.call(this, key), transform.call(this, value));
};
