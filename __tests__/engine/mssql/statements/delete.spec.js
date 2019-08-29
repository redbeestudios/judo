const deleteStatement = require('../../../../src/engine/mssql/statements/delete');

describe('Create a SQL statement to empty a table', function () {

    test('should create DELETE FROM statement given a table name', function () {
        expect(deleteStatement('test_table')).toEqual('DELETE FROM test_table');
    });

});
