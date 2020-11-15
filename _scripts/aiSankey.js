module.exports = (groups, events, attendees) => {
    let sankeyData = [], filteredEvents = events.filter(e => e.venue != undefined).filter(e => e.venue.name != undefined).filter(e => contains(`${e.name} - ${e.description}`.toLowerCase(), allToLowerCase([" ai ", " ml ", "artificial intelligence", "data"])))

    filteredEvents.forEach(event => { 
        sankeyData.push([event.name, event.venue.name, event.yes_rsvp_count]);
        sankeyData.push([event.group.name, event.name, event.yes_rsvp_count]);
    });

    return sankeyData;
};

function allToLowerCase(stringsArray) {
    return stringsArray.map(s => s.toLowerCase());
}

// https://stackoverflow.com/questions/37896484/multiple-conditions-for-javascript-includes-method
function contains(target, pattern) {
    let value = 0;
    pattern.forEach(word => value = value + target.includes(word));
    return (value === 1);
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}