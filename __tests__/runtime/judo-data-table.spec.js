const JudoDataTable = require('../../src/runtime/judo-data-table');

describe('Judo Data Table', function () {

    test('a datatable with no hashes should be invalid', function () {
        let cucumberDataTableMock = {
            hashes: () => []
        };
        expect(() => new JudoDataTable(cucumberDataTableMock))
            .toThrowError('Invalid data table');
    });

    test('it builds judo data table from cucumber data table correctly', function () {
        let cucumberDataTableMock = {
            rawTable: [
                ['field'],
                [1]
            ],
            raw: function () {
                return this.rawTable;
            },
            hashes: () => [
                {
                    field: 1
                }
            ]
        };
        let jdt = new JudoDataTable(cucumberDataTableMock);

        expect(jdt.fields()).toEqual(['field']);
        expect(jdt.order()).toEqual([]);
        expect(jdt.body()).toEqual([
            {
                field: 1
            }
        ]);
        expect(jdt.criteria()).toEqual([
            {
                field: 1
            }
        ]);
    });

});
