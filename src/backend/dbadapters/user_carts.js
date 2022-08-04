/* File for user_carts table db adapters using SQL Queries: */
/* user_carts holds individual products and works with shopping_sessions */
const { client } = require('../index');

/* ----------------------------------------------------------------------------- */
//THESE ARE THE user_carts METHODS:


    async function addItemsToCart(userCart) {
        const {
            user_id,
            product_id,
            quantity,
            totalcost,
            created_at
        } = userCart

        try {
            const { rows: [ userCart ] } = await client.query(`
                INSERT INTO user_carts(user_id, product_id, quantity, totalcost, created_at)
                VALUES($1, $2, $3, $4, $5)
                RETURNIN *
            `, [user_id, product_id, quantity, totalcost, created_at]);

            return userCart;
        } catch(error) {
            throw error;
        }
    };


module.exports = {
    addItemsToCart,
};