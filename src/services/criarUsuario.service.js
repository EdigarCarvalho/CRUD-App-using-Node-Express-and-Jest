import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcryptjs';

async function criaUsuarioService(data){
    const account = {
        uuid: uuidv4(),
        name: data.name,
        email: data.email,
        password: await hash(data.password, 8),
        isAdm: data.isAdm,
        createdOn: new Date(),
        updatedOn: new Date()
    }

    return account;
}

export default criaUsuarioService;