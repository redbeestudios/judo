const {sql, request} = require('./pool');
const insertStatement = require('./statements/insert-output');
const selectStatement = require('./statements/select');
const deleteStatement = require('./statements/delete');

/**
 * Run a INSERT INTO to table
 *
 * @param {string} table
 * @param {Array<Object<string, *>>} data
 * @returns {Promise<void>}
 */
const insertInto = async (table, data) => {
    return query(insertStatement(table, data));
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
    return req.execute(sp);
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
    return query(selectStatement(table, fields, order));
};

/**
 * Truncate a table
 *
 * @param {string} table
 * @returns {Promise<Request|Promise>}
 */
const deleteFrom = async (table) => {
    return query(deleteStatement(table));
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
    insertInto,
    exec,
    selectFrom,
    deleteFrom,
    query
};
