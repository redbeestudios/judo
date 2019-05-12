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
        if (value.includes('=')) {
            value = transformAssignment.call(this, value);
        } else if (this[value]) {
            value = this[value];
        } else if (value.indexOf('$') === 0) {
            value = transformAccess.call(this, value);
        } else if (isNaN(value)) {
            if (moment(value).isValid()) {
                value = moment.utc(value).toDate();
            }
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
function transformAccess(value) {
    const index = value.match(/\d/g)[0];
    return this.$[index][value.split('.').pop()];
}