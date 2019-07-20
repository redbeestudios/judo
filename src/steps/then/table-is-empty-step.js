const {selectFrom} = require('../../engine/operations');
const {expect} = require('chai');

module.exports = function (table) {
    return selectFrom(table)
        .then(result => expect(result.recordset).to.eql([]));
};