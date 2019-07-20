const {Then} = require('cucumber');
const transform = require('../../runtime/transform-data');
const {expect} = require('chai');

const variableIsEqualToStep = function (key, value) {
    expect(transform.call(this, key)).equal(transform.call(this, value));
};

Then('variable {any} should equal {any}', variableIsEqualToStep);
Then('la variable {any} debería ser igual a {any}', variableIsEqualToStep);