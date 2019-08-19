const {deleteFrom} = require('../../engine/operations');

/**
 * Delete all entries from a table
 *
 * @param {string} table :: the name of the table to empty
 * @returns {Promise<number|void>} :: the amount of deleted entries
 */
module.exports = async function (table) {
    this.$deleted = await deleteFrom(table);
    return this.$deleted;
};
