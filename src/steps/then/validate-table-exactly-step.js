const transform = require('../../runtime/transform-data');
const JudoDataTable = require('../../runtime/judo-data-table');
const {selectFrom} = require('../../sql/operations');
const {expect} = require('chai');

module.exports = function (table, data) {
    const judoDataTable = new JudoDataTable(data);
    const realData = transform.call(this, judoDataTable.body());
    return selectFrom(table, judoDataTable.fields(), judoDataTable.order())
        .then(result => expect(result.recordset).deep.equal(realData));
};