module.exports = (groups, events, attendees) => {
    // let connections = [];
    // attendees = attendees.filter(a => a.events.length > 10);
    // let total = attendees.length * attendees.length;

    // attendees.forEach((attendeeOne, indexOne) => {
    //     attendees.forEach((attendeeTwo, indexTwo) => {
    //         // console.log(`${(indexOne * attendees.length) + indexTwo} of ${total}`);
    //         if (indexOne != indexTwo) {
    //             let count = 0;
    //             attendeeOne.events.forEach(e => { 
    //                 if (attendeeTwo.events.includes(e)) count++;
    //             });
    //             connections.push(count);
    //         }
    //     });
    // });

    // return count(connections);
    return {};
}

function count(ResultArray) {
    let counts = {};
    for (p = 0; p < ResultArray.length; p++) counts[ResultArray[p]] = (counts[ResultArray[p]] + 1) || 1;
    return counts;
}