const truncate = require('../../../src/sql/statements/truncate');

describe('Create a SQL truncate table statement', function () {

    it('should create TRUNCATE statement given a table name', function () {
        expect(truncate('test_table')).toEqual('DELETE FROM test_table;');
    });

});
