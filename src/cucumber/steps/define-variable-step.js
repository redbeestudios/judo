const {Then} = require('cucumber');
const {defineVariableStep} = require('../../steps');

Then('I save {any} as {any}', defineVariableStep);
Then('guardo {any} como {any}', defineVariableStep);