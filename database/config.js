const pool = require('./ps-pool');
const dbConection = async () => {

    try {
        
        const conection = pool;
    
        await conection.connect();

        console.log('Base de datos conectado');
        
    } catch (error) {
        console.error(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }



}


module.exports = {
    dbConection
}