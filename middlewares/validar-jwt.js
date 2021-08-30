const { request, response } = require('express')
const jwt = require('jsonwebtoken');


const Usuario = require('../models/usuario');



const validarJWT = async ( req= request, res = response, next) => {

    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            msg: 'No hay un token en la petición'
        });
    }

    try {

        // Verificar el token
        const {uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);
        req.uid = uid;
        
        // usuario logeado correctamente
        const usuario = await Usuario.findById( uid );

        // usuario no existe
        if( !usuario){
            return res.status(401).json({ 
                msg: 'Token no válido - usuario no existe en  DB'
            });
        }

        // verificar si el uid tiene estado true
        if ( !usuario.estado ) {
            return res.status(401).json({
                
                msg: 'Token no válido - usuario con estado false'
            });
        }

        req.usuario = usuario;

        next();

        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        });
    }

}

// colocar siempre en llavez
module.exports = {
    validarJWT
}