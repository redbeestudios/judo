const {variableEqualsStep} = require('../../../src/steps');

describe('assert equality on two values', () => {

    test('should be equals when passing direct values',
        () => {
            expect(variableEqualsStep('A', 'A')).toBe(true);
            expect(variableEqualsStep(123, 123)).toBe(true);
        }
    );

    test('should be equals when comparing a stored value with a direct value',
        () => {
            this.result = 123;
            expect(variableEqualsStep.call(this, 'result', 123)).toBe(true);
        }
    );

    test('should be equals when comparing a stored value with a stored value',
        () => {
            this.result = 123;
            this.expected = 123;
            expect(variableEqualsStep.call(this, 'result', 'expected')).toBe(true);
        }
    );

    test('should propagate error when values are not equal',
        () => {
            try {
                variableEqualsStep.call(this, 'result', 'expected');
            } catch (e) {
                expect(e).toBeInstanceOf(Error);
            }
        }
    );
});
