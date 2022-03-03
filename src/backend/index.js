/* This is where connection to PostgreSQL client occurs: */

    require('dotenv').config();

    //1) Connect client to the PostgreSQL db:
    const { Client } = require('pg');

    //2) Give a name to the db, and a location:
    const DB_NAME = 'localhost:5432/e-commerce_nodejs_template';
    const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
    const client = new Client(DB_URL);


    // Exports:
    module.exports = {client};