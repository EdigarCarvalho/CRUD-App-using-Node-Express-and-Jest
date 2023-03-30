import getTokenService from "../services/getToken.service";
import jwt from 'jsonwebtoken'

function validatePermissionMiddleware(req, res, next){
    
    const token = getTokenService(req);
    const verifiedToken = jwt.verify(token, 'secret key')

    const path = req.originalUrl;
    const pathId = path.split('/')[2];
    
    const isAdm = verifiedToken.isAdm
    
    if (!isAdm)        
        if(pathId) return res.status(403).json({ message: "YOU CAN'T DO THIS YOU FUCKJER" })


    next();
}

export default validatePermissionMiddleware;