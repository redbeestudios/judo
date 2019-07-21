const sql = require('mssql');
const {request} = require('./pool');
const insertStatement = require('./statements/insert-output');
const selectStatement = require('./statements/select');
const deleteStatement = require('./statements/delete');
const selectValueStatement = require('./statements/select-value');

/**
 * Run a INSERT INTO to table
 *
 * @param {string} table
 * @param {Array<Object<string, *>>} data
 * @returns {Promise<void>}
 */
const insertInto = async (table, data) => {
    return query(insertStatement(table, data))
        .then(result => Promise.resolve(result.recordset));
};

/**
 * Execute a SQL Stored Procedure
 *
 * @param {string} sp a valid stored procedure
 * @param {Array<ProcedureArgument>} [args]
 * @returns {Promise<void>}
 */
const exec = async (sp, args) => {
    const req = request();
    if (args) {
        args.forEach(arg => {
            if (arg.type)
                req[arg.output ? 'output' : 'input'](arg.name, sql[arg.type], arg.value);
            else {
                if (arg.output)
                    req.output(arg.name, null, arg.value);
                else
                    req.input(arg.name, arg.value);
            }
        });
    }
    return req.execute(sp).then(result => {
        return {
            returnValue: result.returnValue,
            output: result.output
        };
    });
};
/**
 * Run a SELECT against a table
 *
 * @param {string} table
 * @param {Array<string>} [fields]
 * @param {Array<string>} [order]
 * @returns {Promise<void>}
 */
const selectFrom = async (table, fields, order) => {
    return query(selectStatement(table, fields, order))
        .then(result => result.recordset);
};

/**
 * Delete all data from a table
 *
 * @param {string} table
 * @returns {Promise<Request|Promise>}
 */
const deleteFrom = async (table) => {
    return query(deleteStatement(table));
};

/**
 * Call a custom or native SQL function
 *
 * @param {string} func
 * @returns {Promise<*|*>}
 */
const callFunction = async (func) => {
    return query(`SELECT ${func} as r;`)
        .then(result => {
            return Promise.resolve(result.recordset[0].r);
        });
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
    return query(selectValueStatement(field, table, filterBy, value))
        .then(result => {
            if (!result.recordset.length)
                return Promise.reject(`No records found by ${filterBy} = ${value}`);
            return Promise.resolve(result.recordset[0][field]);
        });
};

/**
 * Run a custom SQL QUERY
 *
 * @param query
 * @returns {Promise<*>}
 */
const query = async (query) => {
    return request().query(query);
};

module.exports = {
    exec,
    insertInto,
    selectFrom,
    deleteFrom,
    callFunction,
    selectValue
};
