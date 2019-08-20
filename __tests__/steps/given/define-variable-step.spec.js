const {defineVariableStep} = require('../../../src/steps');

jest.mock('../../../src/runtime/transform-data');
const transformMock = require('../../../src/runtime/transform-data');

describe('define variable in test context', () => {

    test('should store value in given key',
        () => {
            transformMock.mockImplementation(() => 'world');

            defineVariableStep.call(this, 'world', 'hello');

            expect(this.hello).toBe('world');
        }
    );

    test('should store transformed value in given key',
        () => {
            transformMock.mockImplementation(() => 1);

            defineVariableStep.call(this, 'world', 'hello');

            expect(this.hello).toBe(1);
        }
    );
});
