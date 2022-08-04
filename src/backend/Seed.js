/* Seed.js is where I seed the db with meaningful info via DDL (DATA Definition Language): */

    const { client } = require('./index.js');

    const {
        createUser, 
        getAllUsers,
        getUser,
        getUserById,
        getUserByUsername
    } = require('./dbadapters/users');

    const {
        createProducts,
    } = require('./dbadapters/products');

    const {
        createOrder,
    } = require('./dbadapters/orders');

    const {
        getAllProductCategories,
        createProductCategories
    } = require('./dbadapters/product_category');

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
            DROP TABLE IF EXISTS product_category;
            `)
        } catch (error) {
            console.log('Error Dropping Tables')
        }
    };

/* Creating Tables in the default Schema: */

    async function createTables() {
        try {
            console.log('Starting to build Tables...')

            await client.query(`
                CREATE TABLE product_category(
                    id SERIAL PRIMARY KEY,
                    category_name VARCHAR(255) NOT NULL,
                    category_description VARCHAR(500) NOT NULL,
                    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
                CREATE TABLE products(
                    id SERIAL PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    description VARCHAR(500) NOT NULL,
                    price VARCHAR(255) NOT NULL,
                    category VARCHAR(255) NOT NULL,
                    subcategory VARCHAR(255) NOT NULL,
                    productid VARCHAR(255) NOT NULL,
                    image VARCHAR(255) DEFAULT 'https://icon-library.com/images/no-image-available-icon/no-image-available-icon-8.jpg',
                    "categoryId" INTEGER REFERENCES product_category(id)
                );
                CREATE TABLE users(
                    id SERIAL PRIMARY KEY,
                    firstname VARCHAR(50) NOT NULL,
                    lastname VARCHAR (50) NOT NULL,
                    email VARCHAR (50) UNIQUE NOT NULL,
                    imageURL VARCHAR (255) DEFAULT NULL,
                    username VARCHAR (50) UNIQUE NOT NULL,
                    password VARCHAR (255) UNIQUE NOT NULL,
                    isAdmin BOOLEAN DEFAULT false,
                    active boolean DEFAULT true,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    modified_at TIMESTAMP
                );
                CREATE TABLE orders(
                    id SERIAL PRIMARY KEY,
                    status VARCHAR(255) DEFAULT 'complete',
                    "userId" INTEGER REFERENCES users(id), 
                    "orderDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    shippingStreet VARCHAR(100) NOT NULL,
                    shippingStreet2 VARCHAR(200) DEFAULT NULL,
                    shippingZip VARCHAR(100) NOT NULL,
                    shippingCity VARCHAR(50) NOT NULL,
                    shippingCountry VARCHAR(50) NOT NULL,
                    shippingState VARCHAR(50) NOT NULL,
                    currency VARCHAR(20) NOT NULL,
                    amountTotal INTEGER NOT NULL
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
            console.log("Error building tables:", error);
        }
    }

    async function seedInitialUsers() {
        try {
            const seedUsers = [
                {
                    firstname:'trin', 
                    lastname:'padilla', 
                    email:'trinp@example.com', 
                    username:'trin', 
                    password:'padilla123', 
                    isAdmin: true, 
                    active: true,
                    created_at: require('moment')().format('YYYY-MM-DD HH:mm:ss')
                }
            ]

            const users = await Promise.all(seedUsers.map(createUser));
            console.log("Created Users: ", users);
        } catch (error) {
            console.log("There was an error creating users!");
            throw error;
        }
    }

    async function seedInitialProductCategories() {
        console.log('Starting to create product categories...');
        try {
            const productCategoriesToCreate = [
                {
                    id: 1,
                    category_name: `men's clothing`,
                    category_description: 'Items for men',
                    created_at: require('moment')().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    id: 2,
                    category_name: `women's clothing`,
                    category_description: 'Items for women',
                    created_at: require('moment')().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    id: 3,
                    category_name: `accessories`,
                    category_description: 'Accessories for men',
                    created_at: require('moment')().format('YYYY-MM-DD HH:mm:ss'),
                },
            ];

            const productCategories = await Promise.all(productCategoriesToCreate.map(createProductCategories));

            console.log('Product Categories created! : ', productCategories);

        } catch(error) {
            console.error('Error creating product categories!');
        }
    }

    async function seedInitialProducts() {
        console.log('Starting to create initial products...');
        try {
            const productsToCreate = [
                {
                    id: 1,
                    title:"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                    description:"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                    price:109.95,
                    category:"men's clothing",
                    subcategory: "bags",
                    productid: 93813718290,
                    image:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                },
                {
                    id: 2,
                    title: "Mens Casual Premium Slim Fit T-Shirts",
                    description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
                    price: 22.3,
                    category: "men's clothing",
                    subcategory: "shirts",
                    productid: 93813718291,
                    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
                },
                {
                    id: 3,
                    title: "Mens Cotton Jacket",
                    description: "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
                    price: 55.99,
                    category: "men's clothing",
                    subcategory: "jackets",
                    productid: 93813718292,
                    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
                },
                {
                    id: 4,
                    title: "Mens Casual Slim Fit",
                    description: "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
                    price: 15.99,
                    category: "men's clothing",
                    subcategory: "shirts",
                    productid: 93813718293,
                    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"
                },
                {
                    id: 5,
                    title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
                    description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
                    price: 695,
                    category: "accessories",
                    subcategory: "jewelery",
                    productid: 93813718294,
                    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
                }
            ]
            
            const products = await Promise.all(productsToCreate.map(createProducts));
            console.log('Products Created!');
            console.log(products)
        } catch (error) {
            console.error('Error creating Products!')
        }
    };

    async function seedInitialOrders() {
        console.log('Creating Orders...');

        try {
            const seedOrders = [
                {
                    id: 1,
                    userId: 1,
                    orderDate: '2022-07-28 18:10:25-07',
                    shippingStreet: 'One Apple Park Way',
                    shippingZip: '95014',
                    shippingCity: 'Cupertino',
                    shippingCountry: 'US',
                    shippingState: 'CA',
                    currency: 'usd',
                    amountTotal: 200,
                }
            ]

            const orders = await Promise.all(seedOrders.map(createOrder));
            console.log('Orders Created! : ', orders)

        } catch(error) {
            console.error('Error seeding orders!')
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
            .then (seedInitialProductCategories)
            .then (seedInitialProducts)
            .then (seedInitialOrders)
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
            seedInitialProductCategories,
            seedInitialProducts,
            seedInitialOrders,
            testDB,
        }
        
        /* npm run test:watch:db */