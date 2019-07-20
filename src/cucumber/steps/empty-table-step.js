const {Given} = require('cucumber');
const {deleteFrom} = require('../../sql/operations');

const emptyTableStep = function (table) {
    return deleteFrom(table);
};

Given('{tableName} is empty', emptyTableStep);
Given('{tableName} está vacia', emptyTableStep);
Given('{tableName} está vacía', emptyTableStep);
