/* Seed.js is where I seed the db with meaningful info: */

    import { client } from './PostgreSQLClient';

/* Drop Tables: */
    async function dropTables() {
        console.log('Dropping all tables...')
        try {
            await client.query(`
            DROP TABLE IF EXISTS order_products;
            DROP TABLE IF EXISTS orders;
            DROP TABLE IF EXISTS users;
            DROP TABLE IF EXISTS products;
            `)
        } catch (error) {
            console.log('Error Dropping Tables')
        }
    };

/* Creating Tables: */

    async function createTables() {
        try {
            console.log('Starting to build Tables...')

            await client.query(`
                CREATE TABLE products(
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    description VARCHAR(255) NOT NULL,
                    price VARCHAR(255) NOT NULL,
                    category VARCHAR(255) NOT NULL
                );
                CREATE TABLE users(
                    id SERIAL PRIMARY KEY,
                    firstName VARCHAR(255) NOT NULL,
                    lastName VARCHAR (255) NOT NULL,
                    email VARCHAR (255) UNIQUE NOT NULL,
                    imageURL VARCHAR (255) DEFAULT NULL,
                    username VARCHAR (255) UNIQUE NOT NULL,
                    password VARCHAR (255) UNIQUE NOT NULL,
                    isAdmin BOOLEAN DEFAULT false
                );
                CREATE TABLE orders(
                    id SERIAL PRIMARY KEY,
                    status VARCHAR(255) DEFAULT 'created',
                    "userId" INTEGER REFERENCES users(id),
                    "datePlaced" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
                CREATE TABLE order_products(
                    id SERIAL PRIMARY KEY,
                    "productId" INTEGER REFERENCES products(id),
                    "orderId" INTEGER REFERENCES orders(id),
                    price INTEGER NOT NULL,
                    quantity INTEGER NOT NULL DEFAULT (0)
                );
                
            
            `)
            console.log("Finished building tables!")
        } catch (error) {
            console.log("Error building tables", error);
        }
    }


    async function buildTables() {
        try {
            client.connect();
            await dropTables();
            await createTables();
        } catch (error) {
            throw error
        }
    }

    async function rebuildDB() {
        try {
            client.connect();
            buildTables();
            
        } catch (error) {
            console.error("Error during rebuildDB");
            throw error;
        }
    };

    rebuildDB()
        .catch(console.error)
        .finally( () => client.end() );
