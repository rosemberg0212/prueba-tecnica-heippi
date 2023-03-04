const {Router} = require('express');
const {check} = require('express-validator');

const {
	obtenerUsuariosMedicos,
    crearUsuarioMedico
} = require('../controllers/userMedicoController');

const {validarCampos, 
	validarJWT,
    tieneRole
} = require('../middlewares/index');

const router = Router();


router.get('/',[
    validarJWT,
    tieneRole('HOSPITAL', 'MEDICO'),
],obtenerUsuariosMedicos);

router.post('/',[
	validarJWT,
    tieneRole('HOSPITAL', 'MEDICO'),
	check('nombre','El nombre es obligatorio').not().isEmpty(),
	check('direccion','La dirección es obligatoria').not().isEmpty(),
	check('fechaNacimiento','La fecha de nacimiento es obligatoria').not().isEmpty(),
	check('hospital','Debe seleccioner el hospital al que pertenece').not().isEmpty(),
	validarCampos
	],crearUsuarioMedico);

module.exports = router