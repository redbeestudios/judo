const transform = require('../../runtime/transform-data');
const {exec} = require('../../engine/operations');
const argumentsParser = require('../../runtime/arguments-parser');

/**
 * Execute a routine stored in the database
 *
 * this step stores the result at $returned by default
 *
 * @param {string} routine :: the name of the routine to execute
 * @returns {Promise<ProcedureResult>} :: the result from the operation
 */
module.exports.executeRoutineStep = function (routine) {
    return executeRoutine.call(this, routine, null);
};

/**
 * Execute a routine stored in the database providing
 * the passed arguments
 *
 * where arguments (args) is a multiline string holding the
 * arguments to pass to the routine. Each line of the string
 * must have the following format:
 *
 * argument_name [argument_type] argument_value [OUTPUT]
 *
 * ie:
 * userId 1
 * userId Int 123
 * userId 2 OUTPUT
 *
 * @param {string} routine :: the name of the routine to execute
 * @param {string} args :: a list of arguments
 * @returns {Promise<ProcedureResult>}
 */
module.exports.executeRoutineWithArgsStep = function (routine, args) {
    return executeRoutine.call(this, routine, args);
};

/**
 * Invoke exec operation and handle results
 *
 * @param {string} storedProcedure
 * @param {string} args
 * @returns {Promise<ProcedureResult>}
 */
async function executeRoutine(storedProcedure, args) {
    const inputList = args && argumentsParser.call(this, args);
    const result = await exec(storedProcedure, inputList);

    this.$returned = result.returnValue;

    Object.keys(result.output || {})
        .forEach(key => this['$' + key] = transform.call(this, result.output[key]));

    return result;
}
