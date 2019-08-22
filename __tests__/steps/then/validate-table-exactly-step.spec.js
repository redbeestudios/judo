const {validateTableExactlyStep} = require('../../../src/steps');

jest.mock('../../../src/engine/operations');
const {selectFrom: selectFromMock} = require('../../../src/engine/operations');

describe('assert equality on two values', () => {

    test('should validate ok when table from feature and from database match',
        async () => {
            selectFromMock.mockImplementation(() => Promise.resolve([{
                a: 1
            }]));

            const result = await validateTableExactlyStep('my_table', {
                hashes: () => [{a: 1}],
                raw: () => [['a'], [1]],
                rawTable: [['a'], [1]]
            });

            expect(result).toBe(true);
        }
    );

    test('should propagate error when datasets are not equal', () => {
        selectFromMock.mockImplementation(() => Promise.resolve([{
            a: 23
        }]));

        validateTableExactlyStep('my_table', {
            hashes: () => [{a: 1}],
            raw: () => [['a'], [1]],
            rawTable: [['a'], [1]]
        }).catch(
            error => expect(error).toBeInstanceOf(Error));
    });
});
