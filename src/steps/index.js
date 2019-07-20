module.exports = {
    callFunctionStep: require('./given/call-function-step'),

    defineVariableStep: require('./then/define-variable-step'),

    emptyTableStep: require('./given/empty-table-step'),

    executeRoutineStep: require('./when/execute-routine-step').executeRoutineStep,
    executeRoutineWithArgsStep: require('./when/execute-routine-step').executeRoutineWithArgsStep,

    insertIntoTableStep: require('./given/insert-into-table-step').insertIntoTableStep,
    insertIntoTableWithAliasStep: require('./given/insert-into-table-step').insertIntoTableWithAliasStep,

    selectValueStep: require('./given/select-value-step'),
    tableIsEmptyStep: require('./then/table-is-empty-step')
};