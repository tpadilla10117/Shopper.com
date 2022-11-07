/* File for product_reviews table db adapters using SQL Queries: */

import { client } from '../client.js';
/* ----------------------------------------------------------------------------- */
//THESE ARE THE product_reviews METHODS:

export async function createProductReview(product_review) {
	const { title, description, rating, user_id, product_id, created_at } =
		product_review;

	try {
		const {
			rows: [product_review],
		} = await client.query(
			`
                INSERT INTO product_reviews(title, description, rating, user_id, product_id,created_at)
                VALUES($1, $2, $3, $4, $5, $6)
                RETURNING *
            `,
			[title, description, rating, user_id, product_id, created_at]
		);

		return product_review;
	} catch (error) {
		throw error;
	}
}

export async function getAllProductReviews() {
	try {
		const { rows } = await client.query(`
                SELECT * FROM product_reviews
            `);

		return rows;
	} catch (error) {
		throw error;
	}
}

export async function getAProductReviewById(id) {
	try {
		const { rows: reviews } = await client.query(
			`
            SELECT * FROM product_reviews
            WHERE id = $1
            `,
			[id]
		);

		return reviews;
	} catch (error) {
		throw error;
	}
}

/* TODO: */

export async function getAProductReviewByUser(userId) {
	try {
	} catch (error) {
		throw error;
	}
}
