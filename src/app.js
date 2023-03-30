import listaUsuariosMiddleware from './middlewares/listaUsuarios.middleware';
import verifyEmailMiddleware from './middlewares/verifyEmail.middleware';
import validateEmailPasswordMiddleware from './middlewares/validateEmailPassword.middleware';
import validateTokenMiddleware from './middlewares/validateToken.middleware';
import verifyUserExistenceMiddleware from './middlewares/verifyUserExistence.middleware'
import validatePermissionMiddleware from './middlewares/validatePermission.middleware';

import listaUsuariosControllers from './controllers/listaUsuarios.controller';
import createAccountController from './controllers/createAccount.controller';
import loginController from './controllers/login.controller';
import getUserController from './controllers/getUser.controller';
import patchedUserController from './controllers/patchUser.controller';
import removeUserController from './controllers/removeUser.controller';

import express , { json } from 'express';


const app = express()
app.use(json())

//----------------------------------http verbs POST----------------------------------------------------------------------


app.post('/users', verifyEmailMiddleware, async (req, res)=> { return await createAccountController(req, res); })

app.post('/login', async (req, res, next)=> { return await validateEmailPasswordMiddleware(req, res, next) }, loginController)

//----------------------------------http verbs GET----------------------------------------------------------------------

app.get('/users', listaUsuariosMiddleware, listaUsuariosControllers)

app.get('/users/profile', validateTokenMiddleware, verifyUserExistenceMiddleware, getUserController)

//----------------------------------http verbs PATCH----------------------------------------------------------------------

app.patch('/users/*', validateTokenMiddleware, validatePermissionMiddleware, patchedUserController)

//----------------------------------http verbs DELETE----------------------------------------------------------------------

app.delete('/users/*', validateTokenMiddleware, validatePermissionMiddleware, removeUserController);

export default app