
module.exports = (groups, events, attendees) => {
    let locations = [];

    events.forEach(event => {
        if (event.venue) {
            if (event.venue.lat && event.venue.lon) {
                locations.push({
                    lat: event.venue.lat,
                    lon: event.venue.lon,
                    locationName: event.venue.name,
                    eventName: event.name,
                    groupName: event.group.name,
                    attendees: event.yes_rsvp_count
                });
            }
        }
    });

    return locations;
};