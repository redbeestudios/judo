const select = require('../../../../src/engine/mssql/statements/select');

describe('Create a mssql select statement from a table name and an array of fields', function () {

    test('should create select statement for all fields given no fields', function () {
        expect(select('test_table')).toEqual('SELECT * FROM test_table');
    });

    test('should create select statement given an array with one field', function () {
        expect(select('test_table', ['a'])).toEqual('SELECT a FROM test_table');
    });

    test('should create select statement given an array with many field', function () {
        expect(select('test_table', ['a', 'field_2', 'field3'])).toEqual('SELECT a, field_2, field3 FROM test_table');
    });

    test('should add where clause when present', function () {
        expect(select('test_table', ['a', 'b'], 'a = 1 AND b = \'test\''))
            .toEqual(`SELECT a, b FROM test_table WHERE a = 1 AND b = 'test'`);
    });

    test('should create select statement with order by clause', function () {
        expect(select('test_table', ['a'], null, ['a ASC'])).toEqual('SELECT a FROM test_table ORDER BY a ASC');
        expect(select('test_table', ['a', 'b'], null, ['a ASC', 'b DESC'])).toEqual('SELECT a, b FROM test_table ORDER BY a ASC, b DESC');
    });

    test('should create select statement with where and order', function () {
        expect(select('test_table', ['a', 'b'], 'a = 1 AND b = \'test\'', ['a DESC']))
            .toEqual(`SELECT a, b FROM test_table WHERE a = 1 AND b = 'test' ORDER BY a DESC`);
    });
});
