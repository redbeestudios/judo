const sql = require('mssql');
let config;

try {
    config = require('../sql.conf');
} catch (e) {
    config = {
        user: 'sa',
        password: 'Password01',
        server: 'localhost',
        database: 'Configurations',
        pool: {
            max: 1,
            min: 1,
            idleTimeoutMillis: 3000
        }
    };
}

let POOL;

const close = () => {
    if (POOL)
        POOL.close();
};

const connect = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        POOL = pool;
        return pool;
    })
    .catch(err => {
        console.log('Database Connection Failed! Bad Config: ', err);
        process.exit();
    });

module.exports = {
    sql, connect, close
};