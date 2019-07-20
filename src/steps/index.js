module.exports = {
    callFunctionStep: require('./given/call-function-step'),
    emptyTableStep: require('./given/empty-table-step'),
    executeRoutineWithArgsStep: require('./when/execute-routine-step').executeRoutineWithArgsStep,
    insertIntoTableStep: require('./given/insert-into-table-step').insertIntoTableStep,
    insertIntoTableWithAliasStep: require('./given/insert-into-table-step').insertIntoTableWithAliasStep,
    selectValueStep: require('./given/select-value-step'),

    executeRoutineStep: require('./when/execute-routine-step').executeRoutineStep,

    defineVariableStep: require('./then/define-variable-step'),
    tableIsEmptyStep: require('./then/table-is-empty-step'),
    validateTableExactlyStep: require('./then/validate-table-exactly-step'),
    variableEqualsStep: require('./then/variable-equals-step')
};
