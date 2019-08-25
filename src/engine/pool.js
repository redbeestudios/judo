const CONFIG = require('../runtime/config')();
const pool = require(`./${CONFIG.judo.engine}/pool`);

/**
 * Close connection to the database
 * Should be called when all features have finished
 *
 * @returns {Promise<*>}
 */
function close() {
    return pool.close();
}

/**
 * Open a connection to the database
 * must be called before any step that access the database
 *
 * @returns {Promise<*>}
 */
function connect() {
    return pool.connect();
}

/**
 * Start a new transaction against the database
 * Should be called before every scenario so all changes can be tracked
 *
 * @returns {*}
 */
function beginTransaction() {
    return pool.newTransaction();
}

/**
 * Commit or Rollback the current transaction
 * Should be called after every scenarios so all changes are removed or stored
 * depending if judo is running in sandbox mode
 *
 * @returns {Promise<*>}
 */
function endTransaction() {
    if (CONFIG.judo.sandbox)
        return pool.commitTransaction();
    else
        return pool.rollbackTransaction();
}

module.exports = {
    beginTransaction,
    endTransaction,
    connect,
    close
};
