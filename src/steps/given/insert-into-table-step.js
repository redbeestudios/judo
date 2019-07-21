const transform = require('../../runtime/transform-data');
const {insertInto} = require('../../engine/operations');

const insertIntoTable = function (table, alias, data) {
    return insertInto(table, transform.call(this, data.hashes()))
        .then(data => {
            this.$ = data;
            if (alias)
                this[alias] = data;
            return Promise.resolve(data);
        });
};

module.exports.insertIntoTableWithAliasStep = function (table, alias, data) {
    return insertIntoTable.call(this, table, alias, data);
};

module.exports.insertIntoTableStep = function (table, data) {
    return insertIntoTable.call(this, table, null, data);
};