const chalk = require('chalk');
const Cli = require('cucumber').Cli;

/**
 *
 * @returns {Promise<void>}
 */
module.exports.run = (options) => {
    const config = require('./runtime/config')(options);

    if (!config.judo.engine)
        return Promise.reject(chalk.red('No engine detected. Please configure one either with cli args, env_vars, or file. ie: --judo.engine mssql'));

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
        .then(processFinished)
        .catch(processError);
};

function processFinished(result) {
    return result.success ?
        Promise.resolve(result) :
        Promise.reject('Error: some steps failed!');
}

function processError(error) {
    return Promise.reject((error.jse_cause && error.jse_cause.originalError) || error);
}
