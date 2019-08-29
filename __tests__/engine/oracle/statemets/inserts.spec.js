const inserts = require('../../../../src/engine/oracle/statements/insert');

describe('Create oracle inserts that output the result from a collection of objects', function () {

    test('should create a correct INSERT statement given a one number column', function () {
        expect(inserts('my_test_table', [{
            my_number: 1
        }])).toEqual(noIndent`INSERT INTO my_test_table (my_number)
                              SELECT 1 FROM dual`);
    });

    test('should create a correct INSERT statement given a one string column', function () {
        expect(inserts('my_test_table', [{
            my_string: 'abc'
        }])).toEqual(
            noIndent`INSERT INTO my_test_table (my_string)
                     SELECT 'abc' FROM dual`
        );
    });

    test('should create a correct INSERT statement given several values', function () {
        expect(inserts('my_test_table', [
            {
                my_string: 'abc',
                my_number: 1,
                my_boolean: false
            }
        ])).toEqual(
            noIndent`INSERT INTO my_test_table (my_string, my_number, my_boolean)
                     SELECT 'abc', 1, 0 FROM dual`);
    });

    test('should create a correct INSERT statement for several rows', function () {
        expect(inserts('my_test_table', [
            {my_number: 1},
            {my_number: 1},
            {my_number: 1}
        ])).toEqual(
            noIndent`INSERT INTO my_test_table (my_number)
                        SELECT 1 FROM dual
                        UNION ALL SELECT 1 FROM dual
                        UNION ALL SELECT 1 FROM dual`);
    });

    test('should create 2 correct INSERT statements for 3 rows when threshold is 2', function () {
        expect(inserts('my_test_table', [
            {my_number: 1},
            {my_number: 1},
            {my_number: 1}
        ], 2)).toEqual(
            noIndent`BEGIN
                     INSERT INTO my_test_table (my_number)
                        SELECT 1 FROM dual
                        UNION ALL SELECT 1 FROM dual;
                     INSERT INTO my_test_table (my_number)
                        SELECT 1 FROM dual;
                     END;`
        );
    });

    test('should create 3 correct INSERT statements for 5 rows when threshold is 2', function () {
        expect(inserts('my_test_table', [
            {my_number: 1},
            {my_number: 1},
            {my_number: 1},
            {my_number: 1},
            {my_number: 1}
        ], 2)).toEqual(
            noIndent`BEGIN
                     INSERT INTO my_test_table (my_number)
                        SELECT 1 FROM dual
                        UNION ALL SELECT 1 FROM dual;
                     INSERT INTO my_test_table (my_number)
                        SELECT 1 FROM dual
                        UNION ALL SELECT 1 FROM dual;
                     INSERT INTO my_test_table (my_number)
                        SELECT 1 FROM dual;
                     END;`
        );
    });
});
