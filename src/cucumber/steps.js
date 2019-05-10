const {Given, When, Then} = require('cucumber');
const {expect} = require('chai');
const transform = require('./transform-data');

const {insert, exec, select, truncate, query} = require('../sql/operations');
const whereEachRow = require('../sql/statements/helpers/where-each-row');
const liquibase = require('../liquibase');

const truncateTableStep = function (table) {
    return truncate(table);
};

Given('{word} is empty', truncateTableStep);
Given('{word} está vacia', truncateTableStep);


const insertIntoTableStep = function (table, data) {
    this.b = 'b';
    return insert(table, transform.call(this, data.hashes()));
};

Given('a table {word}', insertIntoTableStep);
Given('la tabla {word}', insertIntoTableStep);

const executeSpStep = function (storedProcedure) {
    return exec(storedProcedure);
};

When('I execute {word}', executeSpStep);
When('ejecuto el sp {word}', executeSpStep);

const exectueSpWithArgumentsStep = function (storedProcedure, args) {
    const inputList = args.split('\n')
        .reduce((acc, cur) => {
            let line = cur.split(' ');
            acc[line[0]] = {
                type: line[1],
                value: line[2]
            };
            return acc;
        }, {});
    return exec(storedProcedure, inputList);
};

When('I execute {word} with args:', exectueSpWithArgumentsStep);
When('ejecuto el sp {word} con los argumentos:', exectueSpWithArgumentsStep);

const validateTableExactlyStep = function (table, data) {
    let fields = data.hashes().length && Object.keys(data.hashes()[0]);
    let realData = transform.call(this, data.hashes());

    return select(table, fields)
        .then(result => expect(result.recordset).deep.equal(realData));
};

Then('{word} should have', validateTableExactlyStep);
Then('{word} debería tener exactamente', validateTableExactlyStep);

const validateTableContentStep = function (table, data) {
    const fields = data.hashes().length && Object.keys(data.hashes()[0]);
    const realData = transform.call(this, data.hashes());
    return query(`SELECT ${fields.join(',')} FROM ${table} WHERE ${whereEachRow(realData)}`)
        .then(result => expect(result.recordset).deep.equal(realData));
};

Then('{word} should contain', validateTableContentStep);
Then('{word} debería contener', validateTableContentStep);

const tableIsEmptyStep = function (table) {
    return select(table)
        .then(result => expect(result.recordset).deep.equal([]));
};

Then('{word} should be empty', tableIsEmptyStep);
Then('{word} debería estar vacia', tableIsEmptyStep);


const variableIsEqualToStep = function (variable, value) {
    expect(this[variable]).equal(value);
};

Then('variable {word} should equal {word}', variableIsEqualToStep);
Then('la variable {word} debería ser igual a {word}', variableIsEqualToStep);


const runLiquibaseStep = function (fileName) {
    return liquibase({
        defaultsFile: '/home/joaco/.liquibase/local.configurations.properties',
        changeLogFile: fileName
    }).run();
};

Given('the following liquibase are run:', runLiquibaseStep);
Given('se corrieron los liquibase:', runLiquibaseStep);