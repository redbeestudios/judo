const {Given, When, Then, defineParameterType} = require('cucumber');
const {use, expect} = require('chai');

const comparator = require('../runtime/loose-comparator');
const transform = require('../runtime/transform-data');
const JudoDataTable = require('../runtime/judo-data-table');
const argumentsParser = require('../runtime/arguments-parser');

const {insertInto, exec, selectFrom, deleteFrom, query} = require('../sql/operations');
const whereEachRow = require('../sql/statements/helpers/where-each-row');
const selectValue = require('../sql/statements/select-value');

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

defineParameterType({
    regexp: /\w+\S*/,
    name: 'tableField'
});

defineParameterType({
    regexp: /(.*)/,
    name: 'any'
});

const emptyTableStep = function (table) {
    return deleteFrom(table);
};

Given('{tableName} is empty', emptyTableStep);
Given('{tableName} está vacia', emptyTableStep);


const insertIntoTableStep = function (table, data) {
    return insertInto(table, transform.call(this, data.hashes()))
        .then(result => {
            this.$ = result.recordset;
            return Promise.resolve(result);
        });
};
Given('a table {tableName}', insertIntoTableStep);
Given('la tabla {tableName}', insertIntoTableStep);


const insertIntoTableWithAliasStep = function (table, alias, data) {
    return insertInto(table, transform.call(this, data.hashes()))
        .then(result => {
            this.$ = result.recordset;
            this[alias] = result.recordset;
            return Promise.resolve(result);
        });
};
Given('a table {tableName} {tableAlias}', insertIntoTableWithAliasStep);
Given('la tabla {tableName} {tableAlias}', insertIntoTableWithAliasStep);

const executeSpStep = function (storedProcedure) {
    return exec(storedProcedure)
        .then(result => {
            this.$returned = result.returnValue;
            return Promise.resolve(result);
        });
};

When('I execute {tableName}', executeSpStep);
When('ejecuto el sp {tableName}', executeSpStep);

const executeSpWithArgumentsStep = function (storedProcedure, docString) {
    const inputList = argumentsParser.call(this, docString);
    return exec(storedProcedure, inputList)
        .then(result => {
            this.$returned = result.returnValue;
            for (let key in result.output) {
                if (result.output.hasOwnProperty(key))
                    this['$' + key] = transform.call(this, result.output[key]);
            }
            return Promise.resolve(result);
        });
};

When('I execute {tableName} with args:', executeSpWithArgumentsStep);
When('ejecuto el sp {tableName} con los argumentos:', executeSpWithArgumentsStep);

const validateTableExactlyStep = function (table, data) {
    const judoDataTable = new JudoDataTable(data);
    const realData = transform.call(this, judoDataTable.body());
    return selectFrom(table, judoDataTable.fields(), judoDataTable.order())
        .then(result => expect(result.recordset).deep.equal(realData));
};

Then('{tableName} should have', validateTableExactlyStep);
Then('{tableName} debería tener exactamente', validateTableExactlyStep);

const validateTableContentStep = function (table, data) {
    const judoDataTable = new JudoDataTable(data);
    const realData = transform.call(this, judoDataTable.body());
    return query(`SELECT ${judoDataTable.fields().join(',')} FROM ${table} WHERE ${whereEachRow(realData)}`)
        .then(result => expect(result.recordset).to.eql(realData));
};

Then('{tableName} should contain', validateTableContentStep);
Then('{tableName} debería contener', validateTableContentStep);

const tableIsEmptyStep = function (table) {
    return selectFrom(table)
        .then(result => expect(result.recordset).to.eql([]));
};

Then('{tableName} should be empty', tableIsEmptyStep);
Then('{tableName} debería estar vacia', tableIsEmptyStep);


const variableIsEqualToStep = function (key, value) {
    expect(transform.call(this, key)).equal(transform.call(this, value));
};

Then('variable {any} should equal {any}', variableIsEqualToStep);
Then('la variable {any} debería ser igual a {any}', variableIsEqualToStep);

const defineVariableStep = function (value, key) {
    this[key] = transform.call(this, value);
};

Then('I save {any} as {any}', defineVariableStep);
Then('guardo {any} como {any}', defineVariableStep);

const findValueInTableStep = function (field, table, filterBy, value) {
    return query(selectValue(field, table, filterBy, transform.call(this, value)))
        .then(result => {
            if (!result.recordset.length)
                return Promise.reject(`No records found by ${filterBy} = ${value}`);
            this['$' + field] = result.recordset[0][field];
            return Promise.resolve(result);
        });
};

Given('I read {tableField} from table {tableName} when {tableField} equals {any}', findValueInTableStep);
Given('leo {tableField} de la tabla {tableName} cuando {tableField} es {any}', findValueInTableStep);