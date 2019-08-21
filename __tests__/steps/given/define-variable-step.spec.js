const {defineVariableStep} = require('../../../src/steps');

describe('define variable in test context', () => {

    test('should store value in given key',
        () => {
            defineVariableStep.call(this, 'world', 'hello');

            expect(this.hello).toBe('world');
        }
    );

    test('should store transformed value in given key',
        () => {
            this.world = 1;
            defineVariableStep.call(this, 'world', 'hello');

            expect(this.hello).toBe(1);
        }
    );
});
