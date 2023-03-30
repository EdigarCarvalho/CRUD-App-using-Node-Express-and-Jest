import listaUsuariosService from "../services/listaUsuarios.service";

function listaUsuariosControllers(req, res) {
    const result = listaUsuariosService();
    
    return res.status(200).json(result);
}

export default listaUsuariosControllers;