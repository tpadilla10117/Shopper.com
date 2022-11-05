/* This is where connection to PostgreSQL client occurs: */
    import dotenv from "dotenv";

//1) Connect client to the PostgreSQL db:
    import pg from 'pg';
    const { Client } = pg;

//2) Give a name to the db, and a location (check .env file): 
    dotenv.config();
    const DB_URL = `postgres://${process.env.REACT_APP_DB_NAME}`;
    export const client = new Client(DB_URL);