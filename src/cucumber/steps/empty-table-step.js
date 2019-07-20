const {Given} = require('cucumber');
const {emptyTableStep} = require('../../steps');

Given('{tableName} is empty', emptyTableStep);
Given('{tableName} está vacia', emptyTableStep);
Given('{tableName} está vacía', emptyTableStep);
