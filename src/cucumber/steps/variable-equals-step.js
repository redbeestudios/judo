const {Then} = require('cucumber');
const {variableEqualsStep} = require('../../steps');

Then('variable {any} should equal {any}', variableEqualsStep);
Then('la variable {any} debería ser igual a {any}', variableEqualsStep);