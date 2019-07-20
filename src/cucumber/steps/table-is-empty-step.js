const {Then} = require('cucumber');
const {tableIsEmptyStep} = require('../../steps');

Then('{tableName} should be empty', tableIsEmptyStep);
Then('{tableName} debería estar vacia', tableIsEmptyStep);