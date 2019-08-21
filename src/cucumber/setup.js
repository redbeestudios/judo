const {defineParameterType} = require('cucumber');

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
