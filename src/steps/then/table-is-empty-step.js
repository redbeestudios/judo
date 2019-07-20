const {selectFrom} = require('../../sql/operations');
const {expect} = require('chai');

module.exports = function (table) {
    return selectFrom(table)
        .then(result => expect(result.recordset).to.eql([]));
};