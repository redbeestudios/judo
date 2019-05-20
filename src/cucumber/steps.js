const {Given, When, Then, defineParameterType} = require('cucumber');
const {use, expect} = require('chai');

const liquibase = require('../liquibase');

const comparator = require('../runtime/loose-comparator');
const transform = require('../runtime/transform-data');

const {insert, exec, select, truncate, query} = require('../sql/operations');
const whereEachRow = require('../sql/statements/helpers/where-each-row');

// Configure chai
use(function (chai, utils) {
    chai.Assertion.overwriteMethod('eql', function () {
        return function (obj, msg) {
            if (msg) utils.flag(this, 'message', msg);
            this.assert(
                utils.eql(obj, utils.flag(this, 'object'), {comparator})
                , 'expected #{this} to deeply equal #{exp}'
                , 'expected #{this} to not deeply equal #{exp}'
                , obj
                , this._obj
                , true
            );
        };
    });
});

defineParameterType({
    regexp: /\w+\S*/,
    name: 'tableName'
});

defineParameterType({
    regexp: /\$\w+\S*/,
    name: 'tableAlias'
});


const truncateTableStep = function (table) {
    return truncate(table);
};

Given('{tableName} is empty', truncateTableStep);
Given('{tableName} está vacia', truncateTableStep);


const insertIntoTableStep = function (table, data) {
    return insert(table, transform.call(this, data.hashes()))
        .then(result => {
            this.$ = result.recordset;
            return Promise.resolve(result);
        });
};
Given('a table {tableName}', insertIntoTableStep);
Given('la tabla {tableName}', insertIntoTableStep);


const insertIntoTableWithAliasStep = function (table, alias, data) {
    return insert(table, transform.call(this, data.hashes()))
        .then(result => {
            this.$ = result.recordset;
            this[alias] = result.recordset;
            return Promise.resolve(result);
        });
};
Given('a table {tableName} {tableAlias}', insertIntoTableWithAliasStep);
Given('la tabla {tableName} {tableAlias}', insertIntoTableWithAliasStep);

const executeSpStep = function (storedProcedure) {
    return exec(storedProcedure);
};

When('I execute {tableName}', executeSpStep);
When('ejecuto el sp {tableName}', executeSpStep);

const exectueSpWithArgumentsStep = function (storedProcedure, args) {
    const inputList = args.split('\n')
        .reduce((acc, cur) => {
            let line = cur.split(' ');
            acc[line[0]] = {
                type: line[1],
                value: transform.call(this, line[2])
            };
            return acc;
        }, {});
    return exec(storedProcedure, inputList);
};

When('I execute {tableName} with args:', exectueSpWithArgumentsStep);
When('ejecuto el sp {tableName} con los argumentos:', exectueSpWithArgumentsStep);

const validateTableExactlyStep = function (table, data) {
    let fields = data.hashes().length && Object.keys(data.hashes()[0]);
    let realData = transform.call(this, data.hashes());

    return select(table, fields)
        .then(result => expect(result.recordset).deep.equal(realData));
};

Then('{tableName} should have', validateTableExactlyStep);
Then('{tableName} debería tener exactamente', validateTableExactlyStep);

const validateTableContentStep = function (table, data) {
    const fields = data.hashes().length && Object.keys(data.hashes()[0]);
    const realData = transform.call(this, data.hashes());
    return query(`SELECT ${fields.join(',')} FROM ${table} WHERE ${whereEachRow(realData)}`)
        .then(result => expect(result.recordset).to.eql(realData));
};

Then('{tableName} should contain', validateTableContentStep);
Then('{tableName} debería contener', validateTableContentStep);

const tableIsEmptyStep = function (table) {
    return select(table)
        .then(result => expect(result.recordset).to.eql([]));
};

Then('{tableName} should be empty', tableIsEmptyStep);
Then('{tableName} debería estar vacia', tableIsEmptyStep);


const variableIsEqualToStep = function (key, value) {
    expect(transform.call(this, key)).equal(transform.call(this, value));
};

Then(/^variable (.*) should equal (.*)$/, variableIsEqualToStep);
Then(/^la variable (.*) debería ser igual a (.*)$/, variableIsEqualToStep);

const defineVariableStep = function (value, key) {
    this[key] = transform.call(this, value);
};

Then(/^I save (.*) as (.*)$/, defineVariableStep);
Then(/^guardo (.*) como (.*)$/, defineVariableStep);

const runLiquibaseStep = function (fileName) {
    return liquibase({
        defaultsFile: '/home/joaco/.liquibase/local.configurations.properties',
        changeLogFile: fileName
    }).run();
};

Given('the following liquibase are run:', runLiquibaseStep);
Given('se corrieron los liquibase:', runLiquibaseStep);