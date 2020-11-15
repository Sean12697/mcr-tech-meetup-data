module.exports = (groups, events, attendees) => {
    let sankey = [], options = {
        minEvents: 120,
        minWeight: 0
    };

    attendees.filter(a => a.events.length > options.minEvents).forEach(attendee => {
        let groups = attendee.events.map(id => events.find(event => event.id == id).group.name);
        let count = counts(groups);
        Object.keys(count).forEach(groupName => {
            if (count[groupName] > options.minWeight) sankey.push([attendee.name, groupName, count[groupName]]);
        });
    });

    return sankey;
}

function counts(arr) {
    var counts = {};
    for (var i = 0; i < arr.length; i++) counts[arr[i]] = 1 + (counts[arr[i]] || 0);
    return counts;
}