import jwt from "jsonwebtoken";
import getTokenService from "../services/getToken.service";
import listaUsuariosService from "../services/listaUsuarios.service";

function getUserController(req, res) {

    const token = getTokenService(req)
    const id = jwt.verify(token, 'secret key').id
    const user = listaUsuariosService().find(el => el.uuid === id);

    return res.status(200).json(user);
}

export default getUserController;