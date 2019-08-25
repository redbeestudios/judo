const toSQLValue = require('../utils/to-sql-value');

/**
 * Given a collection of rows create a string of mssql INSERTs into the table
 *
 * @param {string} tableName - the table to insert to
 * @param {Array<Object>} rows
 * @param {number} [rowsPerInsert=1000] rows per insert
 * @returns {String}
 */
module.exports = function (tableName, rows, rowsPerInsert = 1000) {
    return splitIntoGroups(rows, rowsPerInsert)
        .map(rows => toSqlStatement(tableName, rows))
        .join('\n');
};

/**
 * Split rows into an array of arrays of size groupSize
 *
 * @param {Array<Object>} rows
 * @param {number} groupSize - the size of each
 * @returns {Array}
 */
function splitIntoGroups(rows, groupSize) {
    const groups = [];
    while (rows.length) {
        groups.push(rows.splice(0, groupSize));
    }
    return groups;
}

/**
 *
 * @param {string} tableName
 * @param {Array<Object>} rows
 * @returns {string}
 */
function toSqlStatement(tableName, rows) {
    return `INSERT INTO ${tableName} (${columns(rows[0])})\n` +
        'VALUES\n' +
        rows.map(row => `(${values(row)})`).join(',\n') + ';';
}

/**
 *
 * @param {Object} row
 * @returns {string}
 */
function columns(row) {
    return Object.keys(row).join(', ');
}

/**
 *
 * @param {Object} row
 * @returns {string}
 */
function values(row) {
    return Object.values(row)
        .map(value => toSQLValue(value))
        .join(', ');
}
