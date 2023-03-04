const {Router} = require('express');
const {check} = require('express-validator');

const { usuariosGet, 
	usuariosPost, 
} = require('../controllers/user');

const {validarCampos, 
} = require('../middlewares/index')

const {
	correoExiste,
	idExiste
} = require('../helpers/db-validator');

const router = Router();


router.get('/', usuariosGet);

router.post('/',[
	check('identificacion','La identificación es obligatorioa').not().isEmpty(),
	check('password','El password debe ser mas de 6 letras').isLength({min: 6}),
	check('identificacion').custom(idExiste),
	check('correo','El correo no es valido').isEmail(),
	check('correo').custom(correoExiste),
	validarCampos
],usuariosPost);


module.exports = router;