const select = require('../../../src/sql/statements/select');

describe('Create a sql select statement from a table name and an array of fields', function () {

    it('should create select statement given an array with one field', function () {
        expect(select('test_table', ['a'])).toEqual('SELECT a FROM test_table');
    });

    it('should create select statement given an array with many field', function () {
        expect(select('test_table', ['a', 'field_2', 'field3'])).toEqual('SELECT a, field_2, field3 FROM test_table');
    });

    it('should create select statement for all fields given no fields', function () {
        expect(select('test_table')).toEqual('SELECT * FROM test_table');
    });
});
