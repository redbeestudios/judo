const transform = require('../runtime/transform-data');

// const UNSUPPORTED_TYPE = ['VarBinary','TVP'];
const SUPPORTED_TYPES = ['NVarChar', 'Int', 'Bit', 'DateTime', 'Decimal', 'Float'];

/**
 * @typedef {Object} ProcedureArgument
 * @property {string} name
 * @property {string} [type]
 * @property {Array<*>} [typeArguments]
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
    const words = str.split(' ');

    switch (words.length) {
        case 2:
            return {
                name: words[0],
                value: words[1]
            };
        case 3:
            if (words[2] === 'OUTPUT') {
                return {
                    name: words[0],
                    value: words[1],
                    output: true
                };
            } else {
                return {
                    name: words[0],
                    ...parseType(words[1]),
                    value: words[2]
                };
            }
        case 4:
            return {
                name: words[0],
                ...parseType(words[1]),
                value: words[2],
                output: true
            };

    }
}

/**
 * Parse the type of the argument
 *
 * Type should be the word between Name and Value, between two whitespaces
 *
 * @param {string} str
 * @returns {Object}
 */
function parseType(str) {
    const r = str.match(/^(\w+)((\((\d+,\d+)\))|)$/i);
    return (r && {
        type: r[1],
        typeArguments: r[4] && r[4].split(',')
    }) || {};
}
