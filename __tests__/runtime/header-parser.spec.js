const headerParser = require('../../src/runtime/header-parser');

describe('Parse headers tableFields and order clauses', function () {
    it('should build headers object with one fields given one value', function () {
        expect(headerParser(['my_letter'])).toEqual({
            fields: ['my_letter'],
            order: []
        });
    });

    it('should build headers object with two fields given two values', function () {
        expect(headerParser(['my_letter', 'my_number'])).toEqual({
            fields: ['my_letter', 'my_number'],
            order: []
        });
    });

    it('should build headers object with one field and order clause given an ordered field ascending', function () {
        expect(headerParser(['my_letter {asc}'])).toEqual({
            fields: ['my_letter'],
            order: ['my_letter asc']
        });
        expect(headerParser(['my_letter {ASC}'])).toEqual({
            fields: ['my_letter'],
            order: ['my_letter ASC']
        });
    });

    it('should build headers object with one field and order clause given an ordered field descending', function () {
        expect(headerParser(['my_letter {desc}'])).toEqual({
            fields: ['my_letter'],
            order: ['my_letter desc']
        });
        expect(headerParser(['my_letter {DESC}'])).toEqual({
            fields: ['my_letter'],
            order: ['my_letter DESC']
        });
    });

    it('should ignore unknown keywords', function () {
        expect(headerParser(['my_letter {random}'])).toEqual({
            fields: ['my_letter {random}'],
            order: []
        });
    });

});