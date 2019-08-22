const transform = require('../../runtime/transform-data');
const assertEquals = require('../../runtime/assertion');

module.exports = function (key, value) {
    assertEquals(transform.call(this, key), transform.call(this, value));
};
