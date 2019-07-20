const {After, AfterAll, Before, BeforeAll} = require('cucumber');
const {connect, close, newTransaction, transaction} = require('../engine/pool');
const config = require('../runtime/config')();

BeforeAll(function () {
    return connect();
});

Before(function () {
    newTransaction();
    return transaction().begin();
});

After(function () {
    if (config.judo.sandbox)
        return transaction().commit();
    else
        return transaction().rollback();
});


AfterAll(function () {
    return close();
});