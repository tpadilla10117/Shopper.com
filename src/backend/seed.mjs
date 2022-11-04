/* Seed.js is where I seed the db with meaningful info via DDL (DATA Definition Language): */

import { client } from "./index.mjs";
import moment from 'moment';

import { createUser, getAllUsers, getUser, getUserById, getUserByUsername } from "./dbadapters/users.mjs";

import { createUserAddressByUser, getUserAddress } from "./dbadapters/user_addresses.mjs";

import { createProducts, getProductById } from "./dbadapters/products.mjs";

import { createSavedProduct, getSavedProducts, getSavedProductsByUserId, deleteSavedProductByProductid } from "./dbadapters/saved_products.mjs";

import { getAllOrderItems } from "./dbadapters/order_items.mjs";

import { createOrder, getOrderById, getOrderItemsByOrdersId, getAllOrdersByAUserId } from "./dbadapters/orders.mjs";

import { getAllProductCategories, createProductCategories } from "./dbadapters/product_category.mjs";

import { createShoppingSession, retrieveShoppingSessionItemById } from "./dbadapters/shopping_sessions.mjs";

import { addItemsToCart } from "./dbadapters/cart_items.mjs";

import { getAllProductReviews, createProductReview, getAProductReviewById } from "./dbadapters/product_reviews.mjs";

/* Database Adapter Testing: */
    export async function testDB() {
        try {
            console.log("Starting to test Database!")

           /*  console.log("Calling getUser...");
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

            
            const userAddress = await getUserAddress(1);
            console.log('My user address: ', userAddress); */

            /* const retrieveAReview = await getAProductReviewById(1);
            console.log('I retrieved a review! :', retrieveAReview); */

            /* const allReviews = await getAllProductReviews();
            console.log('Result of getAllProductReviews! :', allReviews); */

          /*   const sampleSessionRetrieval = await retrieveShoppingSessionItemById(1);
            console.log('Result of sampleSessionRetrieval! :', sampleSessionRetrieval); */

            /* const retrieveAOrder = await getOrderById(1);
            console.log('Here is a specific order by Id: ', retrieveAOrder); */

           /*  const retrieveOrderItemsByOrdersId = await getOrderItemsByOrdersId(1);
            console.log('Here are order_items by the orders_id: ', retrieveOrderItemsByOrdersId); */

/* 
            console.log('Here are all my order Items: ', await getAllOrderItems() );
 */
            console.log('Here are all a users orders: ', await getAllOrdersByAUserId(1) );

            console.log('Here are all a users saved items: ', await getSavedProductsByUserId(1) );

            /* console.log('testing deletess: ', await deleteSavedProductByProductid(1) ); */


            console.log("Finished testing Database!")
        } catch (error) {
            console.log("Error testing Database!")
            throw error;
        }
    }


/* Drop Tables: */
    export async function dropTables() {
        console.log('Dropping all tables...')
        try {
            await client.query(`
                DROP TABLE IF EXISTS product_reviews;
                DROP TABLE IF EXISTS order_items;
                DROP TABLE IF EXISTS orders;
                DROP TABLE IF EXISTS cart_items;
                DROP TABLE IF EXISTS shopping_sessions;
                DROP TABLE IF EXISTS saved_products;
                DROP TABLE IF EXISTS user_addresses;
                DROP TABLE IF EXISTS users;
                DROP TABLE IF EXISTS products;
                DROP TABLE IF EXISTS product_categories;
            `)
        } catch (error) {
            console.log('Error Dropping Tables')
        }
    };

/* Creating Tables in the default Schema: */

    export async function createTables() {
        try {
            console.log('Starting to build Tables...')

            await client.query(`
                CREATE TABLE product_categories(
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    description VARCHAR(500) NOT NULL,
                    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    modified_at TIMESTAMP,
                    deleted_at TIMESTAMP DEFAULT NULL
                );
                CREATE TABLE products(
                    id SERIAL PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    description VARCHAR(500) NOT NULL,
                    productid VARCHAR(255) NOT NULL,
                    image VARCHAR(255) DEFAULT 'https://icon-library.com/images/no-image-available-icon/no-image-available-icon-8.jpg',
                    category_id INTEGER REFERENCES product_categories(id),
                    subcategory VARCHAR(50) NOT NULL,
                    price VARCHAR(255) NOT NULL
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
                CREATE TABLE user_addresses(
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER REFERENCES users(id),
                    address_line1 VARCHAR(100) NOT NULL,
                    address_line2 VARCHAR(100) DEFAULT NULL,
                    city VARCHAR(50) NOT NULL,
                    postal_code VARCHAR(100) NOT NULL,
                    state VARCHAR(50) NOT NULL,
                    country VARCHAR(100) NOT NULL,
                    mobile_number VARCHAR(50) DEFAULT NULL
                );
                CREATE TABLE saved_products(
                    id SERIAL PRIMARY KEY,
                    product_id INTEGER REFERENCES products(id),
                    user_id INTEGER REFERENCES users(id),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    modified_at TIMESTAMP,
                    deleted_at TIMESTAMP
                );
                CREATE TABLE shopping_sessions(
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER REFERENCES users(id),
                    totalcost DECIMAL (6,2),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    modified_at TIMESTAMP,
                    deleted_at TIMESTAMP
                );
                CREATE TABLE cart_items(
                    id SERIAL PRIMARY KEY,
                    session_id INTEGER REFERENCES shopping_sessions(id),
                    user_id INTEGER REFERENCES users(id),
                    product_id INTEGER REFERENCES products(id),
                    quantity INTEGER NOT NULL,
                    totalcost INTEGER NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    modified_at TIMESTAMP,
                    deleted_at TIMESTAMP
                );
                CREATE TABLE orders(
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER REFERENCES users(id),
                    amount_total DECIMAL (15,2),
                    currency VARCHAR(50) NOT NULL,
                    status VARCHAR(255) DEFAULT 'complete',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    modified_at TIMESTAMP,
                    deleted_at TIMESTAMP
                );
                CREATE TABLE order_items(
                    id SERIAL PRIMARY KEY,
                    orders_id INTEGER REFERENCES orders(id),
                    product_id INTEGER REFERENCES products(id),
                    quantity INTEGER /* NOT NULL */,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    modified_at TIMESTAMP,
                    deleted_at TIMESTAMP
                );
                CREATE TABLE product_reviews(
                    id SERIAL PRIMARY KEY,
                    title VARCHAR(100) NOT NULL,
                    description TEXT NOT NULL,
                    rating INTEGER NOT NULL CHECK (1 <= 5),
                    user_id INTEGER REFERENCES users(id),
                    product_id INTEGER REFERENCES products(id),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    modified_at TIMESTAMP,
                    deleted_at TIMESTAMP
                )
                
            `)
            console.log("Finished building tables!")
        } catch (error) {
            console.log("Error building tables:", error);
        }
    }

   export async function seedInitialUsers() {
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
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss')
                }
            ]

            const users = await Promise.all(seedUsers.map(createUser));
            console.log("Created Users: ", users);
        } catch (error) {
            console.log("There was an error creating users!");
            throw error;
        }
    };

   export async function seedUserAddress() {
        console.log('Starting to create user address...');
        try {

        /* Retrieve the user's id to pass into seedAddress obj: */
            const user = await getUser({
                username: 'trin',
                password: 'padilla123'
            });


            const seedAddress = [
                {
                    address_line1: 'One Apple Park Way',
                    address_line2: '',
                    city: 'Cupertino',
                    postal_code: '95014',
                    state: 'CA',
                    country: 'US',
                    mobile_number: '916-222-2210',
                    user_id: user.id
                }
            ];

            const userAddress = await Promise.all(seedAddress.map(createUserAddressByUser));
            console.log("Created a user address: ", userAddress);

        } catch(error) {
            console.error('Error creating user address!');
        }
    }

    export async function seedInitialProductCategories() {
        console.log('Starting to create product categories...');
        try {
            const productCategoriesToCreate = [
                {
                    name: `men's clothing`,
                    description: 'Items for men',
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    name: `women's clothing`,
                    description: 'Items for women',
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    name: `men's accessories`,
                    description: 'Accessories for men',
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    name: `women's accessories`,
                    description: 'Accessories for women',
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    name: `men's jewelry`,
                    description: 'Jewelry for men',
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    name: `women's jewelry`,
                    description: 'Jewelry for women',
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    name: `hats`,
                    description: 'Collection of headwear',
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    name: `shoes`,
                    description: 'Collection of shoes',
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                
            ];

            const productCategories = await Promise.all(productCategoriesToCreate.map(createProductCategories));

            console.log('Product Categories created! : ', productCategories);

        } catch(error) {
            console.error('Error creating product categories!');
        }
    }

    export async function seedInitialProducts() {
        console.log('Starting to create initial products...');
        try {
            const productsToCreate = [
                {
                    id: 1,
                    title:"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                    description:"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                    productid: 93813718290,
                    image:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                    category_id: 3,
                    subcategory: "bags",
                    price: 109.95,
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                    
                },
                {
                    id: 2,
                    title: "Mens Casual Premium Slim Fit T-Shirts",
                    description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
                    productid: 93813718291,
                    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
                    category_id: 1,
                    subcategory: "shirts",
                    price: 22.3,
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    id: 3,
                    title: "Mens Cotton Jacket",
                    description: "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
                    productid: 93813718292,
                    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
                    category_id: 1,
                    subcategory: "jackets",
                    price: 55.99,
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    id: 4,
                    title: "Mens Casual Slim Fit",
                    description: "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
                    productid: 93813718293,
                    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
                    category_id: 1,
                    subcategory: "shirts",
                    price: 15.99,
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    id: 5,
                    title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
                    description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
                    productid: 93813718294,
                    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
                    category_id: 6,
                    price: 695,
                    subcategory: "jewelery",
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    id: 6,
                    title: "Brown Brim",
                    description: "Go out in style.",
                    productid: 93813718295,
                    image: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
                    category_id: 7,
                    price: 25,
                    subcategory: "hats",
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    id: 7,
                    title: "Blue Beanie",
                    description: "A cold weather essential.",
                    productid: 93813718296,
                    image: "https://i.ibb.co/ypkgK0X/blue-beanie.png",
                    category_id: 7,
                    price: 18,
                    subcategory: "hats",
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    id: 8,
                    title: "Green Beanie",
                    description: "A cold weather essential.",
                    productid: 93813718297,
                    image: "https://i.ibb.co/YTjW3vF/green-beanie.png",
                    category_id: 7,
                    price: 18,
                    subcategory: "hats",
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    id: 9,
                    title: "Green Beanie",
                    description: "A cold weather essential.",
                    productid: 93813718298,
                    image: "https://i.ibb.co/bLB646Z/red-beanie.png",
                    category_id: 7,
                    price: 18,
                    subcategory: "hats",
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    id: 10,
                    title: "Blue Snapback",
                    description: "A lightweight and adjustable snapback cap.",
                    productid: 93813718299,
                    image: "https://i.ibb.co/X2VJP2W/blue-snapback.png",
                    category_id: 7,
                    price: 16,
                    subcategory: "hats",
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    id: 11,
                    title: "Wolf Cap",
                    description: "A lightweight and adjustable snapback cap.",
                    productid: 93813718300,
                    image: "https://i.ibb.co/1f2nWMM/wolf-cap.png",
                    category_id: 7,
                    price: 14,
                    subcategory: "hats",
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    id: 12,
                    title: "Adidas NMD",
                    description: "Brand new Adidas for your comfort.",
                    productid: 93813718301,
                    image: "https://i.ibb.co/0s3pdnc/adidas-nmd.png",
                    category_id: 8,
                    price: 80,
                    subcategory: "shoes",
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    id: 13,
                    title: "Adidas NMD",
                    description: "Brand new Adidas for your comfort.",
                    productid: 93813718302,
                    image: "https://i.ibb.co/dJbG1cT/yeezy.png",
                    category_id: 8,
                    price: 70,
                    subcategory: "shoes",
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    id: 14,
                    title: "Black Converse",
                    description: "The classics.  Live like a rockstar",
                    productid: 93813718303,
                    image: "https://i.ibb.co/bPmVXyP/black-converse.png",
                    category_id: 8,
                    price: 60,
                    subcategory: "shoes",
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    id: 15,
                    title: "Nike White Airforce",
                    description: "The b-ball OG that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.",
                    productid: 93813718304,
                    image: "https://i.ibb.co/1RcFPk0/white-nike-high-tops.png",
                    category_id: 8,
                    price: 110,
                    subcategory: "shoes",
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    id: 16,
                    title: "Nike Red High Tops",
                    description: "There is never a wrong time to stand tall. Created for the hardwood but taken to the streets, the High Top gives the '80s b-ball icon the perfect lift.",
                    productid: 93813718305,
                    image: "https://i.ibb.co/QcvzydB/nikes-red.png",
                    category_id: 8,
                    price: 100,
                    subcategory: "shoes",
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    id: 17,
                    title: "Blue Jean Shearling",
                    description: "Comfort first",
                    productid: 93813718306,
                    image: "https://i.ibb.co/XzcwL5s/black-shearling.png",
                    category_id: 1,
                    price: 125,
                    subcategory: "jackets",
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    id: 18,
                    title: "Blue Jean Jacket",
                    description: "Bring back the nineties",
                    productid: 93813718307,
                    image: "https://i.ibb.co/mJS6vz0/blue-jean-jacket.png",
                    category_id: 1,
                    price: 90,
                    subcategory: "jackets",
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    id: 19,
                    title: "Tan Trench",
                    description: "Winter is coming",
                    productid: 93813718308,
                    image: "https://i.ibb.co/M6hHc3F/brown-trench.png",
                    category_id: 2,
                    price: 185,
                    subcategory: "jackets",
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
            ]
            
            const products = await Promise.all(productsToCreate.map(createProducts));
            console.log('Products Created!');
            console.log(products)
        } catch (error) {
            console.error('Error creating Products!')
        }
    };

    export async function seedSavedProducts() {
        console.log('Creating Saved Products...');

        try {

            const savedProduct = [
                {
                    product_id: 3,
                    user_id: 1,
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    product_id: 1,
                    user_id: 1,
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    product_id: 4,
                    user_id: 1,
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    product_id: 2,
                    user_id: 1,
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
        
            ];

            const products = await Promise.all(savedProduct.map(createSavedProduct));

            console.log('Saved Product created! : ', products)

        } catch(error) {
            console.error('Error creating saved products...');
            throw error;
        }
    };

    export async function seedInitialOrders() {
        console.log('Creating Orders...');

        try {
            const seedOrders = [
            
                {
                    user_id: 1,
                    amount_total: 109.95,
                    currency: 'usd',
                    status: 'completed',
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                    /* These below come from redux: */
                    order_items: [
                        {
                            orders_id: null,
                            product_id: 1,
                            quantity: 1,
                        },
                        {
                            orders_id: null,
                            product_id: 2,
                            quantity: 1,
                        },
                    ]
                    
                },
                {
                    user_id: 1,
                    amount_total: 78.29,
                    currency: 'usd',
                    status: 'completed',
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                    
                    order_items: [
                        {
                            orders_id: null,
                            product_id: 2,
                            quantity: 1,
                        },
                        {
                            orders_id: null,
                            product_id: 3,
                            quantity: 1,
                        },
                    ]
                    
                },
                {
                    user_id: 1,
                    amount_total: 156.58,
                    currency: 'usd',
                    status: 'completed',
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                    
                    order_items: [
                        {
                            orders_id: null,
                            product_id: 2,
                            quantity: 2,
                        },
                        {
                            orders_id: null,
                            product_id: 3,
                            quantity: 2,
                        },
                       
                    ]
                    
                },
               
            ]

            const orders = await Promise.all(seedOrders.map(createOrder));
            console.log('Orders Created! : ', orders)

        } catch(error) {
            console.error('Error seeding orders!')
            throw error;
        }
    };


    export async function seedProductReviews() {
        console.log('Creating reviews...');

        try {

            const user = await getUser({
                username: 'trin',
                password: 'padilla123'
            });

            const product = await getProductById(3);

            const productReviewData = [
                {
                    title: 'Nice Shirt!',
                    description: 'This jacket perfectly fits my style.  It is snug, feels comfortable, and has a great overall texture!  Only giving it 4 stars because it is a bit pricey.',
                    rating: 4,
                    user_id: user.id,
                    product_id: product.id,
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                }
            ];

            const reviews = await Promise.all(productReviewData.map(createProductReview));

            console.log('Reviews were created! :', reviews);

        } catch(error) {
            console.error('Error creating reviews...');
            throw error;
        }
    };

    export async function seedShoppingSession() {

        try {
            const user = await getUser({
                username: 'trin',
                password: 'padilla123'
            });

            const sessionData = [
                {
                    user_id: user.id,
                    totalcost: 125.94,
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                }
            ];

            const createdSession = await Promise.all(sessionData.map(createShoppingSession));

            console.log('Created a shopping Session! :', createdSession);

        } catch(error) {
            console.error('Error creating a shopping session!');
            throw error;
        }
    }

/* TODO: THIS WILL BE FOR INDIVIDUAL CART ITEMS */
   export async function seedInitialCartItem() {

        const sampleProduct = [1,3];

        try {
            const user = await getUser({
                username: 'trin',
                password: 'padilla123'
            });

            const cartData = [
                {
                    session_id: 1,
                    user_id: user.id,
                    product_id: sampleProduct[0],
                    quantity: 1,
                    totalcost: 109,
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    session_id: 1,
                    user_id: user.id,
                    product_id: sampleProduct[1],
                    quantity: 1,
                    totalcost: 200,
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                }
            ];

            const createdCartItem = await Promise.all(cartData.map(addItemsToCart));

            console.log('Created a cart Item! : ', createdCartItem);

        } catch(error) {
            console.error('Error building a cart!');
            throw error;
        }
    };


    export async function buildTables() {
        try {
            /* client.connect(); */
            await dropTables();
            await createTables();
        } catch (error) {
            throw error
        }
    }

   export async function rebuildDB() {
        try {
        /* TODO: When running Jest, comment this client out: */
            client.connect();
            await buildTables()
            .then(seedInitialUsers)
            .then(seedUserAddress)
            .then(seedInitialProductCategories)
            .then(seedInitialProducts)
            .then(seedSavedProducts)
            .then(seedShoppingSession)
            .then(seedInitialCartItem)
            .then(seedInitialOrders)
            .then(seedProductReviews)
            .then(testDB)
            
        } catch (error) {
            console.error("Error during rebuildDB");
            throw error;
        }
    };

    rebuildDB()
        .catch(console.error)
        .finally( () => client.end() );
        
        /* npm run test:watch:db */
