const {Given} = require('cucumber');

const {query} = require('../../sql/operations');

const callFunctionStep = function (func, key) {
    return query(`SELECT ${func} as r;`).then(
        value => {
            this[key] = value.recordset[0].r;
            return Promise.resolve(result);
        }
    );
};

Given('I call {any} as {any}', callFunctionStep);
Given('llamo a la funcion {any} como {any}', callFunctionStep);