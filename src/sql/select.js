/**
 * Build a SELECT statement
 *
 * @param {string} table
 * @param {Array<string>} [fields] - an array of the fields to select
 * @returns {string}
 */
module.exports = function (table, fields) {
    return `SELECT ${(fields && fields.join(',')) || '*'} FROM ${table}`;
};