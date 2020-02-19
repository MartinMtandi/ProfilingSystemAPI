const { createPool } = require('mysql');

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: process.env.CONNECTION_LIMIT,
    debug: true
});

module.exports = pool; //commonJS