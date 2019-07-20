const {query} = require('../../sql/operations');
const selectValue = require('../../sql/statements/select-value');
const transform = require('../../runtime/transform-data');

module.exports = function (field, table, filterBy, value) {
    return query(selectValue(field, table, filterBy, transform.call(this, value)))
        .then(result => {
            if (!result.recordset.length)
                return Promise.reject(`No records found by ${filterBy} = ${value}`);
            this['$' + field] = result.recordset[0][field];
            return Promise.resolve(result);
        });
};