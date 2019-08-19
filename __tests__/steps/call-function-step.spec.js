const step = require('../../src/steps').callFunctionStep;

jest.mock('../../src/engine/operations');
const operations = require('../../src/engine/operations');

describe('call a function on the engine and store the result', () => {

    test('should run the function against the engine and store the result in the key and pass the result',
        async () => {
            spyOn(operations, 'callFunction')
                .mockImplementation(() => Promise.resolve(42));

            const result = await step.call(this, 'MAX(42,41)', 'max');

            expect(this.max).toBe(42);
            expect(result).toBe(42);
        }
    );

    test('should propagate the error', () => {
        spyOn(operations, 'callFunction')
            .mockImplementation(() => Promise.reject('An error'));

        return step('MIN(0,0)', 'min')
            .catch(e => expect(e).toBe('An error'));
    });
});
