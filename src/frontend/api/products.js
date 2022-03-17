/* Routing for products: */

    const express = require('express');
    const productsRouter = express.Router();

/* Import DB methods: */
    const {
        getAllProducts
    } = require('../../backend/dbadapters/products');

/* ------------------------------------------------------------ */
/* THIS IS THE GET/products ROUTER */

    productsRouter.get('/', async (req, res, next ) => {
        try {
            const products = await getAllProducts();
            res.send(products);
            return products;
        } catch (error) {
            next(error)
        }
    });

/* ------------------------------------------------------------ */
/* THIS IS THE POST /products (*admin) Only admins can create a new product */

    module.exports = productsRouter;