let fs = require("fs"), beautify = require('beautify'), beaut = (obj) => beautify(JSON.stringify(obj), { format: 'json' });

require("./fetchData.js")().then(data => {
    fs.writeFileSync("_data/groups.json", beaut(data.groups), () => {});
    fs.writeFileSync("_data/events.json", JSON.stringify(data.events), () => {});
    fs.writeFileSync("_data/attendees.json", beaut(data.attendees), () => {});
});