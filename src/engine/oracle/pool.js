const db = require('oracledb');
db.outFormat = db.OUT_FORMAT_OBJECT;

const CONFIG = require('../../runtime/config')().oracle;

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
        user: CONFIG.user,
        password: CONFIG.password,
        connectString: `${CONFIG.server}:${CONFIG.port}/${CONFIG.serviceName}`
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
