const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '' ) => {

    return new Promise ( (resolve, reject) => {

        const payload = {uid};

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err , token) => {
            if( err) {
                console.log( err );
                reject('No se pudo generar el token')
            } else {
                resolve ( token );
            }
        });

    });
}

// obtener el menu dependiendo del rol
/**
 * Se debe hacer un query de cuales menus estan asociado al 
 * rol del usuario y traer esos menus para colocarlos en obtenerMenu
 */
const obtenerMenu = () => {

}

module.exports = {
    generarJWT
};