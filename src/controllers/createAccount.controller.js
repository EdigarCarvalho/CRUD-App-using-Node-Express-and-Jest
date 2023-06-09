import addToDatabaseService from '../services/addToDatabase.service'
import criarUsuarioService from '../services/criarUsuario.service';

async function createAccountController(req, res) {
    const data = await criarUsuarioService(req.body);
    addToDatabaseService(data);

    return res.status(201).json({ ...data, password: undefined });

}

export default createAccountController;