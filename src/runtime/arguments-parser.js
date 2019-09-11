const transform = require('../runtime/transform-data');

// const UNSUPPORTED_TYPE = ['VarBinary','TVP'];
const SUPPORTED_TYPES = ['NVarChar', 'Int', 'Bit', 'DateTime', 'Decimal', 'Float'];

/**
 * @typedef {Object} ProcedureArgument
 * @property {string} name
 * @property {string} [type]
 * @property {Array<*>} [typeArgs]
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

    if (words.length === 2) {
        return {
            name: words[0],
            value: words[1]
        };
    } else if (words.length === 3) {
        if (words[2] === 'OUTPUT') {
            return {
                name: words[0],
                value: words[1],
                output: true
            };
        } else {
            return {
                name: words[0],
                value: words[2],
                ...parseType(words[1])
            };
        }
    }
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
    const r = new RegExp(/\s\w+\s/gi);
    return str.match(r) && str.match(r)[0].trim();
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
