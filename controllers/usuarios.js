const { response } = require('express');
const bcryptjs = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const pool = require('../database/ps-pool');



const obtenerUsuarios = async( req, res ) => {

    // const usuarios = await pool.query('SELECT * FROM usuarios');

    const [ total, usuarios ] = await Promise.all([
        pool.query('SELECT COUNT(*) FROM usuarios WHERE estado = true'),
        pool.query('SELECT * FROM usuarios WHERE estado = true'),
    ]) 
    
    res.json({
        total: total.rows[0].count,
        usuarios: usuarios.rows
    })


}


const crearUsuario = async( req, res = response ) => {

    try {
        
        const { nombre, correo, password, rol } = req.body;
        const uid = uuidv4();
    
        const salt = bcryptjs.genSaltSync();
        const passwordEn = bcryptjs.hashSync( password, salt );

        const usuario = await pool.query('insert into usuarios (uid, nombre, correo, password, rol) values( $1, $2, $3, $4, $5)', [ uid,nombre, correo, passwordEn, rol]);

        res.json({
            usuario:usuario.rows
        })

        
    } catch (error) {
        console.log(error);
    }

  
}

const actualizarUsuario = async ( req, res ) => {

    const { id } = req.params;

    const { uid, estado, correo, password, ...resto } = req.body;

    if( password ){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }
    
    
    

    const usuario = await pool.query('UPDATE usuarios SET nombre = $1, password = $2, rol = $3 WHERE uid = $4', [ resto.nombre, resto.password, resto.rol, id])
    
    res.json({
        usuario: usuario.rowCount
    })
}

const borrarUsuario = async ( req, res ) => {

    const { id } = req.params;

    const usuarioDelete = await pool.query('UPDATE usuarios SET estado = $1 WHERE uid = $2', [ false, id ]);
    
    res.json({
        usuario: usuarioDelete.rowCount
    })
}



module.exports = {
    actualizarUsuario,
    borrarUsuario,
    crearUsuario,
    obtenerUsuarios
}