/**
 * Build a DELETE FROM statement
 *
 * @param {string} table - the table to delete
 * @returns {string} - a SQL query
 */
module.exports = function (table) {
    return `DELETE FROM ${table};`;
};