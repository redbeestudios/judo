const transform = require('../../runtime/transform-data');
const JudoDataTable = require('../../runtime/judo-data-table');
const {selectFromWhere} = require('../../engine/operations');
const assertEquals = require('../../runtime/assertion');

/**
 * Validate the given table contains the values in data
 *
 * @param {string} table :: the table to select from
 * @param {Object} data :: the data expected to be in the table
 * @returns {Promise<boolean|Error>}
 */
module.exports = function validateTableContentStep(table, data) {
    const judoDataTable = new JudoDataTable(data);
    const realData = transform.call(this, judoDataTable.body());

    return selectFromWhere(table, judoDataTable.fields(), judoDataTable.criteria(), judoDataTable.order())
        .then(result => assertEquals(realData.length, result.length));
};