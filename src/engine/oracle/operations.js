const pool = require('./pool');
const selectStatement = require('../mssql/statements/select');

/**
 * Run a INSERT INTO to table
 *
 * @param {string} table
 * @param {Array<Object<string, *>>} data
 * @returns {Promise<void>}
 */
const insertInto = async (table, data) => {
    return Promise.reject('pending');
};

/**
 * Execute a SQL Stored Procedure
 *
 * @param {string} sp a valid stored procedure
 * @param {Array<ProcedureArgument>} [args]
 * @returns {Promise<ProcedureResult>}
 */
const exec = async (sp, args) => {
    return Promise.reject('pending');
};
/**
 * Run a SELECT against a table
 *
 * @param {string} table
 * @param {Array<string>} [fields]
 * @param {Array<string>} [order]
 * @returns {Promise<Array>}
 */
const selectFrom = async (table, fields, order) => {
    return execute(selectStatement(table, fields, order))
        .then(result => {
            return result.rows;
        });
};

/**
 * Delete all data from a table
 *
 * @param {string} table
 * @returns {Promise<Request|Promise>}
 */
const deleteFrom = async (table) => {
    return execute(`DELETE FROM ${table.toUpperCase()}`);
};

/**
 * Call a custom or native SQL function
 *
 * @param {string} func
 * @returns {Promise<*|*>}
 */
const callFunction = async (func) => {
    return Promise.reject('pending');
};

/**
 * Select a single value from a table based on a single equals condition
 *
 * @param {string} field
 * @param {string} table
 * @param {string} filterBy
 * @param {string} value
 * @returns {Promise<* | *>}
 */
const selectValue = async (field, table, filterBy, value) => {
    return execute('select sys_context( \'userenv\', \'current_schema\' ) from dual');
};

function execute(query) {
    console.log(query);
    return pool.request().execute(query);
}

module.exports = {
    exec,
    insertInto,
    selectFrom,
    deleteFrom,
    callFunction,
    selectValue
};
