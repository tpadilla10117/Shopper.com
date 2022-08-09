/* File for orders table db adapters using SQL Queries: */
const { client } = require('../index');
const {
    createOrderItems
} = require('./order_items');

/* ----------------------------------------------------------------------------- */
//THESE ARE THE ORDER METHODS: TODO: NEED TO TEST ONCE ROUTES SET UP

/* To search for ALL orders: */
/* TESTED: COMPLETE / WORKS */
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

/* To search for orders by a user: */
    async function getAllOrdersByAUserId(user_id) {
        try {
            const { rows: orders } = await client.query(`
                SELECT * FROM orders
                WHERE orders.user_id = $1
            
            `, [user_id] );


            const { rows: order_items } = await client.query(`
                SELECT order_items.id, orders_id, product_id, quantity FROM order_items
                JOIN orders ON order_items.orders_id = orders.id
                WHERE orders.id = $1
            `, [user_id])

           /*  orders.order_items = await Promise.all(orders.map(getOrderItemsByOrdersId(user_id))); */

            return orders;
        } catch (error) {
            throw error;
        }
    }

/* To search an order by id: */
/* TESTED: COMPLETE / WORKS */

    async function getOrderById(id) {

        try {
            const { rows: [ order ] } = await client.query(`
                SELECT * FROM orders
                WHERE id = $1
            `, [id])

            /* TODO: Have to retrieve the order_items with a join (these are transient and dont alter the tables) */

            order.order_items = await getOrderItemsByOrdersId(id)
            
            return order;
        } catch(error) {
            throw error;
        }
    };

/* To get order_items by an orders_id: */
/* TESTED: COMPLETE / WORKS */
    async function getOrderItemsByOrdersId(order_id) {
        try {
            const { rows: items } = await client.query(`
                SELECT * FROM order_items
                WHERE orders_id = $1;
            `, [order_id])

            return items;

        } catch(error) {
            throw error;
        }
    };

/* To create Orders: */
    async function createOrder( {
        user_id,
        amount_total,
        currency,
        status,
        created_at,
        product_id,
        quantity,
        } ) 
    {
        try {
            const { rows: [ order ] } = await client.query(`
                INSERT INTO orders
                (user_id, amount_total, currency, status, created_at)
                VALUES($1, $2, $3, $4, $5)
                RETURNING *
            `, [
                user_id,
                amount_total,
                currency,
                status,
                created_at 
            ])

    /*2) Populate order with its order_items: 
    
            - order_items will be a table with rows that correspond to one product each
            - TODO: This data is the part of the INPUT from the fullfill order function in the webhook
    */
        

            let orderItemsData = [ 
                {
                    orders_id: order.id,
                    product_id: product_id, 
                    quantity: quantity,
                },
            ];

            order.order_items = await Promise.all(orderItemsData.map(createOrderItems));

            return order;

        } catch(error) {
            throw error;
        }
    };

module.exports = {
   getAllOrders,
   getOrderById,
   createOrder,
   getOrderItemsByOrdersId,
   getAllOrdersByAUserId
}