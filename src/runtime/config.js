const config = {
    sql: {
        user: process.env.SQL_USER || 'sa',
        password: process.env.SQL_PASSWORD || 'Password01',
        server: process.env.SQL_HOST || 'localhost',
        port: Number(process.env.SQL_PORT) || 1433,
        database: process.env.SQL_DATABASE || 'master',
        pool: {
            max: 1,
            min: 1,
            idleTimeoutMillis: 3000
        }
    },
    judo: {
        sandbox: process.env.JUDO_SANDBOX || false
    }
};

Object.keys(config).forEach(key => {
    try {
        Object.assign(config[key], require(`../../${key}.conf`));
    } catch (e) {
        // Ignore non-existent configuration file.
    }
});

module.exports = (overrides) => {
    if (overrides) {
        // TODO: enable deep merge of objects
        for (let key in overrides) {
            if (overrides.hasOwnProperty(key) && config.hasOwnProperty(key))
                Object.assign(config[key], overrides[key]);
        }
    }
    return config;
};