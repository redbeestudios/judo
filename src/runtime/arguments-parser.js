const transform = require('../runtime/transform-data');

// const UNSUPPORTED_TYPE = ['VarBinary','TVP'];
const SUPPORTED_TYPES = ['NVarChar', 'Int', 'Bit', 'DateTime'];

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
        .reduce((acc, cur) => {
            let line = splitLine.call(this, cur.trim());
            if (line.type && !SUPPORTED_TYPES.includes(line.type))
                throw new Error(`${line.type} is not a valid type. Use any of: ${SUPPORTED_TYPES.join(', ')}`);
            acc.push(line);
            return acc;
        }, []);
};

/**
 *
 * @param {string} str
 * @returns {ProcedureArgument}
 */
function splitLine(str) {
    const output = str.match(/OUTPUT$/g);
    if (output)
        str = str.replace(output ? 'OUTPUT' : '', '').trim();
    const name = str.slice(0, str.indexOf(' ')).trim(),
        type = str.match(/\s\w+\s/gi) && str.match(/\s\w+\s/gi)[0].trim(),
        value = str.replace(name, '').replace(type ? type : '', '').trim();
    return {
        name,
        ...(type && {type}),
        value: transform.call(this, value),
        ...(output && {output: true})
    };
}