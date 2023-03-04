const {Schema, model} = require('mongoose')

const UsuarPacienteSchema = Schema({
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
    estado: {
        type: Boolean,
        default: true
    },
    usuario: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario',
		required: true
	},
});


module.exports = model('UsuarioPaciente', UsuarPacienteSchema);