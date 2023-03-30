import users from './../database'

function listaUsuariosService(sendPassword) {
 
    const list = users.map(el => {
        return sendPassword ? { ...el } : { ...el, password: undefined }})

    return list;
    
}

export default listaUsuariosService;