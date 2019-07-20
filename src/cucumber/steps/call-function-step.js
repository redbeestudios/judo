const {Given} = require('cucumber');
const {callFunctionStep} = require('../../steps');

Given('I call {any} as {any}', callFunctionStep);
Given('llamo a la funcion {any} como {any}', callFunctionStep);