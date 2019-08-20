const {callFunction} = require('../../engine/operations');

/**
 * Invoke a function on the engine and store the value
 *
 * @param {string} func the database function to invoke
 * @param {string} key where to store the result
 * @returns {Promise<*>}
 */
module.exports = async function callFunctionStep(func, key) {
    this[key] = await callFunction(func);
    return this[key];
};
