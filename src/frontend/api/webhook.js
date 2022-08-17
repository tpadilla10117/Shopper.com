/* Webhook used to retrieve data from Stripe API: */

    const { createOrder } = require('../../backend/dbadapters/orders');

    /* const { getUserById } = require('../../backend/dbadapters/users'); */

    const webhookRouter = require('express')();

    const stripe = require('stripe')('sk_test_51KepPXD7lX2ovvhcicz2AvcKBiAuLYyJga2nf6rSF0QiwHTgiQ81zuwVvynSFfxxNjsxvQ7WVx6cztwHeCOIINRP00kJUGG5gh');
        
    const bodyParser = require('body-parser');

    /* Webhook Secret: */
    const webhookEndpointSecret = 'whsec_613cad032f31e2eb00c8668fe4cfe5691d8ef7e805dad8ea1e585cfb9eea5862';


/* Fulfilling an order & pushing Stripe data into my DB if checkout session completed: */

    const fulfillOrder = async ( 
        session, 
        retrievedExpandedListLineItems 
    ) => {

        
       /*  try {
            await getUserById
        } */

        
        let listLineItems = retrievedExpandedListLineItems.data;

    /* Create dynamic objects to populate an order: */
        function generateOrderItemsObjects(arr) {
            let orderItemObject = {};

            for(let i = 0; i < arr.length; i++) {
                let itemObject = arr[i];
            
                orderItemObject[i] = {
                  orders_id: null,
                  product_id: itemObject.price.product.metadata.productid,
                  quantity: itemObject.quantity,
                }
            
              }
          
              return Object.values(orderItemObject)
        };

        return createOrder( {
            user_id: 1,
            amount_total: Number( (session.amount_total / 100).toFixed(2) ),
            currency: session.currency,
            status: session.status,
            created_at: require('moment')().format('YYYY-MM-DD HH:mm:ss'),
            order_items: generateOrderItemsObjects(listLineItems),

        })
        
    };

/* Webhook: extract some events from stripe: */
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
        /* Retrieve a Stripe Checkout session and its id: */
            case 'checkout.session.completed':
                const session = event.data.object;
              
    /* Retrieve my line_items */
                const retrievedLineItems = await stripe.checkout.sessions.retrieve(
                    session.id, 
                    {
                        expand: ['line_items']
                    }
                );

    /* Expand the line_items 'product' property to get metadata:*/
                const lineItemsProductDataExpanded = await stripe.checkout.sessions.listLineItems(
                    session.id,
                    {
                        expand: ['data.price.product'],
                    }
                );
                
    //Fulfill an order:
                
                return fulfillOrder(session, lineItemsProductDataExpanded)
                    .then( () => res.status(200).end() )
                    .catch( (err) => res.status(400).send(`Error in Webhook: ${err.message}`));
                
            case 'payment_intent.created':
                const paymentIntent = event.data.object;
                console.log("PaymentIntent Created: ", paymentIntent.id);
                break;
            case 'payment_intent.succeeded':
                const paymentIntentSuccess = event.data.object;
                console.log('Webhook: Payment Intent was successful!', paymentIntentSuccess)
                break;
            default:
                console.log('Unknown event type: ' + event.type)
        }

        res.send({ message: 'success from webhook!'})
    });


    webhookRouter.listen(4242, () => console.log('Webhook Running on port 4242'));

module.exports = webhookRouter;