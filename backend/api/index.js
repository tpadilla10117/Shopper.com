/* I DEFINE AN API ROUTER HERE, AND ATTACH THE OTHER ROUTERS */

import express from 'express';
import jwt from 'jsonwebtoken';

import { getUserById } from '../db/dbadapters/users.js';

import { usersRouter } from './users.js';
import { shopRouter } from './shop.js';
import { ordersRouter } from './orders.js';
import { webhookRouter } from './webhook.js';

import apiErrorHandler from './errors/apirerrorhandler.js';
import createStripeCheckoutSession from './stripeCheckout.js';

/* Middleware where I attach my routers and handle requests...  */

export const apiRouter = express.Router();
const { REACT_APP_JWT_SECRET } = process.env;

/* For API Requests...*/
apiRouter.use(async (req, _res, next) => {
	const prefix = 'Bearer ';
	const auth = req.header('Authorization');

	if (!auth) {
		next();
	} else if (auth.startsWith(prefix)) {
		const token = auth.slice(prefix.length);

		try {
			//read the token and attempt to decrypt...
			const { id } = jwt.verify(token, REACT_APP_JWT_SECRET);

			if (id) {
				req.user = await getUserById(id);
				next();
			}
		} catch ({ name, message }) {
			next({ name, message });
		}
	} else {
		next({
			name: 'AuthorizationHeaderError',
			message: `Authorization token must start with ${prefix}`,
		});
	}
});

/* Use .use to add middleware: */

apiRouter.use((req, res, next) => {
	if (req.originalUrl === '/webhook/webhook') {
		console.log('Hit the /webhook endpoint in the apiRouter:', req.originalUrl)
		next();
	} else {
		express.json()(req, res, next);
		console.log('Here is original URL: ', req.originalUrl);
	}
});

apiRouter.use((req, _res, next) => {
	if (req.user) {
		console.log('User is set: ', req.user);
	}
	next();
});

/*  apiRouter.get('/', (req, res) => {
        res.send({
            message: "Greetings from api/"
        })
    }) */

/* Testing Stripe checkout Route: */
apiRouter.post('/create-checkout-session', createStripeCheckoutSession);

apiRouter.use('/shop', shopRouter);
apiRouter.use('/orders', ordersRouter);
apiRouter.use('/webhook', webhookRouter);
apiRouter.use('/users', usersRouter);

apiRouter.use(apiErrorHandler);
