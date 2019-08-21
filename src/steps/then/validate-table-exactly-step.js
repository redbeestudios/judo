const transform = require('../../runtime/transform-data');
const JudoDataTable = require('../../runtime/judo-data-table');
const {selectFrom} = require('../../engine/operations');
const assert = require('../../runtime/assertion');

module.exports = function (table, data) {
    const judoDataTable = new JudoDataTable(data);
    const realData = transform.call(this, judoDataTable.body());
    return selectFrom(table, judoDataTable.fields(), judoDataTable.order())
        .then(result => assert(realData, result));
};
