const sql = require('mssql');
const config = require('../runtime/config')();

const close = () => {
    return sql.close();
};

const connect = () => {
    return sql.connect(config.mssql);
};

let globalTransaction = null;

const newTransaction = () => {
    globalTransaction = new sql.Transaction();
};

const transaction = () => globalTransaction;

/**
 * Get the correct request object.
 *
 * @returns {Request}
 */
const request = () => {
    if (globalTransaction)
        return globalTransaction.request();
    else
        return (new sql.Request());
};

module.exports = {
    request,
    transaction,
    newTransaction,
    connect,
    close
};
