const toSQLValue = require('./to-sql-value');

/**
 *
 * @param {Array<Object<string, *>>} data
 * @returns {string}
 */
module.exports = function (data) {
    return data.reduce(toAnds, []).join(' OR ');
};

/**
 *
 * @param {Array<string>} acc
 * @param {Object<string, *>} cur
 * @returns {*}
 */
const toAnds = (acc, cur) => {
    if (Object.keys(cur).length) {
        const ands = Object.keys(cur).reduce(
            (acc2, key) => toEquals(acc2, key, cur), []
        ).join(' AND ');
        acc.push(`(${ands})`);
    }
    return acc;
};

/**
 *
 * @param {Array<string>} acc2
 * @param {string} key
 * @param {Object<string, *>} cur
 * @returns {*}
 */
const toEquals = (acc2, key, cur) => {
    acc2.push(`${key} = ${toSQLValue(cur[key])}`);
    return acc2;
};