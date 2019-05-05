const yargs = require('yargs');
const chalk = require('chalk');
const cucumber = require('cucumber/lib/cli/run');

const argv = yargs
    .version(false)
    .help(false)
    .usage('Judo')
    .argv;

const config = require('./runtime/config')(argv);

/**
 *
 * @returns {Promise<void>}
 */
module.exports.run = async () => {

    console.log(chalk.cyan(`    
         ▄█ ███    █▄  ████████▄   ▄██████▄  
        ███ ███    ███ ███   ▀███ ███    ███ 
        ███ ███    ███ ███    ███ ███    ███ 
        ███ ███    ███ ███    ███ ███    ███ 
        ███ ███    ███ ███    ███ ███    ███ 
        ███ ███    ███ ███    ███ ███    ███ 
        ███ ███    ███ ███   ▄███ ███    ███ 
    █▄ ▄███ ████████▀  ████████▀   ▀██████▀  
    ▀▀▀▀▀▀`));

    if (config.judo.sandbox)
        console.log(chalk.red.bold('\nJudo is running in Sandbox mode. All changes will be committed!\n'));

    process.argv.push('--require');
    process.argv.push(__dirname + '/cucumber/');

    await cucumber.default();
};