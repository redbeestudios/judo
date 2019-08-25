// const config = require('../../runtime/config')();

const pool = require('./mssql/pool');

function close() {
    return pool.close();
}

function connect() {
    return pool.connect();
}


function newTransaction() {
    pool.newTransaction();
}

function transaction() {
    return pool.transaction();
}

module.exports = {
    transaction,
    newTransaction,
    connect,
    close
};
