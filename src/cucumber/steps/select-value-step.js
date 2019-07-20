const {Given} = require('cucumber');
const {query} = require('../../sql/operations');
const selectValue = require('../../sql/statements/select-value');
const transform = require('../../runtime/transform-data');

const findValueInTableStep = function (field, table, filterBy, value) {
    return query(selectValue(field, table, filterBy, transform.call(this, value)))
        .then(result => {
            if (!result.recordset.length)
                return Promise.reject(`No records found by ${filterBy} = ${value}`);
            this['$' + field] = result.recordset[0][field];
            return Promise.resolve(result);
        });
};

Given('I read {tableField} from table {tableName} when {tableField} equals {any}', findValueInTableStep);
Given('leo {tableField} de la tabla {tableName} cuando {tableField} es {any}', findValueInTableStep);