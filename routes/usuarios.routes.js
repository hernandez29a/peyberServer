const { Router } = require('express');
const { check } = require('express-validator');


const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const { usuariosGet, usuarioPut, usuariosPost, usuarioDelete } = require('../controllers/usuarios.controllers');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id',[
    check('id' , 'No es un ID valido').isMongoId(), // verificar si es un id de mongo DB
    check('id').custom( existeUsuarioPorId ), // verificar si el id esta registrado en la bd
    check('rol').custom( esRoleValido ), // Verificar si el rol existe en la bd 
    validarCampos // validar los check para pasar al controlador
], usuarioPut);

router.post('/', [
    check('nombre', 'El nombre no es obligatorio').not().isEmpty(), // Debe mandar un nombre
    check('password', 'El obligatorio y mas de 6 letras').isLength( {min: 6}), // la contraseña es obligatoria y matyor a 6
    check('correo', 'El correo no es válido').isEmail(), // Debe mandar un correo valido
    check('correo').custom( emailExiste ), //verificar si el correo existe ne la bd
    check('rol').custom( esRoleValido ), // Verificar si el rol existe en la bd 
    validarCampos // validar los check para pasar al controlador
] , usuariosPost);

router.delete('/:id',[
    check('id' , 'No es un ID valido').isMongoId(), // verificar si es un id de mongo DB
    check('id').custom( existeUsuarioPorId ), // verificar si el id esta registrado en la bd
    validarCampos  // validar los check para pasar al controlador
] ,usuarioDelete);

module.exports = router;
