const argumentsParser = require('../../src/runtime/arguments-parser');

jest.mock('../../src/runtime/transform-data');
const transformMock = require('../../src/runtime/transform-data');

describe('Parse stored procedure arguments from docType', function () {

    test('should parse one argument of type Int from one line with it', () => {
        transformMock.mockImplementation(() => 1);
        expect(argumentsParser(`my_arg Int 1`)).toEqual([
            {name: 'my_arg', type: 'Int', value: 1}
        ]);
    });
    test('should parse one argument of type NVarChar from one line with it', () => {
        transformMock.mockImplementation(() => 'hola');
        expect(argumentsParser(`my_arg NVarChar hola`)).toEqual([
            {name: 'my_arg', type: 'NVarChar', value: 'hola'}
        ]);
    });
    test('should parse one argument of type Bit from one line with it', () => {
        transformMock.mockImplementation(() => true);
        expect(argumentsParser(`my_arg Bit true`)).toEqual([
            {name: 'my_arg', type: 'Bit', value: true}
        ]);
    });
    test('should parse one argument of type DateTime from one line with it', () => {
        transformMock.mockImplementation(() => new Date('2019-01-02'));
        expect(argumentsParser(`my_arg DateTime 2019-01-02`)).toEqual([
            {name: 'my_arg', type: 'DateTime', value: new Date('2019-01-02')}
        ]);
    });

    test('should parse multiple arguments with type from multiple lines', function () {
        transformMock.mockImplementation((value) => {
            switch (value) {
                case '1':
                    return 1;
                case 'hola':
                    return 'hola';
            }
        });
        expect(argumentsParser(
            'my_number Int 1\nmy_string NVarChar hola'
        )).toEqual([
            {name: 'my_number', type: 'Int', value: 1},
            {name: 'my_string', type: 'NVarChar', value: 'hola'}
        ]);
    });

    test('should parse one argument without a type from one line', function () {
        transformMock.mockImplementation(() => 1);
        expect(argumentsParser(
            'my_number 1'
        )).toEqual([
            {name: 'my_number', value: 1}
        ]);
    });

    test('should trow an exception when an invalid type is passed', function () {
        expect(() => argumentsParser('my_letter Char 1'))
            .toThrowError('Char is not a valid type. Use any of: NVarChar, Int, Bit, DateTime');
        expect(() => argumentsParser('my_letter Something 1'))
            .toThrowError('Something is not a valid type. Use any of: NVarChar, Int, Bit, DateTime');
    });

    test('should parse an output argument given an OUTPUT at the end', function () {
        transformMock.mockImplementation(() => 1);
        expect(argumentsParser('my_number 1 OUTPUT'))
            .toEqual([
                {name: 'my_number', value: 1, output: true}
            ]);
        expect(argumentsParser('my_number Int 1 OUTPUT'))
            .toEqual([
                {name: 'my_number', value: 1, type: 'Int', output: true}
            ]);
    });

    test('should parse decimals without a type from one line', function () {
        transformMock.mockImplementation(() => 10.0);
        expect(argumentsParser(
            'my_number 10.0'
        )).toEqual([
            {name: 'my_number', value: 10.0}
        ]);
    });

    test('should parse nulls given an OUTPUT at the end', function () {
        transformMock.mockImplementation(() => null);
        expect(argumentsParser('my_arg null OUTPUT'))
            .toEqual([
                {name: 'my_arg', value: null, output: true}
            ]);
    });

    test('should parse strings without quotes given an OUTPUT at the end', function () {
        transformMock.mockImplementation(() => 'hola');
        expect(argumentsParser('my_string hola OUTPUT'))
            .toEqual([
                {name: 'my_string', value: 'hola', output: true}
            ]);
    });

    test('parses variable access correctly', () => {
        this.stored = 'value';

        transformMock.mockImplementation(function () {
            // noinspection JSPotentiallyInvalidUsageOfThis
            return this.stored;
        });

        expect(argumentsParser.call(this, `my_arg Int $stored`)).toEqual([
            {name: 'my_arg', type: 'Int', value: 'value'}
        ]);
    });

});
