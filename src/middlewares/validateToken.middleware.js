import getTokenService from "../services/getToken.service";

function validateTokenMiddleware(req, res, next) {
    
    const token = getTokenService(req);
    
    if (!token) return res.status(401).json({ message: "Missing authorization headers." })
    
    next();
}

export default validateTokenMiddleware;