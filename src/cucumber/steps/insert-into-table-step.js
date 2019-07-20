const {Given} = require('cucumber');
const {insertIntoTableStep, insertIntoTableWithAliasStep} = require('../../steps');

Given('a table {tableName}', insertIntoTableStep);
Given('la tabla {tableName}', insertIntoTableStep);

Given('a table {tableName} {tableAlias}', insertIntoTableWithAliasStep);
Given('la tabla {tableName} {tableAlias}', insertIntoTableWithAliasStep);