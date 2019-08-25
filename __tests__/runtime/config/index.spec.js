describe('manage runtime configuration', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = {...OLD_ENV};

        jest.mock('../../../src/runtime/config/importer', () => {
            return {
                importConfig: () => {
                    return {};
                }
            };
        });
    });

    afterEach(() => {
        process.env = OLD_ENV;
    });

    test('should return default config', () => {
        expect(require('../../../src/runtime/config')())
            .toEqual({
                mssql: {
                    user: 'sa',
                    password: '',
                    server: 'localhost',
                    port: 1433,
                    database: 'master',
                    pool: {
                        max: 1,
                        min: 1,
                        idleTimeoutMillis: 3000
                    }
                },
                oracle: {
                    user: 'system',
                    password: '',
                    server: 'localhost',
                    port: 1521,
                    serviceName: 'XEPDB1'
                },
                judo: {
                    engine: null,
                    sandbox: false
                }
            });
    });

    test('should return correct config when env variables are present', () => {

        process.env.JUDO_ENGINE = 'mssql';
        process.env.JUDO_SANDBOX = true;

        process.env.MSSQL_USER = 'user';
        process.env.MSSQL_PASSWORD = 'password';
        process.env.MSSQL_SERVER = 'myhost';
        process.env.MSSQL_PORT = 1432;
        process.env.MSSQL_DATABASE = 'develop';

        process.env.ORACLE_USER = 'suer';
        process.env.ORACLE_PASSWORD = 'pass';
        process.env.ORACLE_SERVER = 'host';
        process.env.ORACLE_PORT = 1500;
        process.env.ORACLE_SERVICE_NAME = 'XEPDB3';

        expect(require('../../../src/runtime/config')())
            .toEqual({
                mssql: {
                    user: 'user',
                    password: 'password',
                    server: 'myhost',
                    port: 1432,
                    database: 'develop',
                    pool: {
                        max: 1,
                        min: 1,
                        idleTimeoutMillis: 3000
                    }
                },
                oracle: {
                    user: 'suer',
                    password: 'pass',
                    server: 'host',
                    port: 1500,
                    serviceName: 'XEPDB3'
                },
                judo: {
                    engine: 'mssql',
                    sandbox: true
                }
            });
    });

    test('should return correct config when passing empty overrides', () => {

        const overrides = {};

        expect(require('../../../src/runtime/config')(overrides))
            .toEqual({
                mssql: {
                    user: 'sa',
                    password: '',
                    server: 'localhost',
                    port: 1433,
                    database: 'master',
                    pool: {
                        max: 1,
                        min: 1,
                        idleTimeoutMillis: 3000
                    }
                },
                oracle: {
                    user: 'system',
                    password: '',
                    server: 'localhost',
                    port: 1521,
                    serviceName: 'XEPDB1'
                },
                judo: {
                    engine: null,
                    sandbox: false
                }
            });
    });

    test('should return correct config when passing overrides', () => {

        const overrides = {
            judo: {
                sandbox: true
            },
            mssql: {
                password: 'Pssword',
                pool: {
                    max: 10
                }
            }
        };

        expect(require('../../../src/runtime/config')(overrides))
            .toEqual({
                mssql: {
                    user: 'sa',
                    password: 'Pssword',
                    server: 'localhost',
                    port: 1433,
                    database: 'master',
                    pool: {
                        max: 10,
                        min: 1,
                        idleTimeoutMillis: 3000
                    }
                },
                oracle: {
                    user: 'system',
                    password: '',
                    server: 'localhost',
                    port: 1521,
                    serviceName: 'XEPDB1'
                },
                judo: {
                    engine: null,
                    sandbox: true
                }
            });
    });

    test('should return correct config when called twice', () => {

        const overrides = {
            judo: {
                sandbox: true
            },
            mssql: {
                password: 'Pssword'
            }
        };

        const expected = {
            mssql: {
                user: 'sa',
                password: 'Pssword',
                server: 'localhost',
                port: 1433,
                database: 'master',
                pool: {
                    max: 1,
                    min: 1,
                    idleTimeoutMillis: 3000
                }
            },
            oracle: {
                user: 'system',
                password: '',
                server: 'localhost',
                port: 1521,
                serviceName: 'XEPDB1'
            },
            judo: {
                engine: null,
                sandbox: true
            }
        };

        expect(require('../../../src/runtime/config')(overrides)).toEqual(expected);
        expect(require('../../../src/runtime/config')()).toEqual(expected);
    });

    test('should return default config ignoring invalid overrides', () => {

        const overrides = {
            value: 1,
            _: 'string'
        };

        expect(require('../../../src/runtime/config')(overrides))
            .toEqual({
                mssql: {
                    user: 'sa',
                    password: '',
                    server: 'localhost',
                    port: 1433,
                    database: 'master',
                    pool: {
                        max: 1,
                        min: 1,
                        idleTimeoutMillis: 3000
                    }
                },
                oracle: {
                    user: 'system',
                    password: '',
                    server: 'localhost',
                    port: 1521,
                    serviceName: 'XEPDB1'
                },
                judo: {
                    engine: null,
                    sandbox: false
                }
            });
    });

    test('should return correct config when importing config module', () => {

        jest.mock('../../../src/runtime/config/importer', () => {
            return {
                importConfig: (key) => {
                    return key === 'mssql' ?
                        {password: 'safe', pool: {idleTimeoutMillis: 100}} :
                        {};
                }
            };
        });

        expect(require('../../../src/runtime/config')())
            .toEqual({
                mssql: {
                    user: 'sa',
                    password: 'safe',
                    server: 'localhost',
                    port: 1433,
                    database: 'master',
                    pool: {
                        max: 1,
                        min: 1,
                        idleTimeoutMillis: 100
                    }
                },
                oracle: {
                    user: 'system',
                    password: '',
                    server: 'localhost',
                    port: 1521,
                    serviceName: 'XEPDB1'
                },
                judo: {
                    engine: null,
                    sandbox: false
                }
            });
    });

});
