const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuarioPut, usuariosPost, usuarioDelete } = require('../controllers/usuarios.controllers');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const {validarCampos,validarJWT,esAdminRol,tieneRole} = require('../middlewares');


const router = Router();

// Cargar usuarios
router.get('/',[
    validarJWT, // Verificar si es un usuario valido para darle acceso
    //esAdminRol, // validar que el rol es administrador // usar el middleware de tieneRol
    tieneRole('ADMIN_ROLE'), // se le mandan los roles de la bd , para dar acceso
], usuariosGet);

// Crear Usuario
router.post('/', [
    check('nombre', 'El nombre no es obligatorio').not().isEmpty(), // Debe mandar un nombre
    check('password', 'El obligatorio y mas de 6 letras').isLength( {min: 6}), // la contraseña es obligatoria y matyor a 6
    check('correo', 'El correo no es válido').isEmail(), // Debe mandar un correo valido
    check('correo').custom( emailExiste ), //verificar si el correo existe ne la bd
    check('rol').custom( esRoleValido ), // Verificar si el rol existe en la bd 
    validarCampos // validar los check para pasar al controlador
] , usuariosPost);

// Actualizar Usuario
router.put('/:id',[  
    validarJWT,  
    check('id' , 'No es un ID valido').isMongoId(), // verificar si es un id de mongo DB
    check('id').custom( existeUsuarioPorId ), // verificar si el id esta registrado en la bd
    check('rol').custom( esRoleValido ), // Verificar si el rol existe en la bd 
    validarCampos // validar los check para pasar al controlador
], usuarioPut);

// Borrar usuario
router.delete('/:id',[
    validarJWT, // Verificar si es un usuario valido para darle acceso
    //esAdminRol, // validar que el rol es administrador // usar el middleware de tieneRol
    tieneRole('ADMIN_ROLE'), // se le mandan los roles de la bd , para dar acceso
    check('id' , 'No es un ID valido').isMongoId(), // verificar si es un id de mongo DB
    check('id').custom( existeUsuarioPorId ), // verificar si el id esta registrado en la bd
    validarCampos  // validar los check para pasar al controlador
] ,usuarioDelete);

module.exports = router;
