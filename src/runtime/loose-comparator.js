/**
 *
 * @param {*} a
 * @param {*} b
 * @returns {null|boolean}
 */
module.exports = (a, b) => {
    // noinspection EqualityComparisonWithCoercionJS
    return isComparable(a) && isComparable(b) ? (
        isDate(a) && isDate(b) ? compareDates(a, b) : a == b
    ) : null;
};

/**
 *
 * @param {*} value
 * @returns {boolean}
 */
const isComparable = (value) => {
    return value === null || isDate(value) || typeof value !== 'object';
};

/**
 *
 * @param {*} value
 * @returns {boolean}
 */
const isDate = (value) => {
    return value instanceof Date;
};

/**
 *
 * @param {Date} a
 * @param {Date} b
 * @returns {boolean}
 */
const compareDates = (a, b) => {
    return Math.abs(a.getTime() - b.getTime()) < 60 * 1000;
};