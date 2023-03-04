const { parse } = require('dotenv');
const {UsuarioMedico, UsuarioHospital} = require('../models')

const obtenerUsuariosMedicos = async(req, res)=>{
    const userMedico = await UsuarioMedico.find({usuario: req.usuario, estado: true})
        .populate('usuario','identificacion')
        .populate('hospital','nombre')

    res.json({
        userMedico
    });
}


const crearUsuarioMedico= async (req, res)=>{
    const {estado, usuario, ...body} = req.body;

    const data = {
        ...body,
        usuario: req.usuario._id,
    }
    
    const userMedico = new UsuarioMedico(data);

    await userMedico.save();

    res.json(userMedico)
}

module.exports = {
    obtenerUsuariosMedicos,
    crearUsuarioMedico
}