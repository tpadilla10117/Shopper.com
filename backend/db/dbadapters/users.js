/* File for users table db adapters: */
import { client } from '../client.js';
import bcrypt from 'bcrypt';
const SALT_COUNT = 10;
/* ----------------------------------------------------------------------------- */
//THESE ARE THE USER METHODS:

export async function createUser({
	firstname,
	lastname,
	email,
	imageURL,
	username,
	password,
	isAdmin,
	active,
	created_at,
}) {
	const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

	try {
		const {
			rows: [user],
		} = await client.query(
			`
            INSERT INTO users (firstname, lastname, email, imageURL, username, password, isAdmin, active, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
            `,
			[
				firstname,
				lastname,
				email,
				imageURL,
				username,
				hashedPassword,
				isAdmin,
				active,
				created_at,
			]
		);

		return user;
	} catch (error) {
		throw error;
	}
}

//This function allows us to get all our users:
export async function getAllUsers() {
	try {
		const { rows } = await client.query(`
            SELECT * FROM users
            `);

		return rows;
	} catch (error) {
		throw error;
	}
}

/* This function allows us to get a specific user: */
export async function getUser({ username, password }) {
	try {
		const {
			rows: [user],
		} = await client.query(
			`
            SELECT * FROM users WHERE username=$1
            `,
			[username]
		);
		const isMatch = await bcrypt.compare(password, user.password);

		if (isMatch) {
			console.log('We have a matching password');
			delete user.password;
			return user;
		} else if (!isMatch) {
			console.log('The password does not match!');
		}
	} catch (error) {
		throw error;
	}
}

/* This function retrieves a user by id: */
export async function getUserById(id) {
	try {
		const {
			rows: [user],
		} = await client.query(
			`
            SELECT * FROM users WHERE id=$1
            `,
			[id]
		);
		delete user.password;
		return user;
	} catch (error) {
		throw error;
	}
}

/* This function retrives a user by username: */
export async function getUserByUsername(username) {
	try {
		const { rows } = await client.query(
			`
            SELECT * FROM users
            WHERE username=$1
            `,
			[username]
		);

		if (!rows || !rows.length) {
			return null;
		}
		const [user] = rows;
		return user;
	} catch (error) {
		throw error;
	}
}

/* TODO: updateUser() ? */
