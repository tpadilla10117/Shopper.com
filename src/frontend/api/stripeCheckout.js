/* TODO: Where I create a stripe checkout session: */

    const stripeApi = require('./stripe');
    
    async function createStripeCheckoutSession(req, res) {
        const domainURL = process.env.WEB_APP_URL;
        
        const { items, email } = req.body;

        console.log("Here are my line items:", items)
        console.log("Here is my customer email: ", email);

    /* Need to transform data in my array so it reflects the formate Stripe wants: */
        const transformedItems = items.map( item => ({
        
        /* if group items together, need to change quantity logic */
            quantity: item.quantity,
            price_data: {
                currency: 'usd',
                unit_amount: item.price * 100,
                product_data: {
                    name: item.title,
                    description: item.description,
                    images: [item.image],
                    metadata: {
                        productid: item.productid
                    }
                }
            }
        }));

    /* Used to extract a prdouctId: */
        /* const transformedItemsMetadata = items.map( item => ({
            metadata: {
                productid: item.productid.toString()
            }
        })); */
        
        const transformedItemsMetadata = items.map( item => ({
            
            productid: item.productid.toString()
            
        }));

      
/* TODO: Need to return an object, not an array of objects

        - that is why Object.values doesnt work
*/
        function individualMetadata(arr) {
            let orderItemObject = {};

            for(let i = 0; i < arr.length; i++) {
                let itemObject = arr[i];
            
                orderItemObject[i] = itemObject;
                console.log('my items from individualmetadata:', orderItemObject[i])

            }
            console.log('from the return : ', orderItemObject) 
            /* return Object.values(orderItemObject) */
        }

        /* 
        let orderItemObject = {};

            for(let i = 0; i < arr.length; i++) {
                let itemObject = arr[i];
            
            orderItemObject[i] = {
                orders_id: null,
                
                product_id: 2,
                quantity: itemObject.quantity,
              }
          
            }
        
            return Object.values(orderItemObject)
        */


        console.log("My transformed Items: ", transformedItems)
        console.log("My transformed Items with metadara: ", transformedItemsMetadata)
        console.log("My transformed Items with metadara: ", typeof transformedItemsMetadata)
       /*  console.log("My transformed Items with metadara 2nd loop: ",  individualMetadata)
        console.log("My transformed Items with metadara 2nd loop: ", typeof individualMetadata) */
        /* console.log("My transformed Items productid: ", transformedItems[0].price_data.product_data.metadata) */

    /* Check if req.body has items and email: */
        if(!items || !email) {
            return res.status(400).json({error: 'Missing required session parameters!'})
        };

        

        try {
        /* Session Object gets created (https://stripe.com/docs/api/checkout/sessions/object#checkout_session_object-success_url): */
        /* TODO: Need to Change domainURL to whatever url you deploy application to - remember to change success and cancel URLs: */
            const session = await stripeApi.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: transformedItems,
                metadata: individualMetadata(transformedItemsMetadata),
                /* line_items,
                customer_email,
                */
                customer_email: email,
                /* success_url: `${domainURL}/success?session_id={CHECKOUT_SESSION_id}` */
                success_url: `http://localhost:3001/success`,
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