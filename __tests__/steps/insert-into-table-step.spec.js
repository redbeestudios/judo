const {insertIntoTableStep} = require('../../src/steps');
const {insertIntoTableWithAliasStep} = require('../../src/steps');

jest.mock('../../src/engine/operations');
const operations = require('../../src/engine/operations');

jest.mock('../../src/runtime/transform-data', () => jest.fn(() => true));

describe('insert into table step tests', () => {

    test('should insert into table and store inserted values in context $',
        async () => {
            const inserted = [
                {letter: 'A', number: 1},
                {letter: 'B', number: 2}
            ];

            spyOn(operations, 'insertInto')
                .mockImplementation(() => Promise.resolve(inserted));

            const result = await insertIntoTableStep.call(this, 'my_table', {
                hashes: () => []
            });

            expect(this.$).toBe(inserted);
            expect(result).toBe(inserted);
        }
    );

    test('should insert into table and store inserted values in context $ and alias',
        async () => {
            const inserted = [
                {letter: 'A', number: 1},
                {letter: 'B', number: 2}
            ];

            spyOn(operations, 'insertInto')
                .mockImplementation(() => Promise.resolve(inserted));

            const result = await insertIntoTableWithAliasStep.call(this, 'my_table', 'alias', {
                hashes: () => []
            });

            expect(this.$).toBe(inserted);
            expect(this.alias).toBe(inserted);
            expect(result).toBe(inserted);
        }
    );

    test('should propagate the error', () => {
        spyOn(operations, 'insertInto')
            .mockImplementation(() => Promise.reject('An error'));

        return insertIntoTableStep('my_table', {hashes: () => []})
            .catch(e => expect(e).toBe('An error'));
    });
});
