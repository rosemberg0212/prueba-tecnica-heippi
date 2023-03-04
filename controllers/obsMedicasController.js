
const {ObsMedicas} = require('../models')

const obtenerObsMedicas = async(req, res)=>{
    const obMedicas = await ObsMedicas.find({usuario: req.usuario, estado: true})
        .populate('paciente','nombre')
        .populate('hospital','nombre')
        .populate('medico','nombre')

    res.json({
        obMedicas
    });
}

const obtenerObsMedicasPaciente = async(req, res)=>{
    const {id} = req.params;
    const obMedicas = await ObsMedicas.find({ paciente: id})  

    res.json({
        obMedicas
    });
}

const obtenerObsMedicasHospital = async(req, res)=>{

    const obMedicas = await ObsMedicas.find({estado: true})


    res.json({
        obMedicas
    });
}

const crearObsMedicas= async (req, res)=>{
    const {estado, usuario, ...body} = req.body;

    const data = {
        ...body,
        usuario: req.usuario._id,
    }
    
    const obMedicas = new ObsMedicas(data);

    await obMedicas.save();

    res.json(obMedicas)
}

module.exports = {
    obtenerObsMedicas,
    crearObsMedicas,
    obtenerObsMedicasPaciente,
    obtenerObsMedicasHospital
}