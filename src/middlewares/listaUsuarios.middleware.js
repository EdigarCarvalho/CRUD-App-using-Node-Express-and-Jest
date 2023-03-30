import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.json());

function listaUsuariosMiddleware(req, res, next) {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : false;
    
    if (!token) return res.status(401).json({ message: "Missing authorization headers." })

    const isAdm = jwt.verify(token, 'secret key').isAdm
    
    if (!isAdm) return res.status(403).json({ message: "GET OUT OF HERE." })

    next();
}

export default  listaUsuariosMiddleware;