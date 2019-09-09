const transform = require('../runtime/transform-data');

// const UNSUPPORTED_TYPE = ['VarBinary','TVP'];
const SUPPORTED_TYPES = ['NVarChar', 'Int', 'Bit', 'DateTime', 'Decimal', 'Float'];

/**
 * @typedef {Object} ProcedureArgument
 * @property {string} name
 * @property {string} [type]
 * @property {*} value
 * @property {boolean} [output]
 */

/**
 *
 * @param {string} docString
 * @returns {Array<ProcedureArgument>}
 */
module.exports = function (docString) {
    return docString.split('\n')
        .reduce(toProcedureArguments, [])
        .map(arg => {
            arg.value = transform.call(this, arg.value);
            return arg;
        });
};


/**
 *
 * @param {Array<ProcedureArgument>} acc
 * @param {string} cur
 * @returns {Array<ProcedureArgument>}
 */
function toProcedureArguments(acc, cur) {
    let argument = parseLine(cur.trim());

    if (unsupportedType(argument))
        throw new Error(`${argument.type} is not a valid type. Use any of: ${SUPPORTED_TYPES.join(', ')}`);

    acc.push(argument);
    return acc;
}

/**
 *
 * @param {ProcedureArgument} line
 * @returns {boolean}
 */
function unsupportedType(line) {
    return line.type && !SUPPORTED_TYPES.includes(line.type);
}

/**
 *
 * @param {string} str
 * @returns {ProcedureArgument}
 */
function parseLine(str) {
    const isOutput = !!str.match(/OUTPUT$/g);
    if (isOutput)
        str = removeOUTPUT(str);

    const name = parseName(str),
        type = parseType(str),
        value = parseValue(str, name, type);

    return {
        name,
        value,
        ...(type && {type}),
        ...(isOutput && {output: true})
    };
}

/**
 * Remove 'OUTPUT' from string
 *
 * @param {string} str
 * @returns {string}
 */
function removeOUTPUT(str) {
    return str.replace('OUTPUT', '').trim();
}

/**
 * Parse the name of the argument (with OUTPUT removed)
 *
 * Name should be the first word in the line, before any whitespace
 *
 * @param {string} str
 * @returns {string}
 */
function parseName(str) {
    return str.slice(0, str.indexOf(' ')).trim();
}

/**
 * Parse the type of the argument (with OUTPUT removed)
 *
 * Type should be the word between Name and Value, between two whitespaces
 *
 * @param {string} str
 * @returns {null|string}
 */
function parseType(str) {
    return str.match(/\s\w+\s/gi) && str.match(/\s\w+\s/gi)[0].trim();
}

/**
 * Parse the value of the argument (with OUTPUT removed)
 *
 * Value should be the last word in the line, after all whitespaces
 *
 * @param {string} str
 * @param {string} name
 * @param {string} type
 * @returns {string}
 */
function parseValue(str, name, type) {
    return str.replace(name, '').replace(type || '', '').trim();
}
