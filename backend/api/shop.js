/* Routing for products: */

import express from 'express';
/* import apicache from 'apicache'; */
import { createClient} from 'redis';

/* Import DB methods: */
import { getAllProducts, getProductById } from '../db/dbadapters/products.js';

export const shopRouter = express.Router();

/* Create a Redis Client: */

/* const cache = apicache.middleware; */

/* By default, Redis client will try to connect to 'localhost' on port 6379: */
const client = createClient({
	host: 'localhost',
	port: 6379,
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

/* Create middleware that checks if the requested data is available in Redis cache: */

const cache = (req, res, next) => {
  
	client.get(req.originalUrl, (err, data) => {
	  if (err) throw err;
  
	  if (data !== null) {
		res.send(JSON.parse(data));
	  } else {
		next();
	  }
	});
};

console.log("Here is cache: ", cache);

/* ------------------------------------------------------------ */
/* THIS IS THE GET/products ROUTER */
/* TODO:

	- Try creating  a new funciton called getProducts(), that receives an object that is essentially the filtered data I want
	- 
*/

shopRouter.get('/', cache, async (req, res, next) => {
	const { page = 4, limit = 5 } = req.query;

	try {
		const products = await getAllProducts();

		client.setex(req.originalUrl, 3600, JSON.stringify(products));

		res.send(products);
		return products;
	} catch (error) {
		next(error);
	}
});

/* ------------------------------------------------------------ */
/* THIS IS TO GET AN INDIVIDUAL PRODUCT */

shopRouter.get('/prodid:productid', async (req, res, next) => {
	const { productid } = req.params;
	try {
		const product = await getProductById(productid);
		res.send(product);
		return product;
	} catch (error) {
		next(error);
	}
});

/* ------------------------------------------------------------ */
/* THIS IS THE POST /products (*admin) Only admins can create a new product */
