/* Routing for orders: */

    const express = require('express');
    const ordersRouter = express.Router();

/* Import DB methods: */
    const {
        getAllOrders,
        getOrderById
    } = require('../../backend/dbadapters/orders');

/* ------------------------------------------------------------ */
/* THIS IS THE GET/orders ROUTER */

    ordersRouter.get('/', async (req, res, next) => {
        try { 
            const orders = await getAllOrders();
            res.send(orders);

            return orders;
        } catch(error) {
            next(error)
        }
    });


    module.exports = ordersRouter;