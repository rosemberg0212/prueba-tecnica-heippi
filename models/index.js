const Server = require('./server');
const Usuario = require('./usuario');
const UsuarioHospital = require('./usuarioHospital');
const UsuarioMedico = require('./usuarioMedico');
const UsuarioPaciente = require('./usuarioPaciente');
const ObsMedicas = require('./observacionesMedicas');
const Token = require('./token');

module.exports = {
	Server, 
	Usuario,
	UsuarioHospital,
	UsuarioMedico, 
	UsuarioPaciente, 
	ObsMedicas,
	Token
}