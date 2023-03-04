const {Router} = require('express');
const {check} = require('express-validator');

const {
	obtenerUsuariosHospital,
    crearUsuarioHospital
} = require('../controllers/userHospitalController');

const {validarCampos, 
	validarJWT,
    tieneRole
} = require('../middlewares/index');

const router = Router();


router.get('/',[
    validarJWT,
    tieneRole('HOSPITAL'),
],obtenerUsuariosHospital);

router.post('/',[
	validarJWT,
    tieneRole('HOSPITAL'),
	check('nombre','El nombre es obligatorio').not().isEmpty(),
	check('direccion','La dirección es obligatoria').not().isEmpty(),
	validarCampos
	],crearUsuarioHospital);

module.exports = router