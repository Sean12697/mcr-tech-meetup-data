let pseudonyms = {
    "SpacePortX ": "SpacePortX",
    "Spaceport X": "SpacePortX",
    "Spaceportx, 24-26 Lever Street": "SpacePortX",
    "Spaceport": "SpacePortX",
    "Spaceport Manchester": "SpacePortX",
    "SpaceportX": "SpacePortX",
    "Madlab": "MadLab",
    "Madlab Manchester": "MadLab",
    "MadLab Northern Quarter": "MadLab",
    "BBC Quay House": "BBC Media City",
    "Morecambe & Wise Room, Bridge House, BBC": "BBC Media City",
    "BBC Mediacity": "BBC Media City",
    "On the 7th Bar, Media City": "Social 7"
};

function pseudonymMapper(name) {
    return pseudonyms[name] || name;
}

function getVenuesArray(events) {
    return events.map(event => pseudonymMapper(event.venue.name)).filter(onlyUnique);
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

module.exports = (groups, events, attendees) => {
    let filteredEvents = events.filter(event => event.venue).filter(event => event.venue.name);
    let uniqueVenues = getVenuesArray(filteredEvents), dates = [];

    filteredEvents.forEach(event => {
        let date = event.local_date.substr(0, 7);
        let localDateIndex = dates.findIndex(d => d.time === date);
        let mappedVenueName = pseudonymMapper(event.venue.name);
        let venueIndex = uniqueVenues.findIndex(uv => uv == mappedVenueName);

        if (localDateIndex == -1) {
            let instances = new Array(uniqueVenues.length).fill(0);
            dates.push({ time: date, venues: instances });
        }

        let dateIndex = dates.findIndex(d => d.time == date);
        if (venueIndex != -1) dates[dateIndex].venues[venueIndex] += event.yes_rsvp_count;
    });

    dates = dates.sort((d1, d2) => new Date(d1.time) - new Date(d2.time));
    
    return [["Year/Month"].concat(uniqueVenues)].concat(dates.map(d => {
        return [d.time].concat(d.venues);
    }));
}