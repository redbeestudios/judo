const {tableIsEmptyStep} = require('../../../src/steps');

jest.mock('../../../src/runtime/config', () => () => {
    return {judo: {engine: 'mssql'}};
});

jest.mock('../../../src/engine/operations');
const {selectFrom: selectFromMock} = require('../../../src/engine/operations');

describe('validate the given table has no records', () => {

    test('should validate correctly when table is empty',
        async () => {
            selectFromMock.mockImplementation(() => Promise.resolve([]));

            const result = await tableIsEmptyStep('my_table');

            expect(result).toBe(true);
        }
    );

    test('should propagate error when table is not empty',
        async () => {
            selectFromMock.mockImplementation(() => Promise.resolve([
                {
                    my_letter: 'a'
                }
            ]));

            return tableIsEmptyStep('my_table')
                .catch(error => expect(error).toBeInstanceOf(Error));
        }
    );
});
