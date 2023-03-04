const {response} = require('express');
const Usuario = require('../models/usuario');

const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const usuariosGet = async (req, res = response)=>{

    const usu = await Usuario.find({estado: true})

    res.json({
        usu
    });
}

const usuariosPost = async (req, res = response)=>{


    const {password, ...body} = req.body;
    const usuario = new Usuario({password,...body});

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar usuario
    await usuario.save();

    //Generar JWT
	const token = await generarJWT(usuario.id)

    res.json({
        usuario,
        token
    });
}

module.exports = {
    usuariosGet,
    usuariosPost
}