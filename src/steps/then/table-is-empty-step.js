const {selectFrom} = require('../../engine/operations');
const {expect} = require('chai');

/**
 * Validate the table has no records at all (is empty)
 *
 * @param {string} table :: the table to select from
 * @returns {Promise<boolean>}
 */
module.exports = function tableIsEmptyStep(table) {
    return selectFrom(table)
        .then(result => expect(result).to.eql([]));
};
