module.exports = (groups, events, attendees) => {
    let RSVPs = attendees.map(a => a.events.length);
    let counted = countUnique(RSVPs);

    return {
        over_ten: Object.keys(counted).reduce((t, c) => parseInt(c) > 10 ? t + counted[c] : t, 0),
        rsvp_people: Object.keys(counted).reverse().map((rsvps, index, arr) => {
            let reducedArray = arr.slice(0, index);
            let rsvpsT = reducedArray.reduce((tot, curr) => tot + (parseInt(curr) * counted[curr]), 0);
            let peopleT = reducedArray.reduce((tot, curr) => tot + counted[curr], 0);
            return {
                rsvps: rsvpsT,
                people: peopleT,
                avg: rsvpsT / peopleT
            }
        }),
        dist: counted
    };
}

function countUnique(ResultArray) {
    let counts = {};
    for ( p = 0; p < ResultArray.length; p++) counts[ResultArray[p]] = (counts[ResultArray[p]] + 1) || 1;
    return counts;
}