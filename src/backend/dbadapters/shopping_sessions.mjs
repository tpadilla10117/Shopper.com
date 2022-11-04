/* File for shopping_sessions table db adapters using SQL Queries: */

import { client } from "../index.mjs";

/* ----------------------------------------------------------------------------- */
//THESE ARE THE shopping_sessions METHODS:

    export async function createShoppingSession(session) {
        const {
            user_id,
            totalcost,
            created_at
        } = session;

        try {
            const { rows: [ session ] } = await client.query(`
                INSERT INTO shopping_sessions(user_id, totalcost, created_at)
                VALUES($1, $2, $3)
                RETURNING *
            `, [ user_id, totalcost, created_at]);

            return session;
        } catch(error) {
            throw(error);
        }
    };

/* Retrieve a cart by a session_id: */
    export async function retrieveShoppingSessionItemById(id) {
        try {
            const { rows: cart_items } = await client.query(`
                SELECT shopping_sessions.id, cart_items.*
                FROM shopping_sessions
                LEFT JOIN cart_items
                ON shopping_sessions.id=cart_items.id
                WHERE cart_items.session_id=${id}
                
            `);

            return cart_items;
        } catch(error) {
            throw error;
        }
    };

/* TODO: */
    export async function retrieveAllShoppingSessionItems() {
        try {
            const { rows: cart_items } = await client.query(`
                
                
            `);

            return cart_items;
        } catch(error) {
            throw error;
        }
    };


/* module.exports = { 
    createShoppingSession,
    retrieveShoppingSessionItemById,
    retrieveAllShoppingSessionItems,
}; */