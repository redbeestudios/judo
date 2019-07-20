const {selectValue} = require('../../engine/operations');
const transform = require('../../runtime/transform-data');

module.exports = function (field, table, filterBy, value) {
    return selectValue(field, table, filterBy, transform.call(this, value))
        .then(value => {
            this['$' + field] = value;
            return Promise.resolve(value);
        });
};