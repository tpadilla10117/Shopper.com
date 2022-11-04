/* Routing for orders: */

    import express from "express";
    import {
        getAllOrders,
        /* getOrderById, */
        getAllOrdersByAUserId,
    } from "../../backend/dbadapters/orders.mjs";
    /* import { ApiError } from "./errors/apierror.js"; */

    export const ordersRouter = express.Router();

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

/* Route for a user's orders: */
/* TODO: Error handling */
    ordersRouter.get(`/:userId`, async (req, res, next) => {
        const { userId } = req.params;

        try {
            const orders = await getAllOrdersByAUserId(userId);

          /*   if( userId === null || typeof userId === undefined || !userId ) {
                next(ApiError.badRequest('Incorrect type'));

                return;
            } else {
                res.send(orders);
                return orders;
            } */
            res.send(orders);
            return orders;

        } catch(error) {
            next(error)
        }
    })
