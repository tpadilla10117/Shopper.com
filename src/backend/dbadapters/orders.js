/* File for orders table db adapters using SQL Queries: */
const { client } = require('../index');

/* ----------------------------------------------------------------------------- */
//THESE ARE THE ORDER METHODS: TODO: NEED TO TEST ONCE ROUTES SET UP

async function getAllOrders() {
    try {
        const { rows } = await client.query(`
            SELECT * FROM orders
        `)
        return rows;

    } catch(error) {
        throw error;
    }
};

async function getOrderById(id) {

    try {
        const { rows: [ order ] } = await client.query(`
            SELECT * FROM orders
            WHERE id = #1
        `, [id])
        return order;
    } catch(error) {
        throw error;
    }
};

async function createOrder( {
    id, 
    status, 
    userId, 
    orderDate, 
    shippingStreet, 
    shippingStreet2, 
    shippingZip, 
    shippingCity, 
    shippingCountry, 
    shippingState, 
    currency, 
    amountTotal
    } ) 
{
    try {
        const { rows: [ order ] } = await client.query(`
            INSERT INTO orders
            (id, status, "userId", "orderDate", shippingStreet, shippingStreet2, shippingZip, shippingCity, shippingCountry, shippingState, currency, amountTotal)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING *
        `, [
            id, 
            status, 
            userId, 
            orderDate, 
            shippingStreet, 
            shippingStreet2, 
            shippingZip, 
            shippingCity, 
            shippingCountry, 
            shippingState, 
            currency, 
            amountTotal
        ])

        return order;

    } catch(error) {
        throw error;
    }
};

module.exports = {
   getAllOrders,
   getOrderById,
   createOrder
}