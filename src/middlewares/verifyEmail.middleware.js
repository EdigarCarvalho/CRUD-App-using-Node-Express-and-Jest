import express from 'express'
import users from './../database'
import listaUsuariosService from '../services/listaUsuarios.service';

const app = express();

app.use(express.json());

function verifyEmailMiddleware(req, res, next) {
    const usuarios = listaUsuariosService().map(el => {return el.email});
    const email = req.body.email;
    
    
    if (usuarios.includes(email)) return res.status(409).json({ message: "There's already an account with this email :(" });
    
    next();
}

export default verifyEmailMiddleware;