const toSQLValue = require('../utils/to-sql-value');

/**
 * Given a collection of rows create a string of sql INSERTs into the table
 * mapping OUTPUT of all fields.
 *
 * ie:
 * INSERT INTO test_table (a, b, c) OUTPUT inserted.*
 * SELECT 1, 2, 3
 * UNION SELECT 4, 5, 6;
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
    return `INSERT INTO ${tableName} (${columns(rows[0])}) OUTPUT inserted.*\n` +
        'SELECT ' + rows.map(toValues).join('\nUNION ALL SELECT ') + ';';
}

/**
 * Return column names comma separated
 * ie:
 * column_a, column_b, column_c
 *
 * @param {Object} row
 * @returns {string}
 */
function columns(row) {
    return Object.keys(row).join(', ');
}

/**
 * Return row SQL values comma separated
 * ie:
 * 1, 2, 'abc', null
 *
 * @param {Object} row
 * @returns {string}
 */
function toValues(row) {
    return Object.values(row)
        .map(value => toSQLValue(value))
        .join(', ');
}
