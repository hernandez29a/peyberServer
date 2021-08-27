const express = require('express');
const cors = require('cors');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        /*Arreglo en donde se definen las rutas para ser colocadas
        en la funcion de routes
        */
        
        this.paths = {
            //auth:       '/api/auth',
            //buscar:     '/api/buscar',
            //categorias: '/api/categorias',
            //productos:  '/api/productos',
            usuarios:     '/api/usuarios',
            //medidas:     'api/memdidas,'
            //uploads:    '/api/uploads',
        }

        // Middlewares
        this.middlewares();

        //Rutas de la aplicación

        this.routes();

    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Parseo y lectura del body
        this.app.use(express.json());

        // Directorio Publico , index de la aplicación
        this.app.use( express.static('public') )

    }

    routes() {
        
        // ruta del usuario
        this.app.use(this.paths.usuarios, require('../routes/usuarios.routes'));


    }

    listen() {
       this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto' , this.port );
        });
    }


}

module.exports = Server;