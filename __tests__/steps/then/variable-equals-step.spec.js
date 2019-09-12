const {variableEqualsStep} = require('../../../src/steps');

jest.mock('../../../src/runtime/config', () => () => {
    return {judo: {engine: 'mssql'}};
});


describe('assert equality on two values', () => {

    test('should be equals when passing direct values',
        async () => {
            expect(await variableEqualsStep('A', 'A')).toBe(true);
        }
    );

    test('should be equals when comparing a stored value with a direct value',
        async () => {
            this.result = 123;
            expect(await variableEqualsStep.call(this, 'result', '123')).toBe(true);
        }
    );

    test('should be equals when comparing a stored value with a stored value',
        async () => {
            this.result = 123;
            this.expected = 123;
            expect(await variableEqualsStep.call(this, 'result', 'expected')).toBe(true);
        }
    );

    test('should propagate error when values are not equal',
        () => {
            variableEqualsStep.call(this, 'result', 'expected')
                .catch(error =>
                    expect(error).toBeInstanceOf(Error)
                );
        }
    );
});
