const {Router} = require('express');
const {check} = require('express-validator');

const {
	obtenerUsuariosPaciente,
    crearUsuarioPaciente
} = require('../controllers/userPacienteController');

const {validarCampos, 
	validarJWT,
    tieneRole
} = require('../middlewares/index');

const router = Router();


router.get('/',[
    validarJWT,
    tieneRole('HOSPITAL', 'MEDICO', 'PACIENTE'),
],obtenerUsuariosPaciente);

router.post('/',[
	validarJWT,
    tieneRole('PACIENTE'),
	check('nombre','El nombre es obligatorio').not().isEmpty(),
	check('direccion','La dirección es obligatoria').not().isEmpty(),
	check('fechaNacimiento','La fecha de nacimiento es obligatoria').not().isEmpty(),
	validarCampos
	],crearUsuarioPaciente);

module.exports = router