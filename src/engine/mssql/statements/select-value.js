const toSQLValue = require('./helpers/to-sql-value');

/**
 * Build a SELECT statement for a single value
 *
 * @param {string} field
 * @param {string} table
 * @param {string} filterBy
 * @param {*} value
 * @returns {string}
 */
module.exports = function selectValue(field, table, filterBy, value) {
    return `SELECT ${field} FROM ${table} WHERE ${filterBy} = ${toSQLValue(value)}`;
};