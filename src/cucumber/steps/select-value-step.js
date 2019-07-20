const {Given} = require('cucumber');
const {selectValueStep} = require('../../steps');

Given('I read {tableField} from table {tableName} when {tableField} equals {any}', selectValueStep);
Given('leo {tableField} de la tabla {tableName} cuando {tableField} es {any}', selectValueStep);