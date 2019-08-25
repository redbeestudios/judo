const {emptyTableStep} = require('../../../src/steps');

jest.mock('../../../src/runtime/config', () => () => {
    return {judo: {engine: 'mssql'}};
});

jest.mock('../../../src/engine/operations');
const {deleteFrom: deleteFromMock} = require('../../../src/engine/operations');

describe('Empty Table Step: delete all entries from a table', () => {

    beforeEach(() => {
    });

    test('should delete entries and store the result in the context',
        async () => {
            deleteFromMock.mockImplementation(() => Promise.resolve(10));

            const result = await emptyTableStep.call(this, 'my_table');

            expect(this.$deleted).toBe(10);
            expect(result).toBe(10);
        }
    );

    test('should propagate the error', () => {
        deleteFromMock.mockImplementation(() => Promise.reject('An error'));

        return emptyTableStep('my_table')
            .catch(e => expect(e).toBe('An error'));
    });
});
