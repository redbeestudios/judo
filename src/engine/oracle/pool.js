const db = require('oracledb');
const config = require('../../runtime/config')().oracle;

let connection = null;
let globalTransaction = null;

/**
 *
 * @returns {Promise<Connection>}
 */
function close() {
    return connection && connection.close();
}

/**
 *
 * @returns {Promise<Connection>}
 */
async function connect() {
    connection = await db.getConnection({
        user: config.user,
        password: config.password,
        connectString: `${config.server}:${config.port}/${config.serviceName}`
    });
    return connection;
}

/**
 * Create a new mssql transaction and assign it as the global transaction
 *
 * @returns {Transaction}
 */
const newTransaction = () => {
    return true;
};

/**
 *
 * @returns {Promise<Transaction>}
 */
function rollbackTransaction() {
    return true;
}

/**
 *
 * @returns {Promise<Transaction>}
 */
function commitTransaction() {
    return true;
}

/**
 * Get the correct request object.
 *
 * @returns {Request}
 */
function request() {
    return connection;
}

module.exports = {
    request,
    newTransaction,
    commitTransaction,
    rollbackTransaction,
    connect,
    close
};
