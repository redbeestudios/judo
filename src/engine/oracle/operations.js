const db = require('oracledb');
const pool = require('./pool');
const selectStatement = require('../mssql/statements/select');
const selectValueStatement = require('../mssql/statements/select-value');
const deleteFromStatement = require('../mssql/statements/delete');
const insert = require('./statements/insert');

/**
 * Run a INSERT INTO to table
 *
 * @param {string} table
 * @param {Array<Object<string, *>>} data
 * @returns {Promise<*>}
 */
const insertInto = async (table, data) => {
    return execute(insert(table, data, 3))
        .then(result => {
            return Promise.resolve(result);
        });
};

/**
 * Execute a SQL Stored Procedure
 *
 * @param {string} sp a valid stored procedure
 * @param {Array<ProcedureArgument>} [args]
 * @returns {Promise<ProcedureResult>}
 */
const exec = async (sp, args = []) => {
    const names = args.map(arg => ':' + arg.name).join(', ');
    const values = args.reduce((acc, cur) => {
        acc[cur.name] = {
            val: cur.value,
            dir: cur.output ? db.BIND_INOUT : db.BIND_IN
        };
        return acc;
    }, {});
    return execute(`BEGIN ${sp}(${names}); END;`, values).then(result => {
        return Promise.resolve({
            output: result.outBinds
        });
    });
};

/**
 * Run a SELECT against a table
 *
 * @param {string} table
 * @param {Array<string>} [fields]
 * @param {Array<string>} [order]
 * @returns {Promise<Array>}
 */
function selectFrom(table, fields, order) {
    return execute(selectStatement(table, fields, order))
        .then(result => {
            return result.rows.map(toLowerCaseKeys);
        });
}

/**
 * Delete all data from a table
 *
 * @param {string} table
 * @returns {Promise<Request|Promise>}
 */
const deleteFrom = async (table) => {
    return execute(deleteFromStatement(table));
};

/**
 * Call a custom or native SQL function
 *
 * @param {string} func
 * @returns {Promise<*|*>}
 */
const callFunction = async (func) => {
    return execute(`SELECT ${func} AS R FROM dual`)
        .then(result => {
            return Promise.resolve(result.rows[0].R);
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
    return execute(selectValueStatement(field, table, filterBy, value))
        .then(result => {
            if (!result.rows.length)
                return Promise.reject(`No records found by ${filterBy} = ${value}`);
            return Promise.resolve(result.rows[0][field.toUpperCase()]);
        });
};

function execute(query) {
    // console.log(query);
    return pool.request().execute(...arguments);
}

function toLowerCaseKeys(row) {
    return Object.keys(row).reduce((acc, cur) => {
        acc[cur.toLocaleLowerCase()] = row[cur];
        return acc;
    }, {});
}

module.exports = {
    exec,
    insertInto,
    selectFrom,
    deleteFrom,
    callFunction,
    selectValue
};