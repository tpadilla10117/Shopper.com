<!-- StripeCheckout.js -->
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
                        productid: item.productid
                    }
                }
            }
        })); **

    - Webhook:
        - In order to run my db function, createOrder, I have to retrieve the line_items from my Stripe Session
            - the productid exists in the metadata field