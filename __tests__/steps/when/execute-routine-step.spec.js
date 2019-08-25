const {executeRoutineStep} = require('../../../src/steps');
const {executeRoutineWithArgsStep} = require('../../../src/steps');

jest.mock('../../../src/runtime/config', () => () => {
    return {judo: {engine: 'mssql'}};
});

jest.mock('../../../src/engine/operations');
const {exec: execMock} = require('../../../src/engine/operations');

describe('execute a routine', () => {

    test('should execute a routine defined in the database',
        async () => {
            execMock.mockImplementation(() => Promise.resolve({
                    returnValue: 'MY RESULT'
                }));

            const result = await executeRoutineStep.call(this, 'my_routine');

            expect(this.$returned).toBe('MY RESULT');
            expect(result).toEqual({
                returnValue: 'MY RESULT'
            });
        }
    );

    test('should propagate the error', () => {
        execMock.mockImplementation(() => Promise.reject('An error'));

        return executeRoutineStep('my_routine')
            .catch(e => expect(e).toBe('An error'));
    });

    test('should execute a routine defined in the database when calling with args',
        async () => {
            jest.mock('../../../src/runtime/arguments-parser',
                () => jest.fn(() => [
                    {
                        name: 'my_arg',
                        value: 1
                    }
                ]));

            execMock.mockImplementation(() => Promise.resolve({
                    returnValue: 'MY RESULT'
                }));

            const result = await executeRoutineWithArgsStep.call(this, 'my_routine', 'my_arg 1');

            expect(this.$returned).toBe('MY RESULT');
            expect(result).toEqual({
                returnValue: 'MY RESULT'
            });
        }
    );

    test('should store ouput arguments in context',
        async () => {
            jest.mock('../../../src/runtime/arguments-parser',
                () => jest.fn(() => [
                    {
                        name: 'my_arg',
                        value: 1,
                        output: true
                    }
                ]));

            execMock.mockImplementation(() => Promise.resolve({
                    returnValue: 'MY RESULT',
                    output: {
                        my_arg: 2
                    }
                }));

            const result = await executeRoutineWithArgsStep.call(this, 'my_routine', 'my_arg 1 OUTPUT');

            expect(this.$returned).toBe('MY RESULT');
            expect(this.$my_arg).toBe(2);
            expect(result).toEqual({
                returnValue: 'MY RESULT',
                output: {
                    my_arg: 2
                }
            });
        }
    );

    test('should propagate the error when calling with args', () => {
        execMock.mockImplementation(() => Promise.reject('An error'));

        return executeRoutineWithArgsStep('my_routine', 'alias')
            .catch(e => expect(e).toBe('An error'));
    });
});
