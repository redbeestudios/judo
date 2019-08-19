const {selectValueStep} = require('../../../src/steps');

jest.mock('../../src/engine/operations');
const operations = require('../../../src/engine/operations');

jest.mock('../../src/runtime/transform-data', () => jest.fn(() => 'my_value'));

describe('insert into table step tests', () => {

    test('should insert into table and store inserted values in context $',
        async () => {
            spyOn(operations, 'selectValue')
                .mockImplementation(() => Promise.resolve('MY RESULT'));

            const result = await selectValueStep.call(this, 'my_field', 'my_table', 'my_key', 'my_value');

            expect(this.$my_field).toBe('MY RESULT');
            expect(result).toBe('MY RESULT');
        }
    );
    test('should propagate the error', () => {
        spyOn(operations, 'selectValue')
            .mockImplementation(() => Promise.reject('An error'));

        return selectValueStep('my_field', 'my_table', 'my_key', 'my_value')
            .catch(e => expect(e).toBe('An error'));
    });
});
