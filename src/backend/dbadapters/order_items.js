/* File for order_items table db adapters using SQL Queries: */
const { client } = require('../index');

/* ----------------------------------------------------------------------------- */
//THESE ARE THE order_items METHODS: TODO: NEED TO TEST ONCE ROUTES SET UP

/* Items retrieved (via webhook) from completed Stripe Checkout Session: */
    async function createOrderItems(order_items) {

        const {
            orders_id,
            product_id,
            quantity,
            
        } = order_items;

        try {
            const { rows: [ items ] } = await client.query(`
                INSERT INTO order_items(orders_id, product_id, quantity)
                VALUES($1, $2, $3)
                RETURNING *
            `, [ orders_id, product_id, quantity]);

            return items;

        } catch(error) {
            throw error;
        }
    };

/* TODO: NEED TO RETRIEVE PRODUCT DATA: */


module.exports = {
    createOrderItems,
};
