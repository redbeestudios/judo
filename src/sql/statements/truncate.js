/**
 * Build a DELETE FROM statement
 *
 * @param {string} table - the table to truncate
 * @returns {string} - a SQL query
 */
module.exports = function (table) {
    return `DELETE FROM ${table};`;
};