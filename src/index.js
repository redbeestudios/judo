const chalk = require('chalk');
const Cli = require('cucumber').Cli;

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

    let cli = new Cli({
        argv: process.argv,
        cwd: process.cwd(),
        stdout: process.stdout,
    });

    await cli.run();
};
