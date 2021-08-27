const { Router } = require('express');

const { usuariosGet, usuarioPut, usuariosPost, usuarioDelete } = require('../controllers/usuarios.controllers');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuarioPut);

router.post('/', usuariosPost);

router.delete('/', usuarioDelete);


module.exports = router;
