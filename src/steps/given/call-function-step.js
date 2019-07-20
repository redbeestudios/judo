const {query} = require('../../engine/operations');

module.exports = function (func, key) {
    return query(`SELECT ${func} as r;`).then(
        value => {
            this[key] = value.recordset[0].r;
            return Promise.resolve(result);
        }
    );
};