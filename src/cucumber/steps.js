const {Given, When, Then} = require('cucumber');
const {
    emptyTableStep,
    insertIntoTableStep,
    insertIntoTableWithAliasStep,
    selectValueStep,
    defineVariableStep,
    callFunctionStep,
    executeRoutineStep,
    executeRoutineWithArgsStep,
    variableEqualsStep,
    validateTableExactlyStep,
    validateTableContentStep,
    tableIsEmptyStep
} = require('../steps');

// GIVENS
Given('{tableName} is empty', emptyTableStep);
Given('{tableName} está vacia', emptyTableStep);
Given('{tableName} está vacía', emptyTableStep);

Given('a table {tableName}', insertIntoTableStep);
Given('la tabla {tableName}', insertIntoTableStep);

Given('a table {tableName} {tableAlias}', insertIntoTableWithAliasStep);
Given('la tabla {tableName} {tableAlias}', insertIntoTableWithAliasStep);

Given('I read {tableField} from table {tableName} when {tableField} equals {any}', selectValueStep);
Given('leo {tableField} de la tabla {tableName} cuando {tableField} es {any}', selectValueStep);

Given('I save {any} as {any}', defineVariableStep);
Given('guardo {any} como {any}', defineVariableStep);

// WHENS
Given('I call {any} as {any}', callFunctionStep);
Given('llamo a la funcion {any} como {any}', callFunctionStep);

When('I execute {tableName}', executeRoutineStep);
When('ejecuto el sp {tableName}', executeRoutineStep);

When('I execute {tableName} with args:', executeRoutineWithArgsStep);
When('ejecuto el sp {tableName} con los argumentos:', executeRoutineWithArgsStep);

// THENS
Then('variable {any} should equal {any}', variableEqualsStep);
Then('la variable {any} debería ser igual a {any}', variableEqualsStep);

Then('{tableName} should have', validateTableExactlyStep);
Then('{tableName} debería tener exactamente', validateTableExactlyStep);

Then('{tableName} should contain once', validateTableContentStep);
Then('{tableName} debería contener una vez', validateTableContentStep);

Then('{tableName} should be empty', tableIsEmptyStep);
Then('{tableName} debería estar vacia', tableIsEmptyStep);
