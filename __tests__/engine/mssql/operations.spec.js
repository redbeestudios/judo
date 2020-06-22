const sql = require('mssql');
const ops = require('../../../src/engine/mssql/operations');

jest.mock('../../../src/engine/mssql/pool');
const {request: requestMock} = require('../../../src/engine/mssql/pool');

describe('MSSQL Operations', function () {

    describe('Execute a SQL Stored Procedure', function () {

        let executeMock = {}, outputs = [], inputs = [];

        requestMock.mockImplementation(() => {
            return {
                input: (...args) => {
                    inputs.push(args);
                },
                output: (...args) => {
                    outputs.push(args);
                },
                execute: sp => executeMock[sp]()
            };
        });

        beforeEach(() => {
            executeMock = {};
            outputs = [];
            inputs = [];
        });

        test('should execute procedure without args', async function () {
            executeMock['my_sp'] = () => Promise.resolve({
                returnValue: 1,
                output: null
            });

            await expect(ops.exec('my_sp')).resolves.toEqual(
                {
                    returnValue: 1,
                    output: null
                }
            );
        });

        test('should reject when an arg is unknown to the engine', async function () {
            executeMock['my_sp'] = () => Promise.resolve({
                returnValue: 1,
                output: null
            });

            let args = [
                {
                    name: 'my_arg',
                    type: 'Flench',
                    value: 1
                }
            ];

            await expect(ops.exec('my_sp', args)).rejects.toEqual(
                new Error('Invalid argument type Flench.')
            );
        });

        test('should add arguments to request correctly when type is present', function () {
            let aValidExecutionResult = {
                returnValue: 1,
                output: null
            };

            executeMock['my_sp'] = () => Promise.resolve(aValidExecutionResult);

            let args = [
                {
                    name: 'my_int',
                    type: 'Int',
                    value: 1,
                    output: true
                },
                {
                    name: 'my_bool',
                    type: 'Bit',
                    value: true
                }
            ];

            return ops.exec('my_sp', args)
                .then(result => {
                    expect(result).toEqual(aValidExecutionResult);

                    expect(outputs).toEqual([
                        ['my_int', {type: sql.TYPES.Int}, 1]
                    ]);

                    expect(inputs).toEqual([
                        ['my_bool', {type: sql.TYPES.Bit}, true]
                    ]);
                });
        });

        test('should add arguments to request correctly when type is not present', function () {
            let aValidExecutionResult = {
                returnValue: 1,
                output: null
            };

            executeMock['my_sp'] = () => Promise.resolve(aValidExecutionResult);

            let args = [
                {
                    name: 'my_int',
                    value: 1,
                    output: true
                },
                {
                    name: 'my_bool',
                    value: true
                }
            ];

            return ops.exec('my_sp', args)
                .then(result => {
                    expect(result).toEqual(aValidExecutionResult);

                    expect(outputs).toEqual([
                        ['my_int', null, 1]
                    ]);

                    expect(inputs).toEqual([
                        ['my_bool', true]
                    ]);
                });
        });

    });

});
