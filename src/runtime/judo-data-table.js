const headerParser = require('../runtime/header-parser');

/**
 *
 * @type {module.JudoDataTable}
 */
module.exports = class JudoDataTable {

    constructor(dataTable) {
        this._dataTable = dataTable;
        if (!dataTable.hashes().length)
            throw new Error('Invalid data table');
        this.headers = headerParser(dataTable.raw()[0]);
        this._dataTable.rawTable[0] = this.headers.fields;
        this.table = dataTable.hashes();
    }

    fields () {
        return this.headers.fields;
    }

    order () {
        return this.headers.order;
    }

    body () {
        return this.table;
    }

};