const transform = require('../../runtime/transform-data');

module.exports = function (value, key) {
    this[key] = transform.call(this, value);
};