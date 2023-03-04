const {Usuario, UsuarioPaciente} = require('../models/index')

//Verificar si la identificacion existe
const idExiste = async (identificacion = '')=>{
	const idenlExiste = await Usuario.findOne({identificacion})
    if(idenlExiste){
        throw new Error(`La identificacion ${identificacion} ya existe`)
    }
}

//Verificar si el correo existe
const correoExiste = async (correo = '')=>{
	const emailExiste = await Usuario.findOne({correo})
    if(emailExiste){
        throw new Error(`El correo ${correo} ya existe`)
    }
}

const usuarioExiste = async (id)=>{
	const usuExiste = await Usuario.findById(id)
    if(!usuExiste){
        throw new Error(`El id ${id} no existe`)
    }
}


const pacienteExiste = async (id)=>{
	const paciExiste = await UsuarioPaciente.findById(id)
    if(!paciExiste){
        throw new Error(`El id ${id} no existe`)
    }
}
module.exports = {
	correoExiste,
	usuarioExiste,
	idExiste,
    pacienteExiste
}