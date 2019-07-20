const moment = require('moment');
const whereEachRow = require('../../../../src/engine/statements/helpers/where-each-row');

describe('Create a concatenation of ORs for each row in data', function () {

    it('should return an empty string if data is empty', function () {
        expect(whereEachRow([])).toEqual('');
        expect(whereEachRow([{}])).toEqual('');
        expect(whereEachRow([{}, {}])).toEqual('');
    });

    it('should create a single equal given one row with one column', function () {
        expect(whereEachRow([
            {
                my_letter: 'ABC'
            }
        ])).toEqual('(my_letter = \'ABC\')');
    });

    it('should separate columns with ANDs given one row with many columns', function () {
        expect(whereEachRow([
            {
                my_letter: 'ABC',
                my_number: 1
            }
        ])).toEqual('(my_letter = \'ABC\' AND my_number = 1)');

        expect(whereEachRow([
            {
                my_letter: 'ABC',
                my_number: 1,
                my_date: moment.utc('2019-01-01 00:00:00').toDate()
            }
        ])).toEqual('(my_letter = \'ABC\' AND my_number = 1 AND my_date = \'2019-01-01 00:00:00\')');
    });

    it('should separate rows with ORs given many rows', function () {
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


    it('should separate rows with ORs and columns with ANDs given many rows and columns', function () {
        expect(whereEachRow([
            {
                my_letter: 'ABC',
                my_number: 1,
                my_date: moment.utc('2019-01-01 00:00:00').toDate()
            },
            {
                my_letter: 'DEF',
                my_number: 2,
                my_date: moment.utc('2018-01-01 00:00:00').toDate()
            },
            {
                my_letter: 'GHI',
                my_number: 3,
                my_date: moment.utc('2017-01-01 00:00:00').toDate()
            }
        ])).toEqual(
            '(my_letter = \'ABC\' AND my_number = 1 AND my_date = \'2019-01-01 00:00:00\') OR ' +
            '(my_letter = \'DEF\' AND my_number = 2 AND my_date = \'2018-01-01 00:00:00\') OR ' +
            '(my_letter = \'GHI\' AND my_number = 3 AND my_date = \'2017-01-01 00:00:00\')'
        );
    });

});
