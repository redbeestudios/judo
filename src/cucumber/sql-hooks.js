const {AfterAll} = require('cucumber');
const {close} = require('../pool');

AfterAll(function () {
    close();
});
