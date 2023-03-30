import listaUsuariosService from "./listaUsuarios.service";

function findUserByIDService(id) {
    const userIndex = listaUsuariosService().findIndex(bah=> bah.uuid === id)
    const user = listaUsuariosService()[userIndex]

    const data = {
        user, userIndex
    }

    return data;
}

export default findUserByIDService;