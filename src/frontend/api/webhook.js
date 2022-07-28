/* const express = require('express');
const webhookRouter = express.Router(); */
const webhookRouter = require('express')();

const stripe = require('stripe')('sk_test_51KepPXD7lX2ovvhcicz2AvcKBiAuLYyJga2nf6rSF0QiwHTgiQ81zuwVvynSFfxxNjsxvQ7WVx6cztwHeCOIINRP00kJUGG5gh');
    
const bodyParser = require('body-parser');

/* Webhook Secret: */
const webhookEndpointSecret = 'whsec_613cad032f31e2eb00c8668fe4cfe5691d8ef7e805dad8ea1e585cfb9eea5862';

//To test Webhook route:
webhookRouter.use((req, res, next) => {
    console.log("A request is being made to /webhook");
    next();
});

/* Fulfilling an order if checkout session completed: */
/* TODO: 7/27 -> WORKS, so now I  have to put data in db:*/
    const fulfillOrder = async (session) => {
        console.log('Fulfilling order!');

        
    };

/* Webhook TODO: */
/* extract some events from stripe: */
/* This would be for my deployed app: */
    webhookRouter.post('/webhook', bodyParser.raw({type: 'application/json'}), async (req, res) => {
        console.log('Firing from webhook!!!!')
        const signature = req.headers['stripe-signature'];
        let event;

    //Verify event came from Stripe:
        try {
            event = await stripe.webhooks.constructEvent(
                req.body, 
                signature, 
                webhookEndpointSecret
            );

        } catch(err) {
           res.status(400).send(`Webhook Error: ${err.message}`);
           console.log('My error from webhook: ', err)
           return;
        }

    //Handle the Stripe events:
        switch(event.type) {
              
            case 'checkout.session.completed':
                const session = event.data.object;
                console.log("Checkout Session ID: ", session.id)
                console.log("Checkout Session object: ", session)
                
                //TODO: Need to fulfill an order

               /*  return fulfillOrder(session)
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


    webhookRouter.listen(4242, () => console.log('Running on port 4242'));
module.exports = webhookRouter;