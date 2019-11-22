
module.exports = (groups, events, attendees) => {
    let peopleWithRoles = attendees.filter(attendee => attendee.roles.length != 0);
    peopleWithRoles = peopleWithRoles.sort((a,b) => b.roles.length - a.roles.length);
    return peopleWithRoles.map(person => {
        person.roleCount = person.roles.length;
        person.roles = person.roles.map(role => {
            role.group = groups.find(g => g.id == role.group).name
            return role;
        });
        return person;
    });
};