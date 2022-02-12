/* Seed.js is where I seed the db with meaningful info: */

    const { client } = require('./index.js');
    const {
        createUser, 
        getAllUsers,
        getUser,
        getUserById,
        getUserByUsername
    } = require('./dbadapters/users');

/* Database Adapter Testing: */
    async function testDB() {
        try {
            console.log("Starting to test Database!")

            console.log("Calling getUser...");
            const user = await getUser({
                username: 'trin',
                password: 'padilla123'
            });
            console.log("The result of calling getUser: ", user);

            console.log("Calling getAllUsers");
            const users = await getAllUsers();
            console.log("The result of invoking getAllUsers:", users);

            console.log("Calling getUserById with 1");
            const trin = await getUserById(1);
            console.log("Result of getUserById:", trin);

            console.log("Calling getUserByUsername");
            const username = await getUserByUsername("trin");
            console.log("The result of calling getUserByUsername:", username);

            console.log("Finished testing Database!")
        } catch (error) {
            console.log("Error testing Database!")
            throw error;
        }
    }


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
                    firstname VARCHAR(255) NOT NULL,
                    lastname VARCHAR (255) NOT NULL,
                    email VARCHAR (255) UNIQUE NOT NULL,
                    imageURL VARCHAR (255) DEFAULT NULL,
                    username VARCHAR (255) UNIQUE NOT NULL,
                    password VARCHAR (255) UNIQUE NOT NULL,
                    isAdmin BOOLEAN DEFAULT false,
                    active boolean DEFAULT true,
                    location VARCHAR(255) NOT NULL
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

    async function seedInitialUsers() {
        try {
            const seedUsers = [
                {firstname:'trin', lastname:'padilla', email:'trinp@example.com', username:'trin', password:'padilla123', isAdmin: true,
                id: 1, location: 'Tatooine',
                }
            ]

            const users = await Promise.all(seedUsers.map(createUser));
            console.log("Created Users: ", users);
        } catch (error) {
            console.log("There was an error creating users!");
            throw error;
        }
    }


    async function buildTables() {
        try {
            /* client.connect(); */
            await dropTables();
            await createTables();
        } catch (error) {
            throw error
        }
    }

    async function rebuildDB() {
        try {
        /* TODO: When running Jest, comment this client out: */
            client.connect();
            await buildTables()
            .then (seedInitialUsers)
            .then (testDB)
            
        } catch (error) {
            console.error("Error during rebuildDB");
            throw error;
        }
    };

    rebuildDB()
        .catch(console.error)
        .finally( () => client.end() );


        module.exports = {
            rebuildDB,
            dropTables,
            createTables,
            seedInitialUsers,
            testDB,
        }
        
        /* npm run test:watch:db */