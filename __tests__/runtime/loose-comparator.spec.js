const compare = require('../../src/runtime/loose-comparator');

describe('compare values in a more flexible manner', function () {

    it('should return true when comparing undefined', function () {
        expect(compare()).toBe(true);
    });

    it('should return null when comparing arrays', function () {
        expect(compare([], [])).toBe(null);
        expect(compare([1, 2, 3], [1, 2, 3])).toBe(null);
    });

    it('should return null when comparing objects', function () {
        expect(compare({}, {})).toBe(null);
        expect(compare({a: 1}, {a: 1})).toBe(null);
    });

    it('should compare  numbers correctly', function () {
        expect(compare(1, 1)).toBe(true);
        expect(compare(2, 2)).toBe(true);
        expect(compare('3', 3)).toBe(true);
        expect(compare(4, 3)).toBe(false);
    });

    it('should compare strings correctly', function () {
        expect(compare('', '')).toBe(true);
        expect(compare('a', 'a')).toBe(true);
        expect(compare('hello', 'hello')).toBe(true);
        expect(compare('hello world', 'hello world')).toBe(true);
        expect(compare('hello world', 'hello world!')).toBe(false);
    });

    it('should compare booleans to booleans and booleans to zero or one correctly', function () {
        expect(compare(true, true)).toBe(true);
        expect(compare(false, false)).toBe(true);
        expect(compare(1, true)).toBe(true);
        expect(compare(0, false)).toBe(true);
        expect(compare(true, false)).toBe(false);
    });

    it('should compare dates considering an error of 60 seconds', function () {
        const d1 = new Date();
        const d2 = new Date();
        expect(compare(d1, d1)).toBe(true);
        expect(compare(d1, d2)).toBe(true);

        expect(compare(new Date('2019-01-01 00:00:00'), new Date('2019-01-01 00:00:30')))
            .toBe(true);

        expect(compare(new Date('2019-01-01 10:00:00'), new Date('2018-01-01 10:00:00')))
            .toBe(false);
        expect(compare(new Date('2019-01-01 10:00:00'), new Date('2019-01-01 10:01:00')))
            .toBe(false);
    });
});