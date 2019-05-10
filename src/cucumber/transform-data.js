const moment = require('moment');
moment.suppressDeprecationWarnings = true;

/**
 *
 * @param {Array<Object<string, string>>} hashes
 * @returns {Array<Object<string, *>>}
 */
module.exports = function transform(hashes) {
    return hashes.map(evaluateValues.bind(this));
};

/**
 *
 * @param {Object<string, string>} each
 * @returns {Object<string, *>}
 */
function evaluateValues(each) {
    Object.keys(each).forEach(key => {
        let value = each[key];
        try {
            value = executeJs(value);
        } catch (e) {
            if (value.includes('=')) {
                const assignment = value.split('=').map(each => each.trim());
                this[assignment[0]] = assignment[1];
                value = assignment[1];
            } else if (this[value]) {
                value = this[value];
            } else if (isNaN(value)) {
                if (moment(value).isValid()) {
                    value = moment.utc(value).toDate();
                }
            }
        }
        each[key] = value;
    });
    return each;
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