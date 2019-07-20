const {Given} = require('cucumber');
const transform = require('../../runtime/transform-data');
const {insertInto} = require('../../sql/operations');

const insertIntoTableStep = function (table, data) {
    return insertInto(table, transform.call(this, data.hashes()))
        .then(result => {
            this.$ = result.recordset;
            return Promise.resolve(result);
        });
};
Given('a table {tableName}', insertIntoTableStep);
Given('la tabla {tableName}', insertIntoTableStep);

const insertIntoTableWithAliasStep = function (table, alias, data) {
    return insertInto(table, transform.call(this, data.hashes()))
        .then(result => {
            this.$ = result.recordset;
            this[alias] = result.recordset;
            return Promise.resolve(result);
        });
};
Given('a table {tableName} {tableAlias}', insertIntoTableWithAliasStep);
Given('la tabla {tableName} {tableAlias}', insertIntoTableWithAliasStep);