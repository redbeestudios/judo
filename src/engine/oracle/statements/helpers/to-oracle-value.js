const moment = require('moment/moment');

/**
 *
 * @param value
 * @returns {string|number|*}
 */
module.exports = function toSQLValue(value) {
    if (value === undefined || value === null)
        return 'NULL';
    else if (typeof value === 'boolean')
        return value ? 1 : 0;
    else if (typeof value === 'string')
        return `'${value}'`;
    else if (value instanceof Date && !isNaN(value))
        return `TO_DATE('${moment.utc(value).format('YYYY-MM-DD HH:mm:ss')}', 'YYYY-MM-DD HH:MI:SS')`;
    else
        return value;
};
