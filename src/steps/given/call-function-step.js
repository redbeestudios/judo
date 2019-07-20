const {callFunction} = require('../../engine/operations');

module.exports = function (func, key) {
    return callFunction(func).then(
        value => {
            this[key] = value;
            return Promise.resolve(value);
        }
    );
};