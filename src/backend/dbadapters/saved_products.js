/* File for saved_products table db adapters using SQL Queries: */

const { client } = require('../index');

/* ----------------------------------------------------------------------------- */
//THESE ARE THE saved_prodcts METHODS:

    async function createSavedProduct(saved_product) {
        const {
            product_id,
            user_id,
            created_at
        } = saved_product;

        try {
            const { rows: [ saved_product ] } = await client.query(`
                INSERT INTO saved_products(product_id, user_id, created_at)
                VALUES($1,$2,$3)
                RETURNING *
            `, [product_id, user_id, created_at]);

            return saved_product;

        } catch (error) {
            throw error;
        }
    };

    async function getSavedProducts() {
        try {
            const { rows } = await client.query(`
                SELECT * FROM saved_products
            `)

            return rows;
        } catch(error) {
            throw error;
        }
    };

    async function getSavedProductsByUserId(user_id) {
        try {
            const { rows: saved_products } = await client.query(`
                SELECT * FROM saved_products
                WHERE saved_products.user_id = $1
            `, [user_id] );

            return saved_products;
            
        } catch(error) {
            throw error;
        }
    };


module.exports = {
    createSavedProduct,
    getSavedProducts,
    getSavedProductsByUserId,
};