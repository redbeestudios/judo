const transform = require('../../runtime/transform-data');
const assert = require('../../runtime/assertion');

module.exports = function (key, value) {
    assert(transform.call(this, key), transform.call(this, value));
};
