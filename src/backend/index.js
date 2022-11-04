/* This is where connection to PostgreSQL client occurs: */

require('dotenv').config();

//1) Connect client to the PostgreSQL db:
const { Client } = require('pg');

//2) Give a name to the db, and a location (check .env file):

const DB_URL = `postgres://localhost:5432/${process.env.REACT_APP_DB_NAME}`;
const client = new Client(DB_URL);

// Exports:
module.exports = { client };
