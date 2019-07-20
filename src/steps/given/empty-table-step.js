const {deleteFrom} = require('../../sql/operations');

module.exports = function (table) {
    return deleteFrom(table);
};