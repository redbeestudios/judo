const {When} = require('cucumber');
const transform = require('../../runtime/transform-data');
const {exec} = require('../../sql/operations');
const argumentsParser = require('../../runtime/arguments-parser');

const executeSpStep = function (storedProcedure) {
    return exec(storedProcedure)
        .then(result => {
            this.$returned = result.returnValue;
            return Promise.resolve(result);
        });
};

When('I execute {tableName}', executeSpStep);
When('ejecuto el sp {tableName}', executeSpStep);

const executeSpWithArgumentsStep = function (storedProcedure, docString) {
    const inputList = argumentsParser.call(this, docString);
    return exec(storedProcedure, inputList)
        .then(result => {
            this.$returned = result.returnValue;
            for (let key in result.output) {
                if (result.output.hasOwnProperty(key))
                    this['$' + key] = transform.call(this, result.output[key]);
            }
            return Promise.resolve(result);
        });
};

When('I execute {tableName} with args:', executeSpWithArgumentsStep);
When('ejecuto el sp {tableName} con los argumentos:', executeSpWithArgumentsStep);
