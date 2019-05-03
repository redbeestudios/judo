/**
 * Build a TRUNCATE statement
 *
 * @param {string} table - the table to truncate
 * @returns {string} - a SQL query
 */
module.exports = function (table) {
    return `TRUNCATE TABLE ${table}`;
};