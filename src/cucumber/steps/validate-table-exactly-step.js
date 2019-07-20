const {Then} = require('cucumber');
const {validateTableExactlyStep} = require('../../steps');

Then('{tableName} should have', validateTableExactlyStep);
Then('{tableName} debería tener exactamente', validateTableExactlyStep);