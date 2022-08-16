/* File for orders table db adapters using SQL Queries: */

const { client } = require('../index');
const {
    createOrderItems,
} = require('./order_items');

/* ----------------------------------------------------------------------------- */
//THESE ARE THE ORDER METHODS:

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

/* To search for orders by a user, */
/* & Retrieve the order_items on each order */
    async function getAllOrdersByAUserId(user_id) {
        try {
            const { rows: orders } = await client.query(`
                SELECT * FROM orders
                WHERE orders.user_id = $1
            
            `, [user_id] );

            const allOrders = await Promise.all(orders.map(
                x => getOrderById(x.id)
            ))
        
            return allOrders;
            
            
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
        order_items
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

    /*Populate order with its order_items: 
        /* Mutate the orders_id to be the dynamic value from each orders.id: */

            let mutateOrdersId = await Promise.all(order_items).then((values) => {
                values.forEach( element => element.orders_id = order.id );
                return (values)
            });

        /* Create order_items with the new dataset: */
            order.order_items = await Promise.all(mutateOrdersId.map(createOrderItems));

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