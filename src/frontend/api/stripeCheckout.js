/* TODO: Where I create a stripe checkout session: */

    /* import { useSelector } from 'react-redux';
    import { selectItems, selectTotal } from '../reduxslices/basketslice'; */

    const stripeApi = require('./stripe');

    async function createStripeCheckoutSession(req, res) {
        const domainURL = process.env.WEB_APP_URL;
        const { line_items, customer_email } = req.body;

    /* Check if req.body has items and email: */
        if(!line_items || customer_email) {
            return res.status(400).json({error: 'Missing required session parameters!'})
        };

        let session;

        try {
            session = await stripeApi.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items,
                customer_email,
                success_url: ``

            })
        } catch (error) {

        }
    };