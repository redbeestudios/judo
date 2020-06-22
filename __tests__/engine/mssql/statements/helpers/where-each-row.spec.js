const whereEachRow = require('../../../../../src/engine/mssql/statements/helpers/where-each-row');

describe('Create a concatenation of ORs for each row in data', function () {

    test('should return an empty string if data is empty', function () {
        expect(whereEachRow([])).toEqual('');
        expect(whereEachRow([{}])).toEqual('');
        expect(whereEachRow([{}, {}])).toEqual('');
    });

    test('should create a single equal given one row with one column', function () {
        expect(whereEachRow([
            {
                my_letter: 'ABC'
            }
        ])).toEqual('(my_letter = \'ABC\')');
    });

    test('should use IS NULL when value is null given one row with one column', function () {
        expect(whereEachRow([
            {
                my_letter: null
            }
        ])).toEqual('(my_letter IS NULL)');
    });

    test('should separate columns with ANDs given one row with many columns', function () {
        expect(whereEachRow([
            {
                my_letter: 'ABC',
                my_number: 1
            }
        ])).toEqual('(my_letter = \'ABC\' AND my_number = 1)');

        expect(whereEachRow([
            {
                my_letter: 'ABC',
                my_number: 1
            }
        ])).toEqual('(my_letter = \'ABC\' AND my_number = 1)');
    });

    test('should separate rows with ORs given many rows', function () {
        expect(whereEachRow([
            {
                my_letter: 'ABC'
            },
            {
                my_letter: 'DEF'
            },
            {
                my_letter: 'GHI'
            }
        ])).toEqual('(my_letter = \'ABC\') OR (my_letter = \'DEF\') OR (my_letter = \'GHI\')');
    });


    test('should separate rows with ORs and columns with ANDs given many rows and columns', function () {
        expect(whereEachRow([
            {
                my_letter: 'ABC',
                my_number: 1
            },
            {
                my_letter: 'DEF',
                my_number: null
            },
            {
                my_letter: 'GHI',
                my_number: 3
            }
        ])).toEqual(
            '(my_letter = \'ABC\' AND my_number = 1) OR ' +
            '(my_letter = \'DEF\' AND my_number IS NULL) OR ' +
            '(my_letter = \'GHI\' AND my_number = 3)'
        );
    });

});
