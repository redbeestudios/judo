const {defineVariableStep} = require('../../../src/steps');

jest.mock('../../../src/runtime/config', () => () => {
    return {judo: {engine: 'mssql'}};
});


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
