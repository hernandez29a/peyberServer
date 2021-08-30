const express = require('express');
const cors = require('cors');
const { dbConnection , dbConnectionTest} = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        /*Arreglo en donde se definen las rutas para ser colocadas
        en la funcion de routes
        */
        
        this.paths = {
            auth:       '/api/auth',
            //buscar:     '/api/buscar',
            usuarios:     '/api/usuarios',
            //medidas:     'api/memdidas,'
            //uploads:    '/api/uploads',
        }

        //Conectar a la base de datos
        this.conectarBD();

        // Middlewares
        this.middlewares();

        //Rutas de la aplicación

        this.routes();

    }

    // Procedimiento para conectarse a la BD
    async conectarBD() {
        //bd en la nube
        await dbConnection();

        //bd en servidor local
        //await dbConnectionTest();
    }


    // Proteccion de rutas y accesos al api desde la vista
    middlewares() {

        // CORS
        this.app.use( cors() );

        // Parseo y lectura del body
        this.app.use(express.json());

        // Directorio Publico , index de la aplicación
        this.app.use( express.static('public') )

    }

    // Declaracion de rutas del api

    routes() {
        
        this.app.use(this.paths.auth, require('../routes/auth.routes')); // ruta para logearse
        this.app.use(this.paths.usuarios, require('../routes/usuarios.routes')); // ruta del usuario


    }

    // Mostrar el puerto y aviso que el servidor esta levantado
    listen() {
       this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto' , this.port );
        });
    }


}

module.exports = Server;