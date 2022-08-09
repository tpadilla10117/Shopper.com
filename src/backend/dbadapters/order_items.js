/* File for order_items table db adapters using SQL Queries: */
const { client } = require('../index');

/* ----------------------------------------------------------------------------- */
//THESE ARE THE order_items METHODS: TODO: NEED TO TEST ONCE ROUTES SET UP

/* Retrieve all order_items: */
/* TESTED: COMPLETE / WORKS */
    async function getAllOrderItems() {
        try {
            const { rows: order_items } = await client.query(`
                SELECT * FROM order_items
            `)

            return order_items;
        } catch(error) {
            throw error;
        }
    };

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

    /* async function retrieveProductsInAnOrder(id) {
        try {

            const { rows: products } = await client.query(`
            
                SELECT id, title, description FROM products
                WHERE products.id = $1
            
            `, [ products ]);

            return products;

        } catch(error) {
            throw error;
        }
    } */


    async function getOrderItems(id) {
        try {

            const { rows: order_items } = await client.query(`
                SELECT * from order_items
                WHERE order_items.id=${id}
            `, [id]);

            return order_items;

        } catch(error) {
            throw error;
        }
    }


module.exports = {
    getAllOrderItems,
    createOrderItems,
    getOrderItems,
};
