import users from './../database'

function addToDatabaseService(data) {
    console.debug(data);
    users.push(data);
}

export default addToDatabaseService;