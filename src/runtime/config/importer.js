const BASE_PATH = '../../../';

/**
 * Import config files from install directory
 *
 * @param {string} key :: name of the config module to import
 */
function importConfig(key) {
    try {
        return require(module.exports.basePath() + key + '.conf');
    } catch (e) {
        // Return empty object for non-existent configuration file.
        return {};
    }
}

function basePath() {
    return BASE_PATH;
}

module.exports = {
    importConfig,
    basePath
};
