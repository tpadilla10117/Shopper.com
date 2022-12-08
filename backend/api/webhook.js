/* Webhook used to retrieve data from Stripe API: */

import express from 'express';
import Stripe from 'stripe';
import bodyParser from 'body-parser';
import moment from 'moment';

import { createOrder } from '../db/dbadapters/orders.js';

/* const { getUserById } = require('../db/dbadapters/users'); */
export const webhookRouter = express();
/* const PORT = process.env.PORT || 4242; */

const stripe = new Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY);

/* Webhook Secret: */
const webhookEndpointSecret = process.env.REACT_APP_STRIPE_SIGNING_SECRET_KEY;

/* Fulfilling an order & pushing Stripe data into my DB if checkout session completed: */

webhookRouter.use((req, res, next) => {
	res.send(
		'A request is being made to /webhook!'
	);
	next();
});

webhookRouter.get('/', async (req, res) => {
	res.send(
		'Hit GET Route on Webhook'
	);
});

const fulfillOrder = async (session, retrievedExpandedListLineItems) => {

	let listLineItems = retrievedExpandedListLineItems.data;

	/* Create dynamic objects to populate an order: */
	function generateOrderItemsObjects(arr) {
		let orderItemObject = {};

		for (let i = 0; i < arr.length; i++) {
			let itemObject = arr[i];

			orderItemObject[i] = {
				orders_id: null,
				product_id: itemObject.price.product.metadata.productid,
				quantity: itemObject.quantity,
			};
		}

		return Object.values(orderItemObject);
	}

	return createOrder({
		user_id: Number(session.client_reference_id),
		amount_total: Number((session.amount_total / 100).toFixed(2)),
		currency: session.currency,
		status: session.status,
		created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
		order_items: generateOrderItemsObjects(listLineItems),
	});
};

/* Webhook: extract some events from stripe: */

webhookRouter.post(
	'/webhook',
	express.raw({ type: 'application/json' }),
	async (req, res) => {
		console.log('Firing Post Request from webhook!!!!');
		const signature = req.headers['stripe-signature'];
		let event;

		//Verify event came from Stripe:
		try {
			event = await stripe.webhooks.constructEvent(
				req.body,
				signature,
				webhookEndpointSecret
			);
		} catch (err) {
			res.status(400).send(`Webhook Error: ${err.message}`);
			console.log('My error from webhook: ', err);
			return;
		}

		//Handle the Stripe events:
		switch (event.type) {
			/* Retrieve a Stripe Checkout session and its id: */
			case 'checkout.session.completed':
				const session = event.data.object;
				console.log('Fire from checkout session completedmy session object: ', session)
				/* Expand the line_items 'product' property to get metadata:*/
				const lineItemsProductDataExpanded =
					await stripe.checkout.sessions.listLineItems(session.id, {
						expand: ['data.price.product'],
					});

				//Fulfill an order:
					
				return fulfillOrder(session, lineItemsProductDataExpanded)
					.then(() => res.status(200).end())
					.catch(err =>
						res.status(400).send(`Error in Webhook: ${err.message}`)
					);

			case 'payment_intent.created':
				const paymentIntent = event.data.object;
				console.log('PaymentIntent Created: ', paymentIntent.id);
				break;
			case 'payment_intent.succeeded':
				const paymentIntentSuccess = event.data.object;
				console.log(
					'Webhook: Payment Intent was successful!',
					paymentIntentSuccess
				);
				break;
			default:
				console.log('Unknown event type: ' + event.type);
		}

		res.send({ message: 'success from webhook!' });
	}
);

webhookRouter.listen(4242, () => console.log('Webhook Running on port 4242'));

/* webhookRouter.listen(PORT, () => console.log(`Webhook Running on port 4242`)); */
