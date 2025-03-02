const { Pool } = require('pg')
require('dotenv').config()


const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "admin",
    port: "5433",
    database: "Persona"
})

module.exports = {
    query: (sql, params) => pool.query(sql, params)
};


// const { Pool } = require('pg')
// const dotenv = require('dotenv')


// dotenv.config();

// const pool = new Pool({     
//     host: "localhost",
//     user: "postgres",
//     password: "admin",
//     port: "5433",
//     database: "Users"
// })


// module.exports = {
//     query: (sql, params) => pool.query(sql, params)
// };
