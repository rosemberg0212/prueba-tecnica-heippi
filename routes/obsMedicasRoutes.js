const {Router} = require('express');
const {check} = require('express-validator');

const {
	obtenerObsMedicas,
    crearObsMedicas,
    obtenerObsMedicasPaciente,
    obtenerObsMedicasHospital
} = require('../controllers/obsMedicasController');
const { pacienteExiste } = require('../helpers/db-validator');

const {validarCampos, 
	validarJWT,
    tieneRole
} = require('../middlewares/index');

const router = Router();


router.get('/',[
    validarJWT,
    tieneRole('MEDICO'),
],obtenerObsMedicas);

router.get('/paciente/:id',[
    validarJWT,
    check('id','No es un ID valido').isMongoId(),    
    check('id').custom(pacienteExiste), 
    tieneRole('PACIENTE', 'MEDICO'),
    validarCampos
],obtenerObsMedicasPaciente);

router.get('/hospital',[
    validarJWT,
    tieneRole('HOSPITAL'),
],obtenerObsMedicasHospital);

router.post('/',[
	validarJWT,
    tieneRole('MEDICO'),
	check('observacion','Los detalles de la observacion son obligatorios').not().isEmpty(),
	check('estadoSalud','El estado de salud del paciente es obligatorio').not().isEmpty(),
	check('especialidad','La especialidad aplicada al paciente es obligatoria').not().isEmpty(),
	check('hospital','Es obligatorio colocar el hospital que presto el servicio').not().isEmpty(),
	check('paciente','Es obligatorio colocar el paciente que pidio el servicio').not().isEmpty(),
	check('medico','Es obligatorio colocar el medico que aplico el servicio').not().isEmpty(),
	validarCampos
	],crearObsMedicas);

module.exports = router