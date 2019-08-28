jest.mock('../../../src/engine/mssql/pool');
const {request: reqMock} = require('../../../src/engine/mssql/pool');

const ops = require('../../../src/engine/mssql/operations');


describe('insert into table and return inserted', () => {

    test('should execute insert on database and return array of inserted',
        async () => {
            reqMock.mockImplementation(() => {
                return {
                    query: () => Promise.resolve({
                        recordset: [{
                            id: 1,
                            my_letter: 'a'
                        }]
                    })
                };
            });

            const result = await ops.insertInto('my_table', [
                {
                    my_letter: 'a'
                }
            ]);

            expect(result).toEqual([
                {
                    id: 1,
                    my_letter: 'a'
                }
            ]);
        }
    );

});
