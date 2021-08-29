/** Ruta de este controlador /api/usuarios */

const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async (req = request, res = response) => {

    const {limite = 5, desde = 0 } = req.query; // argumentos opcionales que vienen de la ruta
    const query = {estado:true}; //verificar si el usuario esta activo

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req , res = response) => {

    const {nombre,correo, password, rol} = req.body;
    const usuario = new Usuario({nombre,correo, password, rol});


    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );
    
    // Guardar en la BD
    await usuario.save();

    res.status(201).json({
        usuario
    });
}

const usuarioPut = async (req, res = response) => {

     //capturamos la informacion que viene de la ruta
     const {id} = req.params;
     const { password, correo , ...resto} = req.body;

        if( password ){
            // Encriptar la contraseña
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync( password, salt );
        }

        const usuario = await Usuario.findByIdAndUpdate( id, resto, {new: true} );

    res.json({
        msg: 'usuario Actualizado',
        usuario
    });
}

const usuarioDelete = async (req, res = response) => {

    //capturar el id que manda el usuario o la vista
    const id = req.params.id;
    
    //const usuario = await Usuario.findByIdAndDelete(id); //Borrar fisicamente
    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false },{new: true}); // borrar logicamente

    res.json({
        ok: true,
        msg: 'Usuario borrado',
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuarioPut,
    usuarioDelete
}