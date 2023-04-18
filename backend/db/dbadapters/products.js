/* File for products table db adapters using SQL Queries: */

import { client } from '../client.js';

/* ----------------------------------------------------------------------------- */
//THESE ARE THE PRODUCT METHODS:

/* Return all products in the db: */
export async function getAllProducts(page, limit) {
	/* console.log("Coming from my db methids: ", page, limit);
	try {
		const { rows } = await client.query(`
                SELECT * FROM products
            `);
		return rows;
	} catch (error) {
		throw error;
	} */
	console.log("Coming from my db methids: ", page, limit);
  try {
    const offset = (page - 1) * limit; // Calculate the offset based on the page and limit
    const { rows } = await client.query(`
      SELECT * FROM products
      LIMIT ${limit}
      OFFSET ${offset}
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

/* Create additional products in the db:  */
export async function createProducts(product) {
	const {
		title,
		description,
		productid,
		image,
		category_id,
		subcategory,
		price,
	} = product;

	try {
		const {
			rows: [product],
		} = await client.query(
			`
            INSERT INTO products(title, description, productid, image, category_id, subcategory, price)
            VALUES($1,$2,$3,$4,$5,$6,$7)
            RETURNING *
        `,
			[
				title,
				description,
				productid,
				image,
				category_id,
				subcategory,
				price,
			]
		);

		return product;
	} catch (error) {
		throw error;
	}
}

/* Return a single product by its id (Primary Key) : */
export async function getProductById(id) {
	try {
		const {
			rows: [product],
		} = await client.query(
			`
            SELECT * FROM products WHERE id=$1

            `,
			[id]
		);

		return product;
	} catch (error) {
		throw error;
	}
}
