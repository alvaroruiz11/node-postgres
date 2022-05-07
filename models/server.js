const express = require('express');
const { dbConection } = require('../database/config');



class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.path = {
            usuarios: '/api/usuarios'
        }
        this.middleware();
        this.router();
        this.conectarDB();
    }

    async conectarDB(){
        await dbConection();
    }

    middleware(){
        this.app.use( express.static('public') );
        this.app.use( express.json() );
    }

    router(){
        this.app.use( this.path.usuarios, require('../routes/usuarios' ));
    }

    lister(){
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en el puerto ${ this.port }`);
        });
    }


}


module.exports = Server;


