/**
 *
 * @param value
 * @returns {string|number|*}
 */
module.exports = function toSQLValue (value) {
    if (value === undefined || value === null)
        return 'NULL';
    else if (typeof value === 'string')
        return `'${value}'`;
    else if (typeof value === 'boolean')
        return value ? 1 : 0;
    else
        return value;
};