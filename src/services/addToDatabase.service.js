import users from './../database'

function addToDatabaseService(data) {
    users.push(data);
}

export default addToDatabaseService;