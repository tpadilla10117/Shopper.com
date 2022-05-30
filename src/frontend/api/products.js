/* Routing for products: */

    const express = require('express');
    const productsRouter = express.Router();

/* Import DB methods: */
    const {
        getAllProducts,
        getProductById
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
/* THIS IS TO GET AN INDIVIDUAL PRODUCT */

    productsRouter.get('/:productid', async (req, res, next ) => {
        const { productid } = req.params;
        try {
            const product = await getProductById(productid);
            res.send(product);
            return product;
        } catch (error) {
            next(error)
        }
    });


/* ------------------------------------------------------------ */
/* THIS IS THE POST /products (*admin) Only admins can create a new product */

    module.exports = productsRouter;