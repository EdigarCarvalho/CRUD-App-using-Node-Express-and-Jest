import getTokenService from "../services/getToken.service";
import jwt from 'jsonwebtoken'
import findUserByIDService from "../services/findUserByID.service";
import patchUserService from "../services/patchUser.service";

function patchedUserController(req, res){
    const token = getTokenService(req);
    const verifiedToken = jwt.verify(token, 'secret key')

    const tokenId = verifiedToken.id;

    const data = findUserByIDService(tokenId);
    
    const patchedUser = patchUserService(req, data);

    res.status(200).json({...patchedUser })
}

export default patchedUserController;