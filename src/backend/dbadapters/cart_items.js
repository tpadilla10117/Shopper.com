/* File for user_carts table db adapters using SQL Queries: */
/* cart_items holds individual products and works with shopping_sessions */

const { client } = require('../index');

/* ----------------------------------------------------------------------------- */
//THESE ARE THE cart_items METHODS:


    async function addItemsToCart(items) {
        const {
            session_id,
            user_id,
            product_id,
            quantity,
            totalcost,
            created_at
        } = items

        try {
            const { rows: [ items ] } = await client.query(`
                INSERT INTO cart_items(session_id, user_id, product_id, quantity, totalcost, created_at)
                VALUES($1, $2, $3, $4, $5, $6)
                RETURNING *
            `, [session_id, user_id, product_id, quantity, totalcost, created_at]);

            return items;
        } catch(error) {
            throw error;
        }
    };


module.exports = {
    addItemsToCart,
};