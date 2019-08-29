const CONFIG = require('../runtime/config')();
const operations = require(`./${CONFIG.judo.engine}/operations`);

/**
 * @typedef {Object<string, *>} ProcedureOutputs
 */

/**
 * @typedef {Object} ProcedureResult
 * @property {*} returnValue
 * @property {ProcedureOutputs} output
 */


/**
 * Run a INSERT INTO to table
 *
 * @param {string} table
 * @param {Array<Object<string, *>>} data
 * @returns {Promise<void>}
 */
function insertInto(table, data) {
    return operations.insertInto(table, data);
}

/**
 * Execute a SQL Stored Procedure
 *
 * @param {string} sp a valid stored procedure
 * @param {Array<ProcedureArgument>} [args]
 * @returns {Promise<ProcedureResult>}
 */
function exec(sp, args) {
    return operations.exec(sp, args);
}

/**
 * Run a SELECT against a table
 *
 * @param {string} table
 * @param {Array<string>} [fields]
 * @param {Array<string>} [order]
 * @returns {Promise<void>}
 */
function selectFrom(table, fields, order) {
    return operations.selectFrom(table, fields, order);
}

/**
 * Delete all data from a table
 *
 * @param {string} table
 * @returns {Promise<Request|Promise>}
 */
function deleteFrom(table) {
    return operations.deleteFrom(table);
}

/**
 * Call a custom or native SQL function
 *
 * @param {string} func
 * @returns {Promise<*|*>}
 */
function callFunction(func) {
    return operations.callFunction(func);
}

/**
 * Select a single value from a table based on a single equals condition
 *
 * @param {string} field
 * @param {string} table
 * @param {string} filterBy
 * @param {string} value
 * @returns {Promise<* | *>}
 */
function selectValue(field, table, filterBy, value) {
    return operations.selectValue(field, table, filterBy, value);
}

module.exports = {
    exec,
    insertInto,
    selectFrom,
    deleteFrom,
    callFunction,
    selectValue
};
