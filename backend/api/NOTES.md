<!-- Pagination: 

    - E.g. In my backend/api/shop.js file:

    1)  I defined a GET router (route handler function) that deconstructs a [page] and [limit] parameters as part of my req.query
        - Page is meant to be the number of pages, limit is how many items to display per page

    2) I send these query parameters in my request, passing them to my `getAllProducts` function

    3) In the backend/db/dbadapters/products.js , my database function / query, I modified the SQL query by adding a 'LIMIT' clause to limit the number of results per page, and an `OFFSET` clause to specify which page to retrieve

        - LIMIT: This returns the specified number of rows from the beginning of the result set. For example, LIMIT 10 would return the first 10 rows of the result set.

        - OFFSET clause is used to skip a specified number of rows from the beginning of the result set. The syntax for OFFSET clause is:

        SELECT column1, column2, ...
        FROM table_name
        OFFSET number_of_rows;

        - This returns the result set starting from the specified row number. For example, OFFSET 10 would skip the first 10 rows of the result set and start from the 11th row.


    4) You would then make a GET request to the /products route with the appropriate page and limit query parameters to retrieve the desired page of products.
     - For example:

     GET /shop?page=2&limit=5




-->




<!-- stripeCheckout.js -->
    - A StripeCheckoutSession needs data sent in a specific format.  
    
        E.g. For my line_items, I send:

            - ** const transformedItems = items.map( item => ({
                
                    quantity: item.quantity,
                    price_data: {
                        currency: 'usd',
                        unit_amount: item.price * 100,
                        product_data: {
                            name: item.title,
                            description: item.description,
                            images: [item.image],
                            metadata: {
                                productid: item.id
                            }
                        }
                    }
                })); **

        - With the transformedItems, I then have to use this data for my line_items that Stripe requires.  
            -E.g. Here I create my Checkout Session in test mode:

            try {
        
                const session = await stripeApi.checkout.sessions.create({
                    payment_method_types: ['card'],
                    mode: 'payment',
                    line_items: transformedItems,
                    customer_email: email,
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
    
<!-- webhook.js: -->

    - Webhook:
        - Intent: 

            - This file is intended to listen for events from Stripe API.  Specifically, when a Stripe Checkout Session is completed, the Webhook receives information from Stripe, then uses that information to run a function from my database (createOrder).

        - Flow:

            1) fulfillOrder:

                a) `fulfillOrder` is an asynchronous function that receives the Stripe Session Object as an argument, as well as an object from an expanded `listLineItems` that holds the data & metadata necessary to create an order.

                b) I define a synchronous function, `generateOrderItemsObjects`, which takes in the `listLineItems` as input.  This function creates new objects formatted to match the database schema I created in PostgreSQL.  The intent here is to create a dynamic order_item for each product that a User purchases.  

                    - What is returned is an array of objects

                c) The return of `fulfillOrder` yields the firing of the database function, `createOrder`, which receives an object formatted as such:

                    return createOrder( {
                        user_id: 1,
                        amount_total: Number( (session.amount_total / 100).toFixed(2) ),
                        currency: session.currency,
                        status: session.status,
                        created_at: require('moment')().format('YYYY-MM-DD HH:mm:ss'),
                        order_items: generateOrderItemsObjects(listLineItems),

                    })

            2) Webhook:

                a) On my defined /webhook route, I listen for a Stripe Checkout Session.

                b) When a session is detected, the switch statement engages, switching cases based on the event.type

                c) The variable, `lineItemsProductDataExpanded` is an asynchronous function that gathers the listLineItems that fulfillOrder needs to create an order.

                d) The return value of the 'checkout.session.completed' case is a call to fullfillOrder, which takes in the following inputs as such and ultimately concludes in the db function createOrder:

                    //Handle the Stripe events:
                        switch(event.type) {
                        /* Retrieve a Stripe Checkout session and its id: */
                            case 'checkout.session.completed':
                                const session = event.data.object;

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


        - Misc. Items:

            - E.g. An Example of expaning upon the Checkout Session Object and retrieving line_items:

                /* Retrieve my line_items */
                    const retrievedLineItems = await stripe.checkout.sessions.retrieve(
                        session.id, 
                        {
                            expand: ['line_items']
                        }
                    );