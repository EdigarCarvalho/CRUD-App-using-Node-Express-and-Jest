import users from '../database'

function patchUserService(req, data) {

    const { user, userIndex } = data;

    const patchedUser = { ...user, ...req.body }
    
    patchedUser.updatedOn = new Date();

    users[userIndex] = { ...patchedUser }

    return { ...patchedUser, password: undefined };
}

export default patchUserService;