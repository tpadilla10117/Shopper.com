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
        const {title, description, productid, image, category_id, subcategory, price} = product;

        try {
            const { rows: [product] } = await client.query(`
            INSERT INTO products(title, description, productid, image, category_id, subcategory, price)
            VALUES($1,$2,$3,$4,$5,$6,$7)
            RETURNING *
        `, [title, description, productid, image, category_id, subcategory, price]);

        return product;

        } catch (error) {
            throw error;
        }
    }

    async function getProductById(id) {
        try {
            const { rows: [product] } = await client.query(`
            SELECT * FROM products WHERE id=$1
            
            `, [id]);

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