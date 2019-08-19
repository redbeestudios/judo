const transform = require('../../runtime/transform-data');
const {insertInto} = require('../../engine/operations');

/**
 * Run an insert on table on the database and store the output
 * in the provided alias
 *
 * @param {string} table :: the table to insert into
 * @param {string} alias :: the key to store at
 * @param {Object} data :: a Cucumber dataTable
 * @returns {Promise<Array<Object<string, *>>>}
 */
module.exports.insertIntoTableWithAliasStep = function (table, alias, data) {
    return insertIntoTable.call(this, table, alias, data);
};

/**
 * Run an insert on table on the database
 *
 * @param {string} table :: the table to insert into
 * @param {Object} data :: a Cucumber dataTable
 * @returns {Promise<Array<Object<string, *>>>}
 */
module.exports.insertIntoTableStep = function (table, data) {
    return insertIntoTable.call(this, table, null, data);
};

/**
 * Invoke operation to insert into table
 * storing the inserted values in the context
 *
 * If provided with an alias store also at said key
 *
 * @param {string} table
 * @param {string} alias
 * @param {Object} data
 * @returns {Promise<Array<Object<string, *>>>}
 */
function insertIntoTable(table, alias, data) {
    return insertInto(table, transform.call(this, data.hashes()))
        .then(data => {
            this.$ = data;
            if (alias)
                this[alias] = data;
            return Promise.resolve(data);
        });
}
