import listaUsuariosService from '../services/listaUsuarios.service';
import jwt from 'jsonwebtoken';

function loginController(req, res) {
    const { email } = req.body;
    const user = listaUsuariosService().find(el => el.email === email)

    const token = jwt.sign({
        id: user.uuid,
        isAdm: user.isAdm,
        }, 'secret key', {
        expiresIn: '7d'
    })

    return res.status(200).json({ token })
    
}

export default loginController;