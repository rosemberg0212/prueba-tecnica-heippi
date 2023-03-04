const {Schema, model} = require('mongoose')

const UsuarMedicoioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    direccion: {
        type: String,
        required: [true, 'La dirección es obligatoria'],
    },
    fechaNacimiento: {
        type: String,
        required: [true, 'La fecha de nacimiento es obligatoria'],
    },
    especialidadMedica: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuario: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario',
		required: true
	},
    hospital: {
		type: Schema.Types.ObjectId,
		ref: 'UsuarioHospital',
		required: true
	},
});


module.exports = model('UsuarioMedico', UsuarMedicoioSchema);