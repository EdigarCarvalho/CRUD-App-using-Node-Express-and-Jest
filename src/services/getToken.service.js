function getTokenService(req) {
    
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : false;
    return token;
}

export default getTokenService;