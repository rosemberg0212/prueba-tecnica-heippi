const {Router} = require('express');
const {check} = require('express-validator');
const {login} = require('../controllers/auth')
const {validarCampos} = require('../middlewares/validar-campos')

const router = Router();

router.post('/login',[
	check('identificacion','La identificación es obligatoria').not().isEmpty(),
	check('password','El password es obligatorio').not().isEmpty(),
	validarCampos
],login) 

module.exports = router