const moment = require('moment');
const transform = require('../../src/cucumber/transform-data');

describe('transform data from cucubmer data tables', function () {

    it('should return an empty array when no data is passed', function () {
        expect(transform([])).toEqual([]);
    });

    it('should return an empty object when an empty object is passed', function () {
        expect(transform([
            {},
            {}
        ])).toEqual([
            {},
            {}
        ]);
    });

    it('should transform a number value correctly', function () {
        expect(transform([
            {
                number: '1'
            }
        ])).toEqual([
            {
                number: 1
            }
        ]);
    });

    it('should transform a string value correctly', function () {
        expect(transform([
            {
                number: 'abc'
            }
        ])).toEqual([
            {
                number: 'abc'
            }
        ]);
    });

    it('should transform a string value correctly', function () {
        expect(transform([
            {
                number: 'abc'
            }
        ])).toEqual([
            {
                number: 'abc'
            }
        ]);
    });

    it('should transform a date value correctly', function () {
        expect(transform.call(this, [
            {
                date: '2019-01-01 00:10:00'
            }
        ])).toEqual([
            {
                date: moment.utc('2019-01-01 00:10:00').toDate()
            }
        ]);
    });

    it('should transform a operation correctly', function () {
        expect(transform([
            {
                number: '2 + 2'
            }
        ])).toEqual([
            {
                number: 4
            }
        ]);
    });

    it('should transform an access to a variable correctly', function () {
        this.hello = 'world';
        expect(transform.call(this, [
            {
                number: 'hello'
            }
        ])).toEqual([
            {
                number: 'world'
            }
        ]);
    });

    it('should transform an assignment to a variable correctly', function () {
        expect(transform.call(this, [
            {
                number: 'hi = world'
            }
        ])).toEqual([
            {
                number: 'world'
            }
        ]);
        expect(this.hi).toEqual('world');
    });

    it('should transform several values correctly', function () {
        expect(transform.call(this, [
            {
                number: '1',
                text: 'hello',
                date: '2019-01-01 00:10:00'
            }
        ])).toEqual([
            {
                number: 1,
                text: 'hello',
                date: moment.utc('2019-01-01 00:10:00').toDate()
            }
        ]);
    });

});