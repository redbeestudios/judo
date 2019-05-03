const cucumber = require('cucumber/lib/cli/run');

module.exports.run = async () => {
    try {
        process.argv.push('--require');
        process.argv.push(__dirname + '/cucumber/');

        await cucumber.default();
    } catch (e) {
        console.log('Database Connection Failed! Bad Config: ', e);
        process.exit();
    }
};