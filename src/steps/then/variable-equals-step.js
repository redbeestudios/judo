const transform = require('../../runtime/transform-data');
const {expect} = require('chai');

module.exports = function (key, value) {
    expect(transform.call(this, key)).equal(transform.call(this, value));
};