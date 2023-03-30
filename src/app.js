import listaUsuariosMiddleware from './middlewares/listaUsuarios.middleware';

import listaUsuariosControllers from './controllers/listaUsuarios.controller';

import verifyEmailController from './controllers/verifyEmail.controller';
import verifyEmailMiddleware from './middlewares/verifyEmail.middleware';

import listaUsuariosService from './services/listaUsuarios.service';
import criaUsuarioService from './services/criarUsuario.service';
import addToDatabaseService from './services/addToDatabase.service'

//-----------------------------------------
import express , { json } from 'express';
import users from './database';
import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const app = express()

app.use(json())

//----------------------------------Verbos http POST----------------------------------------------------------------------




app.post('/users', verifyEmailMiddleware, async (req, res)=> { return await verifyEmailController(req, res); })

app.post('/login', async (req, res)=> {
    const { email, password } = req.body;

    if (!email || !password) return res.status(403).json({message: "Invalid email or password"});
    

    const emails = listaUsuariosService().map((el) => el.email)

    if (!emails.includes(email)) return res.status(403).json({message: "Invalid email or password"});
    
    const user = users.find(el => el.email === email)

    const comparePass = await compare(password, user.password);

    if (!comparePass) return res.status(401).json({message: "Invalid email or password"});
    
    const token = jwt.sign({
        id: user.uuid,
        isAdm: user.isAdm,
        }, 'secret key', {
        expiresIn: '7d'
    })

    return res.status(200).json({ token })

})

//----------------------------------Verbos http GET----------------------------------------------------------------------

app.get('/users', listaUsuariosMiddleware, listaUsuariosControllers)

app.get('/users/profile', (req, res)=>{
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : false;
    
    if (!token) return res.status(401).json({ message: "Missing authorization headers." })

    const id = jwt.verify(token, 'secret key').id
    const user = {...users.find(el => el.uuid === id), password: undefined }
    
    if(!user) return res.status(401).json( {message: "User not found"})
    
    return res.status(200).json(user);
})

//----------------------------------Verbos http PATCH----------------------------------------------------------------------

app.patch('/users/*', (req, res)=>{
    
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : false;
    
    if (!token) return res.status(401).json({ message: "YOOOOOOOOOOO, TRASH"});

    const verifiedToken = jwt.verify(token, 'secret key')

    const isAdm = verifiedToken.isAdm
    const tokenId = verifiedToken.id;

    const userIndex = users.findIndex(bah=> bah.uuid === tokenId)
    const user = users[userIndex]

    if (!isAdm) {
        const path = req.originalUrl;
        const pathId = path.split('/')[2];
        
        if(pathId)return res.status(403).json({ message: "YOU CAN'T DO THIS YOU FUCKJER" })
    }

    const patched = { ...user, ...req.body }
    patched.updatedOn = new Date();

    users[userIndex] = {...patched}

    res.status(200).json({...patched, password: undefined})
})

app.delete('/users/*', (req, res)=> {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : false;
    
    if (!token) return res.status(401).json({ message: "YOOOOOOOOOOO, TRASH"});

    const verifiedToken = jwt.verify(token, 'secret key')
    const isAdm = verifiedToken.isAdm;
    const tokenId = verifiedToken.id;
    
    if (!isAdm) {
        const path = req.originalUrl;
        const pathId = path.split('/')[2]

        if (pathId) return res.status(403).json({ message: "YOU CAN'T DO THIS YOU FUCKJER" })
    }

    const userIndex = listaUsuariosService().findIndex(bah=> bah.uuid === tokenId)

    users.splice(userIndex, 1);
    
    res.status(204).json({message: "Account was deleted :D"})
});

export default app

