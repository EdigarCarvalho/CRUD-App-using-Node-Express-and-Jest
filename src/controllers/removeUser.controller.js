import getTokenService from "../services/getToken.service";
import jwt from 'jsonwebtoken'
import findUserByIDService from "../services/findUserByID.service";
import removeFromDatabaseService from "../services/removeFromDatabase.service";

function removeUserController(req, res) {
    const token = getTokenService(req);
    const verifiedToken = jwt.verify(token, 'secret key')
    const tokenId = verifiedToken.id;
    
    const { userIndex } = findUserByIDService(tokenId);

    removeFromDatabaseService(userIndex);
    
    res.status(204).json({message: "Account was deleted :D"}) 
}

export default removeUserController;