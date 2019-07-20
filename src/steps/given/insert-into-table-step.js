const transform = require('../../runtime/transform-data');
const {insertInto} = require('../../sql/operations');

const insertIntoTable = function (table, alias, data) {
    return insertInto(table, transform.call(this, data.hashes()))
        .then(result => {
            this.$ = result.recordset;
            if (alias)
                this[alias] = result.recordset;
            return Promise.resolve(result);
        });
};

module.exports.insertIntoTableWithAliasStep = function (table, alias, data) {
    return insertIntoTable.call(this, table, alias, data);
};

module.exports.insertIntoTableStep = function (table, data) {
    return insertIntoTable.call(this, table, null, data);
};