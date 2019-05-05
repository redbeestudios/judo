const sql = require('mssql');
const config = require('../runtime/config');

const close = () => {
    return sql.close();
};

const connect = () => {
    return sql.connect(config.sql);
};

let globalTransaction = null;

const newTransaction = () => {
    globalTransaction = new sql.Transaction();
};

const transaction = () => globalTransaction;

module.exports = {
    sql,
    transaction,
    newTransaction,
    connect,
    close
};