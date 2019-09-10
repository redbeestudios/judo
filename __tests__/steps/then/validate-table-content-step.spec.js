const {validateTableContentStep} = require('../../../src/steps');

jest.mock('../../../src/runtime/config', () => () => {
    return {judo: {engine: 'mssql'}};
});

jest.mock('../../../src/engine/operations');
const {selectFromWhere: selectFromWhereMock} = require('../../../src/engine/operations');

describe('assert equality on two values', () => {

    test('should validate ok when table from feature and from database match',
        async () => {
            selectFromWhereMock.mockImplementation(() => Promise.resolve([{
                a: 1
            }]));

            const result = await validateTableContentStep('my_table', {
                hashes: () => [{a: 1}],
                raw: () => [['a'], [1]],
                rawTable: [['a'], [1]]
            });

            expect(result).toBe(true);
        }
    );

    test('should propagate error when datasets are not equal', () => {
        selectFromWhereMock.mockImplementation(() => Promise.resolve([{
            a: 23
        }]));

        validateTableContentStep('my_table', {
            hashes: () => [{a: 1}],
            raw: () => [['a'], [1]],
            rawTable: [['a'], [1]]
        }).catch(
            error => expect(error).toBeInstanceOf(Error));
    });
});
