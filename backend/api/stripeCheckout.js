/* Where I create a stripe checkout session: */

import { stripe } from './stripe.js';
const stripeApi = stripe;

/* My line_items and email to send to Stripe: */
export default async function createStripeCheckoutSession(req, res) {
	const websiteURL = process.env.REACT_APP_FRONTEND_URL;
	const { items, email, user_id } = req.body;

	/* I transform data in my array so it reflects the format Stripe wants: */
	const transformedItems = items.map(item => ({
		quantity: item.quantity,
		price_data: {
			currency: 'usd',
			unit_amount: item.price * 100,
			product_data: {
				name: item.title,
				description: item.description,
				images: [item.image],
				metadata: {
					productid: item.id,
				},
			},
		},
	}));

	/* Check if req.body has items and email: */
	if (!items || !email) {
		return res
			.status(400)
			.json({ error: 'Missing required session parameters!' });
	}

	try {
		/* Session Object gets created (https://stripe.com/docs/api/checkout/sessions/object#checkout_session_object-success_url): */

		/* Need to Change domainURL to whatever url you deploy application to - remember to change success and cancel URLs: */

		const session = await stripeApi.checkout.sessions.create({
			payment_method_types: ['card'],
			mode: 'payment',
			line_items: transformedItems,
			client_reference_id: user_id,
			customer_email: email,
			success_url: `${websiteURL}/success`,
			cancel_url: `${websiteURL}/canceled`,
			shipping_address_collection: { allowed_countries: ['GB', 'US'] },
		});

		res.status(200).json({ sessionId: session.id });
	} catch (error) {
		console.log(error);
		/* Alert frontend for an error: */
		res.status(400).json({
			error: 'An Error occured!  Unable to create session.',
		});
	}
}
