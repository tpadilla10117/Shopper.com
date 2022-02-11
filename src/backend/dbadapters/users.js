/* File for users table db adapters: */
    const {client} = require('../index');
    const bcrypt = require('bcrypt');
    const SALT_COUNT = 10;
/* ----------------------------------------------------------------------------- */
//TODO: THESE ARE THE USER METHODS:


    async function createUser( {firstName, lastName, email, imageURL, username, password, isAdmin} ) {
        const hashedPassword = await bcrypt.hash(
            password, SALT_COUNT
        );

        try {
            const { rows: [user] } = await client.query(`
            INSERT INTO users (firstName, lastName, email, imageURL, username, password, isAdmin)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
            `, [firstName, lastName, email, imageURL, username, hashedPassword, isAdmin]);

            return user;
        } catch (error) {
            throw error;
        }
    }

    //This function allows us to get all our users:
    /* async function getAllUsers() {
        try {
            
        }
    } */


    module.exports = {
        createUser
    }