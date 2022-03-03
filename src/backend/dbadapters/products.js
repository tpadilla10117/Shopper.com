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

    module.exports = {
        getAllProducts
    }