/* File for admin table db adapters: */

import { client } from "../index.js";

/* To update a user's info: */
    export const updateUser = async({id, ...fields}) => {
        const setString = Object.keys(fields).map(
            (key, index) => `${ key }=$${ index + 1}`
        ).join(', ');

        const objVal = Object.values(fields);
        if ( setString.length === 0) {
            return;
        }

        objVal.push(id);

        try {
            const {rows: [user] } = await client.query(`
            UPDATE users
            SET ${setString}
            WHERE id = $${objVal.length}
            RETURNING *;
            `, objVal);
            return user;
        } catch (error) {
            throw (error);
        };
    };

  /*   module.exports = {
        updateUser,
    } */