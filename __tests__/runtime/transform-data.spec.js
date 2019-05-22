const moment = require('moment/moment');
const transform = require('../../src/runtime/transform-data');

describe('transform data from cucumber data tables', function () {

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

    it('should transform a null or undefined correctly', function () {
        expect(transform('null')).toEqual(null);
        expect(transform('undefined')).toEqual(undefined);
        expect(transform('NULL')).toEqual(null);
    });

    it('should transform a number value correctly', function () {
        expect(transform('1')).toEqual(1);
    });

    it('should transform a string value correctly', function () {
        expect(transform('abc')).toEqual('abc');
        expect(transform('\'abc\'')).toEqual('abc');
        expect(transform('\'\'')).toEqual('');
    });

    it('should transform a date value correctly', function () {
        expect(transform('2019-01-01 00:10:00')).toEqual(moment.utc('2019-01-01 00:10:00').toDate());
    });

    it('should transform a operation correctly', function () {
        expect(transform('2 + 2')).toEqual(4);
    });

    it('should transform an access to a variable correctly', function () {
        this.hello = 'world';
        this.result = 10;
        expect(transform.call(this, 'hello')).toEqual('world');
        expect(transform.call(this, 'result')).toEqual(10);
    });

    it('should transform an assignment to a variable correctly', function () {
        expect(transform.call(this, 'hi = world')).toEqual('world');
        expect(this.hi).toEqual('world');
    });

    it('should transform an access to the last insert with $', function () {
        this.$ = [
            {
                id: 1,
                letter: 'a'
            }
        ];
        expect(transform.call(this, '$>1>id')).toEqual(1);
        expect(transform.call(this, '$>1>letter')).toEqual('a');
    });

    it('should transform several values correctly', function () {
        this.letter = 'A';
        expect(transform.call(this, [
            {
                number: '1',
                text: 'hello',
                date: '2019-01-01 00:10:00',
                my_letter: 'letter'
            }
        ])).toEqual([
            {
                number: 1,
                text: 'hello',
                date: moment.utc('2019-01-01 00:10:00').toDate(),
                my_letter: 'A'
            }
        ]);
    });

    it('should transform several rows correctly', function () {
        this.letter = 'A';
        expect(transform.call(this, [
            {
                number: '1',
                text: 'hello'
            },
            {
                date: '2019-01-01 00:10:00',
                my_letter: 'letter'
            }
        ])).toEqual([
            {
                number: 1,
                text: 'hello'
            },
            {
                date: moment.utc('2019-01-01 00:10:00').toDate(),
                my_letter: 'A'
            }
        ]);
    });

    it('should transform a string with variables correctly', function () {
        this.$my_var = 5;
        this.$my_letter = 'A';
        expect(transform.call(this, 'my var $my_var')).toEqual('my var 5');
        expect(transform.call(this, 'my letter $my_letter')).toEqual('my letter A');
        expect(transform.call(this, 'my variables $my_letter and $my_var')).toEqual('my variables A and 5');
        expect(transform.call(this, 'my lettervar $my_letter$my_var')).toEqual('my lettervar A5');
        expect(transform.call(this, 'my value \\$my_number')).toEqual('my value $my_number');
        expect(transform.call(this, 'my value $my_number')).toEqual('my value $my_number');
    });

});