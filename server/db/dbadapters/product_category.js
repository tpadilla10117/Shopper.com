/* File for product_category table db adapters using SQL Queries (DQL, Data Query Langauge): */

import { client } from '../client.js';
/* ----------------------------------------------------------------------------- */
//THESE ARE THE product_category METHODS:

export async function getAllProductCategories() {
	try {
		const { rows } = await client.query(`
                SELECT * FROM product_category
            `);
		return rows;
	} catch (error) {
		throw error;
	}
}

export async function createProductCategories(product_category) {
	const { name, description, created_at } = product_category;

	try {
		const {
			rows: [product_category],
		} = await client.query(
			`
                INSERT INTO product_categories(name, description,"created_at")
                VALUES($1, $2, $3)
                RETURNING *
            `,
			[name, description, created_at]
		);

		return product_category;
	} catch (error) {
		throw error;
	}
}
