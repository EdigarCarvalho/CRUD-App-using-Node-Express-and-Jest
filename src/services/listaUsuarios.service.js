import users from './../database'

function listaUsuariosService() {
    const list = users.map(el => { 
        return { ...el, password: undefined }
 })
    return list;
}

export default listaUsuariosService;