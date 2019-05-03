const {After, AfterAll, Before, BeforeAll} = require('cucumber');
const {connect, close, newTransaction, transaction} = require('../sql/pool');

BeforeAll(function () {
    return connect();
});

Before(function () {
    newTransaction();
    return transaction().begin();
});

After(function () {
    return transaction().rollback();
});


AfterAll(function () {
    return close();
});