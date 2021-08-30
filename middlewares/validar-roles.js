const response = require('express');

const esAdminRol = (req, res = response, next ) => {

    if( !req.usuario  ) {
        return res.status(500).json({
            msg : 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const { rol, nombre } = req.usuario;

    if( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ nombre } no posee rol administrador`
        });
    }

    next();

}

const tieneRole = (...roles ) => {

    return (req, res= response, next) => {

        if( !req.usuario  ) {
            return res.status(500).json({
                msg : 'Se quiere verificar el rol sin validar el token primero'
            });
        }

        if( !roles.includes( req.usuario.rol) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            });
        }


        next();
    }

}

// colocar siempre en llavez
module.exports = {
    esAdminRol,
    tieneRole
}