const argumentsParser = require('../../src/runtime/arguments-parser');

describe('Parse stored procedure arguments from docType', function () {

    it('should parse one argument with its type from one line with it', function () {
        expect(argumentsParser(`my_arg Int 1`)).toEqual([
            {name: 'my_arg', type: 'Int', value: 1}
        ]);
        expect(argumentsParser(`my_arg NVarChar hola`)).toEqual([
            {name: 'my_arg', type: 'NVarChar', value: 'hola'}
        ]);
        expect(argumentsParser(`my_arg NVarChar 'hola mundo'`)).toEqual([
            {name: 'my_arg', type: 'NVarChar', value: 'hola mundo'}
        ]);
        expect(argumentsParser(`my_arg Bit true`)).toEqual([
            {name: 'my_arg', type: 'Bit', value: true}
        ]);
        expect(argumentsParser(`my_arg DateTime 2019-01-02`)).toEqual([
            {name: 'my_arg', type: 'DateTime', value: new Date('2019-01-02')}
        ]);
    });

    it('should parse multiple arguments with type from multiple lines', function () {
        expect(argumentsParser(
            'my_number Int 1\nmy_string NVarChar hola'
        )).toEqual([
            {name: 'my_number', type: 'Int', value: 1},
            {name: 'my_string', type: 'NVarChar', value: 'hola'}
        ]);
    });

    it('should parse one argument without a type from one line', function () {
        expect(argumentsParser(
            'my_number 1'
        )).toEqual([
            {name: 'my_number', value: 1}
        ]);
    });

    it('should trow an exception when an invalid type is passed', function () {
        expect(() => argumentsParser('my_letter Char 1'))
            .toThrowError('Char is not a valid type. Use any of: NVarChar, Int, Bit, DateTime');
        expect(() => argumentsParser('my_letter Something 1'))
            .toThrowError('Something is not a valid type. Use any of: NVarChar, Int, Bit, DateTime');
    });

    it('should parse an output argument given an OUTPUT at the end', function () {
        expect(argumentsParser('my_number 1 OUTPUT'))
            .toEqual([
                {name: 'my_number', value: 1, output: true}
            ]);
        expect(argumentsParser('my_number Int 1 OUTPUT'))
            .toEqual([
                {name: 'my_number', value: 1, type: 'Int', output: true}
            ]);
    });

    it('should parse decimals without a type from one line', function () {
        expect(argumentsParser(
            'my_number 10.0'
        )).toEqual([
            {name: 'my_number', value: 10.0}
        ]);
    });

    it('should parse nulls given an OUTPUT at the end', function () {
        expect(argumentsParser('my_arg null OUTPUT'))
            .toEqual([
                {name: 'my_arg', value: null, output: true}
            ]);
    });

    it('should parse strings without quotes given an OUTPUT at the end', function () {
        expect(argumentsParser('my_string hola OUTPUT'))
            .toEqual([
                {name: 'my_string', value: 'hola', output: true}
            ]);
    });

});