import jwt from 'jsonwebtoken'
import listaUsuariosService from '../services/listaUsuarios.service';
import getTokenService from '../services/getToken.service';

function verifyUserExistenceMiddleware (req, res, next) {

    const token = getTokenService(req);
    const id = jwt.verify(token, 'secret key').id
    const user = listaUsuariosService().find(el => el.uuid === id);
    
    if(!user) return res.status(401).json( {message: "User not found"})

    next();
}

export default verifyUserExistenceMiddleware;