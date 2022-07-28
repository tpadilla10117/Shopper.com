const express = require('express');
const webhookRouter = express.Router();

const stripe = require('stripe')('sk_test_51KepPXD7lX2ovvhcicz2AvcKBiAuLYyJga2nf6rSF0QiwHTgiQ81zuwVvynSFfxxNjsxvQ7WVx6cztwHeCOIINRP00kJUGG5gh');
    
const bodyParser = require('body-parser');

/* Webhook Secret: */
const webhookEndpointSecret = 'whsec_613cad032f31e2eb00c8668fe4cfe5691d8ef7e805dad8ea1e585cfb9eea5862';

webhookRouter.use( (req, res, next) => {
    if(req.originalUrl === '/webhook') {
        next();
    } else{
        bodyParser.json()(req, res, next);
    }
});

/* Fulfilling an order if checkout session completed: */
/* TODO: 7/27 -> WORKS, so now I  have to put data in db:*/
    const fulfillOrder = async (session) => {
        console.log('Fulfilling order!');
    };

/* Webhook TODO: */
/* extract some events from stripe: */
/* This would be for my deployed app: */
    webhookRouter.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
        
        let event;

    //Verify event came from Stripe:
        try {
            const signature = req.headers['stripe-signature'];
            event = stripe.webhooks.constructEvent(
                req.body, 
                signature, 
                webhookEndpointSecret
            );

        } catch(err) {
           return res.status(400).send(`Webhook Error: ${err.message}`);
        }

    //Handle the Stripe events:
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



module.exports = webhookRouter;