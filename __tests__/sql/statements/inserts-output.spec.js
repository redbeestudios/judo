const inserts = require('../../../src/engine/statements/insert-output');

describe('Create sql inserts that output the result from a collection of objects', function () {

    test('should create a correct INSERT OUTPUT statement given a one number column', function () {
        expect(inserts('test_table', [{
            value: 1
        }])).toEqual('INSERT INTO test_table (value) OUTPUT inserted.*\nSELECT 1;');
    });

    test('should create a correct INSERT OUTPUT statement given a one string column', function () {
        expect(inserts('test_table', [{
            value: 'abc'
        }])).toEqual('INSERT INTO test_table (value) OUTPUT inserted.*\nSELECT \'abc\';');
    });

    test('should create a correct INSERT OUTPUT statement given a null value', function () {
        expect(inserts('test_table', [{
            value: null
        }])).toEqual('INSERT INTO test_table (value) OUTPUT inserted.*\nSELECT NULL;');
    });

    test('should create a correct INSERT OUTPUT statement given a undefined value', function () {
        expect(inserts('test_table', [{
            value: undefined
        }])).toEqual('INSERT INTO test_table (value) OUTPUT inserted.*\nSELECT NULL;');
    });

    test('should create a correct INSERT OUTPUT statement given a boolean value', function () {
        expect(inserts('test_table', [{
            value: true
        }])).toEqual('INSERT INTO test_table (value) OUTPUT inserted.*\nSELECT 1;');
        expect(inserts('test_table', [{
            value: false
        }])).toEqual('INSERT INTO test_table (value) OUTPUT inserted.*\nSELECT 0;');
    });

    test('should create a correct INSERT OUTPUT statement given several values', function () {
        expect(inserts('test_table', [
            {
                valueString: 'abc',
                valueNumber: 1,
                valueBoolean: false
            }
        ])).toEqual('INSERT INTO test_table (valueString, valueNumber, valueBoolean) OUTPUT inserted.*\nSELECT \'abc\', 1, 0;');
    });

    test('should create a correct INSERT OUTPUT statement for several rows', function () {
        expect(inserts('test_table', [
            {value: 1},
            {value: 1},
            {value: 1}
        ])).toEqual('INSERT INTO test_table (value) OUTPUT inserted.*\nSELECT 1\nUNION ALL SELECT 1\nUNION ALL SELECT 1;');
    });

    test('should create 2 correct INSERT OUTPUT statements for 3 rows when threshold is 2', function () {
        expect(inserts('test_table', [
            {value: 1},
            {value: 1},
            {value: 1}
        ], 2)).toEqual(
            'INSERT INTO test_table (value) OUTPUT inserted.*\nSELECT 1\nUNION ALL SELECT 1;' +
            '\n' +
            'INSERT INTO test_table (value) OUTPUT inserted.*\nSELECT 1;'
        );
    });

    test('should create 3 correct INSERT OUTPUT statements for 5 rows when threshold is 2', function () {
        expect(inserts('test_table', [
            {value: 1},
            {value: 1},
            {value: 1},
            {value: 1},
            {value: 1},
        ], 2)).toEqual(
            'INSERT INTO test_table (value) OUTPUT inserted.*\nSELECT 1\nUNION ALL SELECT 1;' +
            '\n' +
            'INSERT INTO test_table (value) OUTPUT inserted.*\nSELECT 1\nUNION ALL SELECT 1;' +
            '\n' +
            'INSERT INTO test_table (value) OUTPUT inserted.*\nSELECT 1;');
    });
});
