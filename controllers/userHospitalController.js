const {UsuarioHospital} = require('../models')

const obtenerUsuariosHospital = async(req, res)=>{
    const userHospital = await UsuarioHospital.find({usuario: req.usuario, estado: true})
        .populate('usuario','identificacion')

    res.json({
        userHospital
    });
} 


const crearUsuarioHospital = async (req, res)=>{
    const {estado, usuario, ...body} = req.body;

    const userHospitalDB = await UsuarioHospital.findOne({nombre: body.nombre});

    if(userHospitalDB){
        return res.status(400).json({
            msg: `el hospital ${userHospitalDB.nombre}, ya existe`
        });
    }

    const data = {
        ...body,
        usuario: req.usuario._id,
    }
    
    const userHospital = new UsuarioHospital(data);

    await userHospital.save();

    res.json(userHospital)
}

module.exports = {
    obtenerUsuariosHospital,
    crearUsuarioHospital
}