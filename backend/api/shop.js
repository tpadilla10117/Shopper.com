/* Routing for products: */

import express from 'express';
import dotenv from 'dotenv';
import { createClient} from 'redis';

/* Import DB methods: */
import { getAllProducts, getProductById } from '../db/dbadapters/products.js';

dotenv.config();

export const shopRouter = express.Router();
/* const PORT = process.env.REDIS_PORT;
console.log("My redis port: ", PORT); */

/* Create a Redis Client: */
/* By default, Redis client will try to connect to 'localhost' on port 6379: */

/* const client = createClient({
	host: 'localhost',
	port: 6379,
}); */
/* const client = createClient(6379); */
const client = createClient();

// Connect the Redis client
await client.connect();

// Handle Redis errors
client.on('error', err => console.log('Redis Client Error', err));

/* await client.set('TESTINGKEY', 'value');
const value = await client.get('key'); */


/* client.on('ready', () => {
	console.log('Redis client connected');
  
	client.keys('*', (err, keys) => {
	  console.log("Here are my keys: ", keys);
	  if (err) throw err;
  
	  console.log(keys);
	});
  }); */

// Middleware to check if data is available in Redis cache

const cache = async (req, res, next) => {
	const cacheKey = req.originalUrl;
  
	try {
	  const cachedData = await client.get(cacheKey);
  
	  if (cachedData) {
		console.log(`Cache hit for key ${cacheKey}`);
		res.setHeader('X-Cache-Status', 'HIT');
		return res.send(JSON.parse(cachedData));
	  }
  
	  console.log(`Cache miss for key ${cacheKey}`);
	  res.setHeader('X-Cache-Status', 'MISS');
	  return next();
	} catch (error) {
	  console.error(`Error getting cache for key ${cacheKey}: ${error}`);
	  return next();
	}
  };


/* ------------------------------------------------------------ */
/* THIS IS THE GET/products ROUTER */
/* TODO:

	- Try creating  a new funciton called getProducts(), that receives an object that is essentially the filtered data I want
	- 
*/

shopRouter.get('/', cache, async (req, res, next) => {

	try {
		const cacheKey = req.originalUrl;
		const products = await getAllProducts();

	/* Setting my data in cache (THIS WORKS): */
		await client.setEx(cacheKey, 3600, JSON.stringify(products), (err) => {
			console.log("cached: ", products);
		})


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
