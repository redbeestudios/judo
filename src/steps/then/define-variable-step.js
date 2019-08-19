const transform = require('../../runtime/transform-data');

/**
 * Store a variable in the scenario context for later use
 *
 * @param {string} value :: the value to store
 * @param {string} key :: the key to store at
 */
module.exports = function defineVariableStep(value, key) {
    this[key] = transform.call(this, value);
};
