const chalk = require('chalk');
const cucumber = require('cucumber/lib/cli/run');

/**
 *
 * @returns {Promise<void>}
 */
module.exports.run = async (options) => {
    const config = require('./runtime/config')(options);

    if (config.judo.sandbox)
        console.log(chalk.red.bold('\nJudo is running in Sandbox mode. All changes will be committed!\n'));

    process.argv.push('--require');
    process.argv.push(__dirname + '/cucumber/');

    await cucumber.default();
};