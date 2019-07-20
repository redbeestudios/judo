const {When} = require('cucumber');
const {executeRoutineStep, executeRoutineWithArgsStep} = require('../../steps');

When('I execute {tableName}', executeRoutineStep);
When('ejecuto el sp {tableName}', executeRoutineStep);

When('I execute {tableName} with args:', executeRoutineWithArgsStep);
When('ejecuto el sp {tableName} con los argumentos:', executeRoutineWithArgsStep);
