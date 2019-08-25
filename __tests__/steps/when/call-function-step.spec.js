const {callFunctionStep} = require('../../../src/steps');

jest.mock('../../../src/runtime/config', () => () => {
    return {judo: {engine: 'mssql'}};
});

jest.mock('../../../src/engine/operations');
const {callFunction: callFunctionMock} = require('../../../src/engine/operations');

describe('call a function on the engine and store the result', () => {

    test('should run the function against the engine and store the result in the key and pass the result',
        async () => {
            callFunctionMock.mockImplementation(() => Promise.resolve(42));

            const result = await callFunctionStep.call(this, 'MAX(42,41)', 'max');

            expect(this.max).toBe(42);
            expect(result).toBe(42);
        }
    );

    test('should propagate the error', () => {
        callFunctionMock.mockImplementation(() => Promise.reject('An error'));

        return callFunctionStep('MIN(0,0)', 'min')
            .catch(e => expect(e).toBe('An error'));
    });
});
