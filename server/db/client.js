import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;
const DB_URL = `postgres://localhost:5432/${process.env.REACT_APP_DB_NAME}`;

export const client = new Client(DB_URL);
