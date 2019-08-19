const toSQLValue = require('../../../src/engine/utils/to-sql-value');
const moment = require('moment');

describe('Convert js values to sql', function () {

    test('should add quotes to string', function () {
        expect(toSQLValue('word')).toEqual('\'word\'');
    });

    test('should add quotes to string even if number', function () {
        expect(toSQLValue('1')).toEqual('\'1\'');
    });

    test('should leave number as is', function () {
        expect(toSQLValue(1)).toEqual(1);
    });

    test('should convert true to 1', function () {
        expect(toSQLValue(true)).toEqual(1);
    });

    test('should convert false to 0', function () {
        expect(toSQLValue(false)).toEqual(0);
    });

    test('should convert null to NULL', function () {
        expect(toSQLValue(null)).toEqual('NULL');
    });

    test('should convert undefined to NULL', function () {
        expect(toSQLValue(undefined)).toEqual('NULL');
    });

    test('should convert Date to SQL datetime accepted format', function () {
        spyOn(moment, 'utc').and.returnValue({
            format: () => '2019-05-01 00:00:00'
        });
        let d = new Date('2019-05-01 00:00:00');
        expect(toSQLValue(d)).toEqual('\'2019-05-01 00:00:00\'');
    });
});
