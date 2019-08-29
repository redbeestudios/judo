const toOracleValue = require('./helpers/to-oracle-value');
/**
 * Given a collection of rows create a string of oracle INSERTs into the table.
 *
 * ie:
 * INSERT INTO test_table (a, b, c)
 * SELECT 1, 2, 3 FROM dual
 * UNION SELECT 4, 5, 6 FROM dual
 *
 * @param {string} tableName - the table to insert to
 * @param {Array<Object>} rows
 * @param {number} [rowsPerInsert=1000] rows per insert
 * @returns {String}
 */
module.exports = function insertInto(tableName, rows, rowsPerInsert = 1000) {
    return asPLSQL(splitIntoGroups(rows, rowsPerInsert).map(rows => toSqlStatement(tableName, rows)));
};

/**
 *
 * @param {Array<string>} statements
 * @returns {string}
 */
function asPLSQL(statements) {
    return statements.length > 1 ?
        'BEGIN\n' + statements.join(';\n') + ';\nEND;' :
        statements[0];
}

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
        rows.map(toSelect).join('\nUNION ALL ');
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
function toSelect(row) {
    return 'SELECT ' + values(row) + ' FROM dual';
}

/**
 *
 * @param {Object} row
 * @returns {string}
 */
function values(row) {
    return Object.values(row).map(value => toOracleValue(value)).join(', ');
}
