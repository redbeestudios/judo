const {deleteFrom} = require('../../engine/operations');

module.exports = function (table) {
    return deleteFrom(table);
};