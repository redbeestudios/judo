const {use} = require('chai');
const comparator = require('../runtime/loose-comparator');
const {defineParameterType} = require('cucumber');

/**
 *  Override chai's 'eql' method so we can pass our own
 *  comparator to deep-eql
 */
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
