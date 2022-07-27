/* I DEFINE AN API ROUTER HERE, AND ATTACH THE OTHER ROUTERS */
    const express = require('express');
    const apiRouter = express.Router();

    const jwt = require('jsonwebtoken');
    const { getUserById } = require('../../backend/dbadapters/users');
    const {JWT_SECRET} = process.env;
    const apiErrorHandler = require('./errors/apirerrorhandler');
    const createStripeCheckoutSession = require('./stripeCheckout');

    const stripe = require('stripe')('sk_test_51KepPXD7lX2ovvhcicz2AvcKBiAuLYyJga2nf6rSF0QiwHTgiQ81zuwVvynSFfxxNjsxvQ7WVx6cztwHeCOIINRP00kJUGG5gh');
    
    const bodyParser = require('body-parser');

/* For API Requests...*/
    apiRouter.use(async (req, res, next) => {
        const prefix = 'Bearer ';
        const auth = req.header('Authorization');

        if (!auth) {
            next();
        } else if (auth.startsWith(prefix)) {
            const token = auth.slice(prefix.length);

            try {
                //read the token and attempt to decrypt...
                const { id } = jwt.verify(token, JWT_SECRET);

                if (id) {
                    req.user = await getUserById(id);
                    next();
                }
        
            } catch ({ name, message}) {
                next({ name, message});
            }
        } else {
            next({
                name: 'AuthorizationHeaderError',
                message: `Authorization token must start with ${prefix}`
            });
        }
    });

/* Use .use to add middleware */
    apiRouter.use( (req, res, next) => {
        if (req.user) {
            console.log('User is set: ', req.user);
        }
        next();
    })

    apiRouter.get('/', (req, res) => {
        res.send({
            message: "Greetings from api/"
        })
    })

/* Webhook Secret: */
    const webhookEndpointSecret = 'whsec_613cad032f31e2eb00c8668fe4cfe5691d8ef7e805dad8ea1e585cfb9eea5862';

/* Fulfilling an order if checkout session completed: */
/* TODO: 7/27 -> WORKS, so now I  have to put data in db:*/
    const fulfillOrder = async (session) => {
        console.log('Fulfilling order!');
    };

/* Webhook TODO: */
/* extract some events from stripe: */
/* This would be for my deployed app: */
    apiRouter.post('/webhook', bodyParser.raw({type: 'application/json'}), (req, res) => {
        const event= req.body;
        /* const payload = req.body; */
        console.log("Here is my req.body from webhook: ",req.body)

       /*  const signature = req.headers['stripe-signature'];
        let event;

        try {
            event = stripe.webhooks.constructEvent(payload, signature, webhookEndpointSecret);
        } catch(err) {
            return res.status(400).send(`Webhook Error: ${err.message}`);
        } */

        switch(event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
                console.log("Checkout Session ID: ", session.id)
                console.log("Checkout Session object: ", session)

                //TODO: Need to fulfill an order

                /* return fulfillOrder(session)
                    .then( () => res.status(200))
                    .catch( (err) => res.status(400).send(`Error in Webhook: ${err.message}`)); */
                    break;

            case 'payment_intent.created':
                const paymentIntent = event.data.object;
                console.log("PatmentIntent Created: ", paymentIntent.id);
                break;
            case 'payment_intent.succeeded':
                const paymentIntentSuccess = event.data.object;
                console.log('Webhook: Payment Intent was successful!', paymentIntentSuccess)
                break;
            default:
                console.log('Unkown event type: ' + event.type)
        }
        res.send({ message: 'success from webhook!'})
    });

/* Testing Stripe checkout Route: */
    apiRouter.post('/create-checkout-session', createStripeCheckoutSession);

/* Middleware where I attach my routers and handle requests...  */
    
    const usersRouter = require('./users');
    apiRouter.use('/products', require('./products'));
    apiRouter.use('/orders', require('./orders'));
    apiRouter.use('/users', usersRouter);

    apiRouter.use(apiErrorHandler);

    module.exports = apiRouter;