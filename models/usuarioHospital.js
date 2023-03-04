const {Schema, model} = require('mongoose')

const UsuarHospitalSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    direccion: {
        type: String,
        required: [true, 'La dirección es obligatoria'],
    },
    serviciosMedicos: {
        type: Array
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


module.exports = model('UsuarioHospital', UsuarHospitalSchema);