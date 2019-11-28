module.exports = (groups, events, attendees) => {
    const fs = require("fs"), 
        shell = require("shelljs"), 
        copydir = require("copy-dir"), 
        beautify = require('beautify'), 
        beaut = (obj) => beautify(JSON.stringify(obj), { format: 'json' });

    // Gathering layouts
    const pageLayout = require('./_layouts/page.js'),
        homeItemModule = require('./_modules/homeItem'),
        // itemModule = require('./_modules/item'),
        headModule = require('./_modules/head');

    // Meta Data Gatherer
    let globals = require('./_config.js'),
    domain = 'data.compiledmcr.com',
    site = `https://${domain}`,
    sitemap = [];

    // Moving static files to site
    shell.mkdir('-p', './_site');
    shell.mkdir('-p', './_site/data');
    shell.mkdir('-p', './_site/_data');
    copydir.sync('./_static', './_site');
    copydir.sync('./_data', './_site/_data');
    
    // Generate _site

    let datasetDesc = (location, locationName) => `If you wish to view this data, you can either visit the Github repo, or download it directly from <a href="${ location }" targer="_blank">${ locationName }</a>.`;

    let datasets = [{
        name: "Groups",
        count: numberWithCommas(groups.length),
        desc: datasetDesc("./_data/groups.json", "here")
    }, {
        name: "Events",
        count: numberWithCommas(events.length),
        desc: datasetDesc("./_data/events.json", "here")
    }, {
        name: "Attendees",
        count: numberWithCommas(attendees.length),
        desc: datasetDesc("./_data/attendees.json", "here")
    }];

    let pages = []; // TODO

    // Creating Home Page
    let index = pageLayout(
        headModule(globals.metaTitlePrefix + globals.title, globals.desc, globals.metaTags),
        globals.img,
        globals.title,
        globals.desc,
        globals.social,
        globals.itemNames,
        datasets.map(dataset => {
            return homeItemModule(
                `${dataset.name} (${dataset.count})` ,
                dataset.desc,
                "",
                dataset.background ? dataset.background : ""
            )
        }).join("\n"),
        globals.exampleNames,
        pages.map(page => {
            return homeItemModule(
                `${page.name}` ,
                page.desc,
                page.slug,
                page.background ? page.background : ""
            )
        }).join("\n"),
        globals.background
    );

    fs.writeFileSync(`./_site/${globals.slug}.html`, index, () => {});

    // Generate Information from Large Data
    fs.readdirSync(`${__dirname}/_scripts`).forEach(script => {
        let result = require(`${__dirname}/_scripts/${script}`)(groups, events, attendees);
        let fileName = script.split("/").slice(-1)[0].replace(".js", ".json");
        fs.writeFileSync(`${__dirname}/_site/data/${fileName}`, beaut(result), () => {});
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}