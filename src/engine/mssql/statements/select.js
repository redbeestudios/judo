/**
 * Build a SELECT statement
 *
 * @param {string} table
 * @param {Array<string>} [fields] - an array of the fields to select
 * @param {string|null} [where] - a string containing where conditions
 * @param {Array<string>} [order] - an array of the fields with their order. ie: field ASC
 * @returns {string}
 */
module.exports = function select(table, fields, where, order) {
    return `SELECT ${(fields && fields.join(', ')) || '*'} FROM ${table}${whereClause(where)}${orderByClause(order)}`.trim();
};

function whereClause(where) {
    return where ? ' WHERE ' + where : '';
}

/**
 *
 * @param {Array<string>} order
 * @returns {string}
 */
function orderByClause(order) {
    return order && order.length ? ' ORDER BY ' + order.join(', ') : '';
}
