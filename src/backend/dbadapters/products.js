/* File for products table db adapters using SQL Queries: */
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
        const {id, title, description, price, category, subcategory, productid, image} = product;

        try {
            const { rows: [product] } = await client.query(`
            INSERT INTO products(id, title, description, price, category, subcategory, productid, image)
            VALUES($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING *
        `, [id, title, description, price, category, subcategory, productid, image]);

        return product;

        } catch (error) {
            throw error;
        }
    }

    async function getProductById(productid) {
        try {
            const { rows: [product] } = await client.query(`
            SELECT * FROM products WHERE productid=$1
            
            `, [productid]);

            return product;
        } catch (error) {
            throw error;
        }
    }

  
    module.exports = {
        getAllProducts,
        createProducts,
        getProductById,
    }