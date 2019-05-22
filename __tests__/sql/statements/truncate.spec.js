const truncate = require('../../../src/sql/statements/delete');

describe('Create a SQL statement to empty a table', function () {

    it('should create DELETE FROM statement given a table name', function () {
        expect(truncate('test_table')).toEqual('DELETE FROM test_table;');
    });

});
