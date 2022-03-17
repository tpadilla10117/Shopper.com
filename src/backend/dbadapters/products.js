/* File for products table db adapters: */
    const { client } = require('../index');

/* ----------------------------------------------------------------------------- */
//THESE ARE THE PRODUCT METHODS:

    async function getAllProducts() {
        try {
            const { rows } = await client.query(`
                SELECT * FROM products
            `)
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async function createProducts(product) {
        const {title, description, price, category, image} = product;

        try {
            const { rows: [product] } = await client.query(`
            INSERT INTO products(title, description, price, category, image)
            VALUES($1,$2,$3,$4,$5)
            RETURNING *
        `, [title, description, price, category, image]);

        return product;

        } catch (error) {
            throw error;
        }
    }

  
    module.exports = {
        getAllProducts,
        createProducts
    }