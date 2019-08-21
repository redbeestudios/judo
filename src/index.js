const chalk = require('chalk');
const Cli = require('cucumber').Cli;

/**
 *
 * @returns {Promise<void>}
 */
module.exports.run = (options) => {
    const config = require('./runtime/config')(options);

    if (config.judo.sandbox)
        console.log(chalk.red.bold('\nJudo is running in Sandbox mode. All changes will be committed!\n'));

    process.argv.push('--require');
    process.argv.push(__dirname + '/cucumber/');

    let cli = new Cli({
        argv: process.argv,
        cwd: process.cwd(),
        stdout: process.stdout
    });

    return cli.run()
        .catch(error => Promise.reject(error.jse_cause.originalError));
};
