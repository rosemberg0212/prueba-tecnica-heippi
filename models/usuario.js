const {Schema, model} = require('mongoose')

const UsuarioSchema = Schema({
    identificacion: {
        type: String,
        required: [true, 'La identificación es obligatoria'],
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    telefono: {
        type: Number
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    rol: {
        type: String,
        required: true,
        default: 'PACIENTE',
        emun: ['HOSPITAL','MEDICO']
    },
    estado: {
        type: Boolean,
        default: true
    },
});

//sacar la version y la contraseña
UsuarioSchema.methods.toJSON = function() {
    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);