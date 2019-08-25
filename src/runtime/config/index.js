const {importConfig} = require('./importer');

const CONFIG = {
    mssql: {
        user: process.env.MSSQL_USER || 'sa',
        password: process.env.MSSQL_PASSWORD || '',
        server: process.env.MSSQL_SERVER || 'localhost',
        port: Number(process.env.MSSQL_PORT) || 1433,
        database: process.env.MSSQL_DATABASE || 'master',
        pool: {
            max: 1,
            min: 1,
            idleTimeoutMillis: 3000
        }
    },
    oracle: {
        user: process.env.ORACLE_USER || 'system',
        password: process.env.ORACLE_PASSWORD || '',
        server: process.env.ORACLE_SERVER || 'localhost',
        port: process.env.ORACLE_PORT || 1521,
        serviceName: process.env.ORACLE_SERVICE_NAME || 'XEPDB1'
    },
    judo: {
        engine: process.env.JUDO_ENGINE || null,
        sandbox: process.env.JUDO_SANDBOX || false
    }
};

Object.keys(CONFIG).forEach(key => {
    merge(CONFIG[key], importConfig(key));
});

/**
 * Module where runtime configuration is stored
 *
 * @param {Object} overrides :: values to override configuration with
 * @returns {Object} :: runtime configuration
 */
module.exports = function config(overrides) {
    if (!overrides)
        return CONFIG;
    return merge(CONFIG, overrides);
};

/**
 * Deep assign values of source to target
 *
 * @param {Object} target :: the target object
 * @param {Object} source :: the source object
 * @returns {*}
 */
function merge(target, source) {

    for (let key of Object.keys(source)) {
        if (!target.hasOwnProperty(key))
            delete source[key];
        else if (source[key] instanceof Object)
            Object.assign(source[key], merge(target[key], source[key]));
    }

    return Object.assign(target, source);
}
