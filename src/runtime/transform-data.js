const moment = require('moment');
moment.suppressDeprecationWarnings = true;

/**
 *
 * @param {Array<Object<string, string>>|string} args
 * @returns {Array<Object<string, *>>}
 */
module.exports = function (args) {
    if (Array.isArray(args))
        return args.map(transformCollection.bind(this));
    else
        return transform.call(this, args);
};

/**
 *
 * @param {Object<string, string>} obj
 * @returns {Object<string, *>}
 */
function transformCollection(obj) {
    Object.keys(obj).forEach(key => obj[key] = transform.call(this, obj[key]));
    return obj;
}

/**
 *
 * @param {string} value
 * @returns {*}
 */
function transform(value) {
    try {
        value = executeJs(value);
    } catch (e) {
        if (value === 'NULL') {
            value = null;
        } else if (value.includes('=')) {
            value = transformAssignment.call(this, value);
        } else if (this[value]) {
            value = this[value];
        } else if (value.indexOf('$') === 0) {
            value = transformTableAccess.call(this, value);
        } else if (value.match(/\$\w+/)) {
            value = transformVariablesInString.call(this, value);
        } else if (isNaN(value) && moment(value, ['YYYY-MM-DD HH:mm:ss.SSS','YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD'], true).isValid()) {
            value = moment.utc(value).toDate();
        }
    }
    return value;
}

/**
 * Try to execute the javascript inside value
 *
 * ie:
 * 2 + 2
 * a
 * @param {string} value
 * @returns {*}
 */
function executeJs(value) {
    return Function('"use strict";return (' + value + ')')();
}

/**
 * @param {string} value
 * @returns {*}
 */
function transformAssignment(value) {
    const assignment = value.split('=').map(e => e.trim());
    this[assignment[0]] = assignment[1];
    return assignment[1];
}

/**
 *
 *
 * @param {string} value
 * @returns {*}
 */
function transformTableAccess(value) {
    const access = value.split('>');
    return this[access[0]][access[1] - 1][access[2]];
}

/**
 *
 * @param {*} value
 * @returns {string}
 */
function transformVariablesInString(value) {
    const variables = value.match(/(\$\w+)|(\\\$\w+)/g);
    variables.forEach(key => {
        if (key.indexOf('\\') === 0)
            value = value.replace(key, key.slice(1));
        else if (this[key]) {
            value = value.replace(key, this[key]);
        }
    });
    return value;
}