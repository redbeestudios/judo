const {selectValueStep} = require('../../../src/steps');

jest.mock('../../../src/engine/operations');
const {selectValue: selectValueMock} = require('../../../src/engine/operations');

describe('insert into table step tests', () => {

    test('should insert into table and store inserted values in context $',
        async () => {
            selectValueMock.mockImplementation(() => Promise.resolve('MY RESULT'));

            const result = await selectValueStep.call(this, 'my_field', 'my_table', 'my_key', 'my_value');

            expect(this.$my_field).toBe('MY RESULT');
            expect(result).toBe('MY RESULT');
        }
    );
    test('should propagate the error', () => {
        selectValueMock.mockImplementation(() => Promise.reject('An error'));

        return selectValueStep('my_field', 'my_table', 'my_key', 'my_value')
            .catch(e => expect(e).toBe('An error'));
    });
});
