<!-- Create Orders Flow: -->

1) Data is input as follows:
    {
        user_id: 1,
        amount_total: 109.95,
        currency: 'usd',
        status: 'completed',
        created_at: require('moment')().format('YYYY-MM-DD HH:mm:ss'),

<!-- /* These below come from redux: */ -->
        order_items: [
            {
                orders_id: null,
                product_id: 1,
                quantity: 1,
            },
            {
                orders_id: null,
                product_id: 2,
                quantity: 1,
            },
        ]
        
    },

2) In src/backend/orders.js:

    - a) The function 'createOrder' is run asynchronously with the inputs above.  This Data will in practice come from my webhook that fires via a completed Stripe Checkout Session.

    - b) Rows are created on the ordes table EXCEPT for the order_items array.

    - c) The order_items array has to be mutated to generate unique order_items.id KEYS.  This is done by looping through the order_items array and setting the orders_id on each element to the identifier (order.id), which is uniquely generated each order.

    - d) Once this is done, I await a promise to order.order_items, in which I use the mutated data-set (mutateOrdersId), to run a callback function (createOrderItems) on each element in the data-set.

3) In src/backend/order_items.js:

    - a) The callback function, createOrderItems, takes in an array of objects as an input.  (**The mutateOrdersId **).

    - b) I insert the appropriate data into the order_items table and returning everything.