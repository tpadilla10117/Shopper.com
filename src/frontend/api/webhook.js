const { createOrder } = require('../../backend/dbadapters/orders');

const { getUserById } = require('../../backend/dbadapters/users');

const webhookRouter = require('express')();

const stripe = require('stripe')('sk_test_51KepPXD7lX2ovvhcicz2AvcKBiAuLYyJga2nf6rSF0QiwHTgiQ81zuwVvynSFfxxNjsxvQ7WVx6cztwHeCOIINRP00kJUGG5gh');
    
const bodyParser = require('body-parser');

/* Webhook Secret: */
const webhookEndpointSecret = 'whsec_613cad032f31e2eb00c8668fe4cfe5691d8ef7e805dad8ea1e585cfb9eea5862';


/* TODO: Fulfilling an order & pushing Stripe data into my DB if checkout session completed: */

/* WILL HAVE TO GET LINE ITEMS FOR THIS TO WORK 

    - 8/16 -> retrieving via the session object, then loop for the order_items

*/


    const fulfillOrder = async ( session, retrievedSessionObjectWithLineItems ) => {

        
       /*  try {
            await getUserById
        } */

        
        let retrievedLineItems = retrievedSessionObjectWithLineItems.line_items.data;

    /* Create dynamic objects to populate an order: */
        function generateOrderItemsObjects(arr) {
            let orderItemObject = {};

            for(let i = 0; i < arr.length; i++) {
                let itemObject = arr[i];
            /* TODO: JUST NEED THE METADATA (productid) */
                orderItemObject[i] = {
                  orders_id: null,
                  /* product_id: itemObject.price.metadata, */
                  product_id: 2,
                  quantity: itemObject.quantity,
                }
            
              }
          
              return Object.values(orderItemObject)
        };

        
        console.log('Line_items from fulfillOrder: ', retrievedLineItems[0].price)
        console.log('Line_items from fulfillOrder: ', retrievedLineItems[0].price.product)

      /*  console.log('Metadata from a lineItem: ', retrievedLineItems[0].price.metadata); */

       /* console.log('Metadata (quantity) from a lineItem: ', retrievedLineItems[0].quantity); */

       console.log('Testing the generateOrderITems function:', generateOrderItemsObjects(retrievedLineItems))

        return createOrder( {
            user_id: 1,
            /* TODO: useSelectTotal for cart Total */
            amount_total: Number( (session.amount_total / 100).toFixed(2) ),
            currency: session.currency,
            status: session.status,
            created_at: require('moment')().format('YYYY-MM-DD HH:mm:ss'),
            /* TODO: Need to retrieve metadata from the session object */
            
            
            order_items: generateOrderItemsObjects(retrievedLineItems),
            
           
/* 
            order_items: [
                {
                    orders_id: null,
                    product_id: 2,
                    quantity: 2,
                },
            ] */

        })
        
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

    /* Retrieve my line_items */
                const retrievedLineItems = await stripe.checkout.sessions.retrieve(
                    session.id, 
                    {
                        expand: ['line_items']
                    }
                )
                
                console.log('Here are my line items retrieved: ', retrievedLineItems)
                
    //Fulfill an order:
                
                return fulfillOrder(session, retrievedLineItems)
                    .then( () => res.status(200).end() )
                    .catch( (err) => res.status(400).send(`Error in Webhook: ${err.message}`));
                
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


    webhookRouter.listen(4242, () => console.log('Webhook Running on port 4242'));

module.exports = webhookRouter;