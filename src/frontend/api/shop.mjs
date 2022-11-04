/* Routing for products: */
    import express from "express";
    import {
        getAllProducts,
        getProductById,
    } from '../../backend/dbadapters/products.mjs';

    export const shopRouter = express.Router();

/* ------------------------------------------------------------ */
/* THIS IS THE GET/products ROUTER */

    shopRouter.get('/', async (req, res, next ) => {
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

    shopRouter.get('/prodid:productid', async (req, res, next ) => {
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
