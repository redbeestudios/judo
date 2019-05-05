const chalk = require('chalk');
const cucumber = require('cucumber/lib/cli/run');
const judoConf = require('./runtime/config').judo;
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

    if (judoConf.sandbox)
        console.log(chalk.red.bold('\nJudo is running in Sandbox mode. All changes will be committed!\n'));

    process.argv.push('--require');
    process.argv.push(__dirname + '/cucumber/');

    await cucumber.default();
};