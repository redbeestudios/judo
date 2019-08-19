const {selectValue} = require('../../engine/operations');
const transform = require('../../runtime/transform-data');

/**
 * Select one value from a table given one criteria only
 * Useful for having access to database constants during the tests.
 *
 *
 * @param {string} field :: the field to select
 * @param {string} table :: the table to query
 * @param {string} filterBy :: the field for the WHERE clause
 * @param {string} value :: the value for the WHERE clause
 * @returns {Promise<*>|null} :: the value found
 */
module.exports = async function selectValueStep(field, table, filterBy, value) {
    this['$' + field] = await selectValue(field, table, filterBy, transform.call(this, value));
    return this['$' + field];
};
