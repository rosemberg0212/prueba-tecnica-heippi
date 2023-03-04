const {Schema, model} = require('mongoose')

const obMedicasSchema = Schema({
    observacion: {
        type: String,
        required: [true, 'Es obligatorio dar los detalles de las observaciones medicas del paciente'],
    },
    estadoSalud: {
        type: String,
        required: [true, 'Es obligatorio indicar el estado de salud del paciente'],
    },
    especialidad: {
        type: String,
        required: [true, 'La especialidad aplicada es obligatoria'],
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
    paciente: {
		type: Schema.Types.ObjectId,
		ref: 'UsuarioPaciente',
		required: true
	},
    medico: {
		type: Schema.Types.ObjectId,
		ref: 'UsuarioMedico',
		required: true
	},
});


module.exports = model('ObsMedicas', obMedicasSchema);