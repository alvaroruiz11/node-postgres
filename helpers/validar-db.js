const pool = require('../database/ps-pool');


const existeUsuario = async ( id = '' ) => {

    const existeUsuarioId = await pool.query('SELECT * FROM usuarios WHERE uid = $1', [ id ]);

    if( existeUsuarioId.rows.length === 0 ) {
        throw new Error(`El  id ${ id } not existe`);
    }

}

const emailExiste = async ( email = '' ) => {

    const existeEmail = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [ email ]);

    if( existeEmail.rows.length > 0 ) {
        throw new Error(`El email ${ email }, ya esta registrado`);
    }


}

const esRoleValido = async ( rol = '' ) => {

    const roleExiste = await pool.query('SELECT * FROM roles WHERE rol = $1', [ rol ]);

    if( roleExiste.rows.length == 0 ) {
        throw new Error(`El rol ${ rol } no esta registrado en la DB`);
    }

}



module.exports = {
    existeUsuario,
    emailExiste,
    esRoleValido
}

