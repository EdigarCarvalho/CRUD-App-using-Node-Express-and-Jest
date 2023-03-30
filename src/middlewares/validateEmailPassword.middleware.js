import { compare } from 'bcryptjs';
import listaUsuariosService from './../services/listaUsuarios.service';

async function validateEmailPasswordMiddleware(req, res, next) {
    const { email, password } = req.body;
    
    if (!email || !password) return res.status(403).json({message: "Invalid email or password"});

    const emails = listaUsuariosService().map((el) => el.email)

    if (!emails.includes(email)) return res.status(403).json({message: "Invalid email or password"});

    const user = listaUsuariosService('send password').find(el => el.email === email)

    const comparePass = await compare(password, user.password);
    if (!comparePass) return res.status(401).json({message: "Invalid email or password"});

    next();
}

export default validateEmailPasswordMiddleware;