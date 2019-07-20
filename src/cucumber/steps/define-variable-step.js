const {Then} = require('cucumber');
const transform = require('../../runtime/transform-data');

const defineVariableStep = function (value, key) {
    this[key] = transform.call(this, value);
};

Then('I save {any} as {any}', defineVariableStep);
Then('guardo {any} como {any}', defineVariableStep);