const {response} = require('express');
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req, res = response)=>{

	const {identificacion, password} = req.body;

	try{

		//verificar si la identificacion existe
		const usuario = await Usuario.findOne({identificacion});
		if(!usuario){
			return res.status(400).json({
				msg: 'usuario / password no son correctos - identificacion'
			})
		}

		//si el usuario esta activo
		if(!usuario.estado){
			return res.status(400).json({
				msg: 'usuario / password no son correctos - estado: false'
			})
		}

		//verificar la contraseña
		const validPassword = bcryptjs.compareSync(password, usuario.password);
		if(!validPassword){
			return res.status(400).json({
				msg: 'usuario / password no son correctos - password'
			})
		}

		//Generar JWT
		const token = await generarJWT(usuario.id)

		res.json({
			usuario,
			token
		})
	}catch(error){
		console.log(error)
		return res.status(500).json({
			msg: 'Hable con el administrador'
		})
	}

}



module.exports = {
	login
}