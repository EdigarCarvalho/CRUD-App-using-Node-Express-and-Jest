import users from '../database'

function removeFromDatabaseService(index) {
    users.splice(index, 1);
}

export default removeFromDatabaseService;