module.exports = (groups, events, attendees) => {
    const fs = require("fs"), shell = require("shelljs"), copydir = require("copy-dir"), beautify = require('beautify'), beaut = (obj) => beautify(JSON.stringify(obj), { format: 'json' });
    // Moving static files to site
    shell.mkdir('-p', './_site');
    shell.mkdir('-p', './_site/data');
    shell.mkdir('-p', './_site/_data');
    copydir.sync('./_static', './_site');
    copydir.sync('./_data', './_site/_data');
    // Generate _site

    // Generate Information from Large Data
    fs.readdirSync(`${__dirname}/_scripts`).forEach(script => {
        let result = require(`${__dirname}/_scripts/${script}`)(groups, events, attendees);
        let fileName = script.split("/").slice(-1)[0].replace(".js", ".json");
        fs.writeFileSync(`${__dirname}/_site/data/${fileName}`, beaut(result), () => {});
    });
}