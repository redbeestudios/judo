const transform = require('../../runtime/transform-data');
const {exec} = require('../../engine/operations');
const argumentsParser = require('../../runtime/arguments-parser');

const executeRoutine = function (storedProcedure, args) {
    const inputList = typeof args === 'string' ? argumentsParser.call(this, args) : null;
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

module.exports.executeRoutineStep = function (routine) {
    return executeRoutine.call(this, routine);
};

module.exports.executeRoutineWithArgsStep = function (routine, args) {
    return executeRoutine.call(this, routine, args);
};