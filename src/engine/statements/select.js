/**
 * Build a SELECT statement
 *
 * @param {string} table
 * @param {Array<string>} [fields] - an array of the fields to select
 * @param {Array<string>} [order] - an array of the fields with their order. ie: field ASC
 * @returns {string}
 */
module.exports = function (table, fields, order) {
    return `SELECT ${(fields && fields.join(', ')) || '*'} FROM ${table} ${order && order.length ? 'ORDER BY ' + order.join(', ') : ''}`.trim();
};