const toOracleValue = require('../../../../../src/engine/oracle/statements/helpers/to-oracle-value');
const moment = require('moment/moment');

describe('Convert js values to oracle', function () {

    test('should add quotes to string', function () {
        expect(toOracleValue('word')).toEqual('\'word\'');
    });

    test('should add quotes to string even if number', function () {
        expect(toOracleValue('1')).toEqual('\'1\'');
    });

    test('should leave number as is', function () {
        expect(toOracleValue(1)).toEqual(1);
    });

    test('should convert true to 1', function () {
        expect(toOracleValue(true)).toEqual(1);
    });

    test('should convert false to 0', function () {
        expect(toOracleValue(false)).toEqual(0);
    });

    test('should convert null to NULL', function () {
        expect(toOracleValue(null)).toEqual('NULL');
    });

    test('should convert undefined to NULL', function () {
        expect(toOracleValue(undefined)).toEqual('NULL');
    });

    test('should convert Date to ORACLE TO_DATE function', function () {
        spyOn(moment, 'utc').and.returnValue({
            format: () => '2019-05-01 00:00:00'
        });
        let d = new Date('2019-05-01 00:00:00');
        expect(toOracleValue(d)).toEqual('TO_DATE(\'2019-05-01 00:00:00\', \'YYYY-MM-DD HH:MI:SS\')');
    });
});
