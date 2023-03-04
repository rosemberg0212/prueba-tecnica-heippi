const express = require('express')
const cors = require('cors');

const { dbConnection } = require('../db/config');

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT;

        this.paths = {
            authPath:   '/api/auth',
            usuarios:   '/api/usuarios',
            usuariosHospital:   '/api/usuarios/hospital',
            usuariosMedico:   '/api/usuarios/medico',
            usuariosPaciente:   '/api/usuarios/paciente',
            obsMedicas:   '/api/usuarios/obsMedicas',
            resetear:   '/api/password-reset',
        }

        //conectar BD
        this.conectarDB()

        //Middlewares
        this.Middlewares()

        //Rutas de mi aplicacion
        this.routes()
    }

    async conectarDB(){
        await dbConnection()
    }

    Middlewares(){
        //CORS
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'))

    }
    
    routes(){
        this.app.use(this.paths.authPath, require('../routes/auth'));
        this.app.use(this.paths.usuarios, require('../routes/user'));
        this.app.use(this.paths.usuariosHospital, require('../routes/userHospitalRoutes'));
        this.app.use(this.paths.usuariosMedico, require('../routes/userMedicoRouter'));
        this.app.use(this.paths.usuariosPaciente, require('../routes/userPacienteRouter'));
        this.app.use(this.paths.obsMedicas, require('../routes/obsMedicasRoutes'));
        this.app.use(this.paths.resetear, require('../routes/passwordReset'));
    }

    listem(){
        this.app.listen(this.port, ()=>{
            console.log('corriendo en el puerto', this.port)
        }) 
    }
}

module.exports = Server;