/**
 * @typedef {Object} Header
 * @property {Array<string>} fields - the fields of the table
 * @property {Array<string>} order - the fields to order
 */

/**
 * @param {Array<string>} fields
 * @returns {Header}
 */
module.exports = function headerParser(fields) {
    return fields.reduce((acc, curr) => {
        const matched = curr.match(/{(asc|desc)}/gi);
        if (!matched)
            acc.fields.push(curr);
        else {
            acc.fields.push(curr.replace(matched[0], '').trim());
            acc.order.push(curr.replace(/{|}/g, '').trim());
        }
        return acc;
    }, {
        fields: [],
        order: []
    });
};