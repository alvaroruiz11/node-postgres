const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, obtenerUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeUsuario, emailExiste, esRoleValido } = require('../helpers/validar-db');

const router = Router();



router.get('/', obtenerUsuarios);

//Crear usuarios
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'Tiene que ser un correo').isEmail(),
    check('correo').custom( emailExiste ),
    check('password', 'Tiene que ser mas de 6 caracteres').isLength({ min: 6 }),
    check('rol').custom( esRoleValido ),
    validarCampos
], crearUsuario);

//Actulizar usuario
router.put('/:id',[
    check('id').custom( existeUsuario ),
    check('rol').custom( esRoleValido ),
    validarCampos
], actualizarUsuario );

//Borrar usuario
router.delete('/:id',[
    check('id').custom( existeUsuario ),
    validarCampos
], borrarUsuario);





module.exports = router;