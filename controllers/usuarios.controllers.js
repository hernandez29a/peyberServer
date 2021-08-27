const { response, request } = require('express')

const usuariosGet = (req = request, res = response) => {

    const {q,nombre = 'no hay datos',apikey} = req.query;

    res.json({
        msg: 'get API controlador',
        nombre,
        apikey
    });
}

const usuariosPost = (req , res = response) => {

   
    const {nombre, edad} = req.body;

    res.status(201).json({
        msg: 'post API controlador',
        nombre,
        edad
    });
}

const usuarioPut = (req, res = response) => {

     //capturamos la informacion que viene de la ruta
     const {id} = req.params;

    res.json({
        msg: 'put API actualizar o modificar usuarioDelete',
        id
    });
}

const usuarioDelete = (req, res = response) => {
    res.json({
        msg: 'delete API para borrar usuarioDelete'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuarioPut,
    usuarioDelete
}