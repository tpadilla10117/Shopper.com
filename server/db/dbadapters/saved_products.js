/* File for saved_products table db adapters using SQL Queries: */

import { client } from '../client.js';
import { getProductById } from './products.js';

/* ----------------------------------------------------------------------------- */
//THESE ARE THE saved_prodcts METHODS:

export async function createSavedProduct(saved_product) {
	const { product_id, user_id, created_at } = saved_product;

	try {
		const {
			rows: [saved_product],
		} = await client.query(
			`
                INSERT INTO saved_products(product_id, user_id, created_at)
                VALUES($1,$2,$3)
                RETURNING *
            `,
			[product_id, user_id, created_at]
		);

		return saved_product;
	} catch (error) {
		throw error;
	}
}

/* Merely return all savedProducts across every user: */
export async function getSavedProducts() {
	try {
		const { rows } = await client.query(`
                SELECT * FROM saved_products
            `);

		return rows;
	} catch (error) {
		throw error;
	}
}

/* Retrieve all saved items for a user: */
export async function getSavedProductsByUserId(user_id) {
	try {
		const { rows: saved_products } = await client.query(
			`
                SELECT * FROM products
                INNER JOIN saved_products ON saved_products.product_id = products.id
                WHERE saved_products.user_id = $1
            `,
			[user_id]
		);

		return saved_products;
	} catch (error) {
		throw error;
	}
}

/* Retrieve a single saved item for a user: */
/* TESTED: 9/24 */
export async function getASavedProductByUserId({ user_id, product_id }) {
	try {
		const { rows: saved_product } = await client.query(
			`
                SELECT * FROM products
                INNER JOIN saved_products ON saved_products.product_id = products.id
                WHERE user_id = $1
                AND product_id = $2
            `,
			[user_id, product_id]
		);

		return saved_product;
	} catch (error) {
		throw error;
	}
}

/* Remove a specific saved item: */
/* TESTED: 9/24 */
export async function deleteSavedProductByProductid(product_id) {
	try {
		const { rows: saved_products } = await client.query(
			`
                DELETE FROM saved_products
                WHERE product_id = $1
                RETURNING *;
            `,
			[product_id]
		);

		return saved_products;
	} catch (error) {
		throw error;
	}
}
