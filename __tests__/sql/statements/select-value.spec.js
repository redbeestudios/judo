const selectValue = require('../../../src/sql/statements/select-value');

describe('Create a sql select statement from a table name and an array of fields', function () {

    it('should create select statement given a number value', function () {
        expect(selectValue('field_a', 'test_table', 'field_b', 1)).toEqual('SELECT field_a FROM test_table WHERE field_b = 1');
    });

    it('should create select statement given a string value', function () {
        expect(selectValue('field_a', 'test_table', 'field_b', 'hello')).toEqual('SELECT field_a FROM test_table WHERE field_b = \'hello\'');
    });

    it('should create select statement given a null value', function () {
        expect(selectValue('field_a', 'test_table', 'field_b', null)).toEqual('SELECT field_a FROM test_table WHERE field_b = NULL');
    });
});
