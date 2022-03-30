/* TODO: Where I create a stripe checkout session: */

    /* import { useSelector } from 'react-redux';
    import { selectItems, selectTotal } from '../reduxslices/basketslice'; */

    const stripeApi = require('./stripe');

    async function createStripeCheckoutSession(req, res) {
        const domainURL = process.env.WEB_APP_URL;
        
        const { line_items, customer_email } = req.body;

    /* Check if req.body has items and email: */
        if(!line_items || !customer_email) {
            return res.status(400).json({error: 'Missing required session parameters!'})
        };

        let session;

        try {
        /* TODO: Need to Change domainURL to whatever url you deploy application to: */
            session = await stripeApi.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items,
                customer_email,
                success_url: `${domainURL}/success?session_id={CHECKOUT_SESSION_id}`,
                cancel_url: `${domainURL}/canceled`,
                shipping_address_collection: { allowed_countries: ['GB', 'US']}

            });
            res.status(200).json({ sessionId: session.id } )
        } catch (error) {
            console.log(error);
        /* Alert frontend for an error: */
            res.status(400).json( { error: 'An Error occured!  Unable to create session.'})
        }
    };

    module.exports = createStripeCheckoutSession;