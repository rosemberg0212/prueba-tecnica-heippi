const {UsuarioPaciente} = require('../models')

const obtenerUsuariosPaciente = async(req, res)=>{
    const userPaciente = await UsuarioPaciente.find({usuario: req.usuario, estado: true})
        .populate('usuario','identificacion')

    res.json({
        userPaciente
    });
}


const crearUsuarioPaciente= async (req, res)=>{
    const {estado, usuario, ...body} = req.body;


    const data = {
        ...body,
        usuario: req.usuario._id,
    }
    
    const userPaciente = new UsuarioPaciente(data);

    await userPaciente.save();

    res.json(userPaciente)
}

module.exports = {
    obtenerUsuariosPaciente,
    crearUsuarioPaciente
}