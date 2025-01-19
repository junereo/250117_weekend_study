require('dotenv').config();

const config = {
    db :{
        development:{
            port : process.env.DB_PORT,
            host : process.env.DB_HOST,
            user : process.env.DB_USERNAME,
            pass : process.env.DB_PASSWORD,
            database : process.env.DB_DATABASE,
            dialect : 'mysql'
        }
    }
}

module.exports = config;