const {emptyTableStep} = require('../../../src/steps');

jest.mock('../../src/engine/operations');
const operations = require('../../../src/engine/operations');

describe('Empty Table Step: delete all entries from a table', () => {

    test('should delete entries and store the result in the context',
        async () => {
            spyOn(operations, 'deleteFrom')
                .mockImplementation(() => Promise.resolve(10));

            const result = await emptyTableStep.call(this, 'my_table');

            expect(this.$deleted).toBe(10);
            expect(result).toBe(10);
        }
    );

    test('should propagate the error', () => {
        spyOn(operations, 'deleteFrom')
            .mockImplementation(() => Promise.reject('An error'));

        return emptyTableStep('my_table')
            .catch(e => expect(e).toBe('An error'));
    });
});
