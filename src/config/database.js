const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';
const connectionOptions = {};

if (process.env.DATABASE_URL) {
    connectionOptions.connectionString = process.env.DATABASE_URL;
    if (isProduction) {
        connectionOptions.ssl = {
            rejectUnauthorized: false
        };
    }
} else {
    connectionOptions.host = process.env.DB_HOST;
    connectionOptions.database = process.env.DB_DATABASE;
    connectionOptions.port = process.env.DB_PORT;
    connectionOptions.user = process.env.DB_USER;
    connectionOptions.password = process.env.DB_PASSWORD;
}

const db = new Pool(connectionOptions);

module.exports = db;