const {Then} = require('cucumber');
const {selectFrom} = require('../../sql/operations');
const {expect} = require('chai');


const tableIsEmptyStep = function (table) {
    return selectFrom(table)
        .then(result => expect(result.recordset).to.eql([]));
};

Then('{tableName} should be empty', tableIsEmptyStep);
Then('{tableName} debería estar vacia', tableIsEmptyStep);