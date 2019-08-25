const importer = require('../../../src/runtime/config/importer');

describe('config module importer', () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('should import module correctly', () => {
        importer.basePath = jest.fn().mockReturnValue('../../../__mocks__/');

        expect(importer.importConfig('mssql')).toEqual({
            my_value: 1
        });
    });

    test('should return default when no module exists for key', () => {
        expect(importer.importConfig('mssql')).toEqual({});
    });

});
