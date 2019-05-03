const sql = require('mssql');
let config;

try {
    config = require('../sql.conf');
} catch (e) {
    config = {
        user: process.env.SQL_USER || 'sa',
        password: process.env.SQL_PASSWORD || 'Password01',
        server: process.env.SQL_HOST || 'localhost',
        port: process.env.SQL_PORT || 1433,
        database: process.env.SQL_DATABASE || 'Configurations',
        pool: {
            max: 1,
            min: 1,
            idleTimeoutMillis: 3000
        }
    };
}

const close = () => {
    return sql.close();
};

const connect = () => {
    return sql.connect(config);
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