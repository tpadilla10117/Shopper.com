/* File for orders table db adapters using SQL Queries: */
const { client } = require('../index');

/* ----------------------------------------------------------------------------- */
//THESE ARE THE ORDER METHODS:

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

module.exports = {
   getAllOrders,
}