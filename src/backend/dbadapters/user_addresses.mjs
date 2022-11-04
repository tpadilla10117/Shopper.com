/* File for user_addresses table  */
import { client } from "../index.mjs";

/* ----------------------------------------------------------------------------- */
//THESE ARE THE user_addresses METHODS:

    export async function getUserAddress( user_id ) {

        try {
            const { rows: [user_addresses] } = await client.query(`
                SELECT * FROM user_addresses WHERE user_id=$1
            `, [user_id]);

            return user_addresses;

        } catch (error) {
            throw error;
        }
    };


    /* TO ADD AN ADDRESS VIA A FORM:*/
    /*  - Frontend needs to request the userobject for the user.id */

    export async function createUserAddressByUser(user_addresses) {
        const {
            address_line1,
            address_line2,
            city,
            postal_code,
            state,
            country,
            mobile_number,
            user_id
        } = user_addresses;

        try {
            /* Grab id from users object */
            const { rows: [ user_addresses ] } = await client.query(`
                INSERT INTO user_addresses(address_line1, address_line2, city, postal_code, country, state, mobile_number, user_id)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *
            `, 
            [  
                address_line1,
                address_line2,
                city,
                postal_code,
                country,
                state,
                mobile_number,
                user_id
            ]);

            return user_addresses;

        } catch(error) {
            throw error;
        }
    };


   /*  module.exports = {
        getUserAddress,
        createUserAddressByUser
    }; */