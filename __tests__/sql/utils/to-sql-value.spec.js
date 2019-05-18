const toSQLValue = require('../../../src/sql/utils/to-sql-value');

describe('Convert js values to sql', function () {

    it('should add quotes to string', function () {
        expect(toSQLValue('word')).toEqual('\'word\'');
    });

    it('should add quotes to string even if number', function () {
        expect(toSQLValue('1')).toEqual('\'1\'');
    });

    it('should leave number as is', function () {
        expect(toSQLValue(1)).toEqual(1);
    });

    it('should convert true to 1', function () {
        expect(toSQLValue(true)).toEqual(1);
    });

    it('should convert false to 0', function () {
        expect(toSQLValue(false)).toEqual(0);
    });

    it('should convert null to NULL', function () {
        expect(toSQLValue(null)).toEqual('NULL');
    });

    it('should convert undefined to NULL', function () {
        expect(toSQLValue(undefined)).toEqual('NULL');
    });

    it('should convert Date to SQL datetime accepted format', function () {
        let d = new Date('2019-05-01 00:00:00');
        expect(toSQLValue(d)).toEqual('\'2019-05-01 03:00:00\'');
    });
});