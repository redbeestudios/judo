const sql = require('mssql');
const config = require('../../runtime/config')();

let globalTransaction = null;

/**
 *
 * @returns {Promise<ConnectionPool>}
 */
function close() {
    return sql.close();
}

/**
 *
 * @returns {Promise<ConnectionPool>}
 */
function connect() {
    return sql.connect(config.mssql);
}

/**
 * Create a new mssql transaction and assign it as the global transaction
 *
 * @returns {Transaction}
 */
const newTransaction = () => {
    return (globalTransaction = new sql.Transaction()).begin();
};

/**
 *
 * @returns {Promise<Transaction>}
 */
function rollbackTransaction() {
    return globalTransaction.rollback();
}

/**
 *
 * @returns {Promise<Transaction>}
 */
function commitTransaction() {
    return globalTransaction.commit();
}

/**
 * Get the correct request object.
 *
 * @returns {Request}
 */
function request() {
    if (globalTransaction)
        return globalTransaction.request();
    else
        return (new sql.Request());
}

module.exports = {
    request,
    newTransaction,
    commitTransaction,
    rollbackTransaction,
    connect,
    close
};
