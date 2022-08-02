/* File for product_category table db adapters using SQL Queries (DQL, Data Query Langauge): */
const { client } = require('../index');

/* ----------------------------------------------------------------------------- */
//THESE ARE THE product_category METHODS:

    async function getAllProductCategories() {
        try {
            const { rows } = await client.query(`
                SELECT * FROM product_category
            `)
            return rows;
        } catch (error) {
            throw error;
        }
    };

    async function createProductCategories(product_category) {

        const {
            id,
            category_name,
            category_description,
            created_at
        } = product_category;

        try {
            const { rows: [product_category] } = await client.query(`
                INSERT INTO product_category(id, category_name, category_description, "created_at")
                VALUES($1, $2, $3, $4)
                RETURNING *
            `, [id, category_name, category_description, created_at]);

            return product_category;

        } catch  (error) {
            throw error;
        }
    };


    module.exports = {
        getAllProductCategories,
        createProductCategories
    };