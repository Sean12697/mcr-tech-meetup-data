let fetch = require('node-fetch'), groupsTextUrl = "https://manchester-tech-events.netlify.com/data/meetup.js", header = { method: 'GET', dataType: 'jsonp' };

// API Endpoints
let groupUrl = (group) => `https://api.meetup.com/${group}?&sign=true&photo-host=public`, // https://secure.meetup.com/meetup_api/console/?path=/:urlname
    eventsUrl = (group) => `https://api.meetup.com/${group}/events?&sign=true&photo-host=public&page=200&status=past`, // https://secure.meetup.com/meetup_api/console/?path=/:urlname/events
    attendeesUrl = (group, eventId) => `https://api.meetup.com/${group}/events/${eventId}/rsvps?&sign=true&photo-host=public`; // https://secure.meetup.com/meetup_api/console/?path=/:urlname/events/:event_id/rsvps


module.exports = async () => {
    return new Promise(resolve => {
        // Script
        fetch(groupsTextUrl).then(res => res.text()).then(body => {
            let groupsText = JSON.parse(body.replace("module.exports = ", "").replace(";", ""));

            // Get All Groups
            getAll(groupsText.map(groupUrl), header).then(groups => {
                // Get All Groups Events
                getAll(groupsText.map(eventsUrl), header).then(rawEvents => {
                    let events = [];
                    // Push Events into an Array from Object nests
                    rawEvents.forEach(groupEvents => {
                        let keys = Object.keys(groupEvents);
                        keys.forEach(key => {
                            events.push(groupEvents[key]);
                        });
                    });
                    // Sort
                    events = events.sort((a,b) => b.time - a.time)
                        .filter(e => !e.hasOwnProperty("errors"))
                        .filter(e => e.group != undefined)
                        .map(e => {
                            if (e.description) e.description = removeTextHTML(e.description);
                            return e;
                        });
                    // require("fs").writeFileSync("events.json", JSON.stringify(events), () => {});
                    // let noGroupEvents = events.filter(e => e.group == undefined);
                    // console.log("No Groups: ", noGroupEvents);
                    // Get Attendees
                    getAll(events.map(e => attendeesUrl(e.group.urlname, e.id)), header).then(attendeesRaw => {
                        // require("fs").writeFileSync("attendeesRaw.json", JSON.stringify(attendeesRaw), () => {});
                        let attendeesArray = [], attendees = [];
                        // Push Attendees into an Array from Object nests
                        attendeesRaw.forEach(eventSignups => {
                            let keys = Object.keys(eventSignups);
                            keys.forEach(key => {
                                if (eventSignups[key].response == "yes") attendeesArray.push(eventSignups[key]);
                            });
                        });
                        // Organize
                        attendeesArray.forEach(rsvp => {
                            let index = attendees.findIndex(a => a.id == rsvp.member.id);
                            if (index == -1) {
                                attendees.push(rsvpToAttendee(rsvp));
                            } else {
                                attendees[index].events.push(rsvp.event.id);
                                if (rsvp.member.bio ? !attendees[index].bios.includes(rsvp.member.bio) : false) attendees[index].bios.push(rsvp.member.bio);
                                if (rsvp.member.photo ? !attendees[index].photos.includes(rsvp.member.photo.photo_link) : false) attendees[index].photos.push(rsvp.member.photo.photo_link);
                                if (rsvp.member.role) { // Checking a users role for a groups event, and ensuring it is not already accounted for
                                    if (attendees[index].roles.findIndex(roles => roles.group == rsvp.group.id) == -1) {
                                        attendees[index].roles.push({ group: rsvp.group.id, role: rsvp.member.role });
                                    }
                                }
                            }
                        });
                        // Complete
                        resolve({ groups, events, attendees });
                    });
                });
            });
        });
    });
}


// Functions

function rsvpToAttendee(rsvp) {
    return {
        id: rsvp.member.id,
        name: rsvp.member.name,
        events: [ rsvp.event.id ],
        bios: rsvp.member.bio ? [rsvp.member.bio] : [],
        photos: rsvp.member.photo ? [rsvp.member.photo.photo_link] : [],
        roles: rsvp.member.role ? [{ group: rsvp.group.id, role: rsvp.member.role }] : []
    }
}

async function getAll(urls, header) {
    return new Promise(resolve => {
        Promise.all(urls.map(url => fetch(url, header || {}))).then(responses =>
            Promise.all(responses.map(res => res.json()))
        ).then(resolve);
    });
}

function removeTextHTML(text) {
    return text.replace(/(<([^>]+)>)/ig, "");
}