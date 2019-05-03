const inserts = require('../../src/sql/statements/insert.js');

describe('Create sql inserts from a collection of objects', function () {

    it('should create insert statement given a one number column', function () {
        expect(inserts('test_table', [{
            value: 1
        }])).toEqual('INSERT INTO test_table (value)\nVALUES\n(1);');
    });

    it('should create insert statement given a one string column', function () {
        expect(inserts('test_table', [{
            value: 'abc'
        }])).toEqual('INSERT INTO test_table (value)\nVALUES\n(\'abc\');');
    });

    it('should create insert statement given a null value', function () {
        expect(inserts('test_table', [{
            value: null
        }])).toEqual('INSERT INTO test_table (value)\nVALUES\n(NULL);');
    });

    it('should create insert statement given a undefined value', function () {
        expect(inserts('test_table', [{
            value: undefined
        }])).toEqual('INSERT INTO test_table (value)\nVALUES\n(NULL);');
    });

    it('should create insert statement given a true value', function () {
        expect(inserts('test_table', [{
            value: true
        }])).toEqual('INSERT INTO test_table (value)\nVALUES\n(1);');
    });

    it('should create insert statement given a false value', function () {
        expect(inserts('test_table', [{
            value: false
        }])).toEqual('INSERT INTO test_table (value)\nVALUES\n(0);');
    });

    it('should create insert statement given several values', function () {
        expect(inserts('test_table', [
            {
                valueString: 'abc',
                valueNumber: 1,
                valueBoolean: false
            }
        ])).toEqual('INSERT INTO test_table (valueString, valueNumber, valueBoolean)\nVALUES\n(\'abc\', 1, 0);');
    });

    it('should create insert statement for several rows', function () {
        expect(inserts('test_table', [
            {value: 1},
            {value: 1},
            {value: 1},
        ])).toEqual('INSERT INTO test_table (value)\nVALUES\n(1),\n(1),\n(1);');
    });

    it('should create two insert statements for three rows when threshold is 2', function () {
        expect(inserts('test_table', [
            {value: 1},
            {value: 1},
            {value: 1},
        ], 2)).toEqual('INSERT INTO test_table (value)\nVALUES\n(1),\n(1);' +
            '\n' +
            'INSERT INTO test_table (value)\nVALUES\n(1);');
    });

    it('should create two insert statements for three rows when threshold is 2', function () {
        expect(inserts('test_table', [
            {value: 1},
            {value: 1},
            {value: 1},
            {value: 1},
            {value: 1},
        ], 2)).toEqual(
            'INSERT INTO test_table (value)\nVALUES\n(1),\n(1);' +
            '\n' +
            'INSERT INTO test_table (value)\nVALUES\n(1),\n(1);' +
            '\n' +
            'INSERT INTO test_table (value)\nVALUES\n(1);');
    });
});
