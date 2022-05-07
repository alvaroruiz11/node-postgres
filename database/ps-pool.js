const { Pool } = require('pg');
const config = {
    user:       'postgres',
    password:   'sNUV+834',
    host:       'localhost',
    port:       5432,
    database:   'db_help',
}

const pool = new Pool( config );

module.exports = pool;