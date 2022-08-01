import React from 'react';

function OrderCards( { 
    orderDate, 
    amounttotal, 
    status,
    userId,
    shippingstreet

    } ) {
    
    return (
        <div>

            <p>ORDER PLACED: {orderDate}</p>
            {/* TODO: Order Number */}

            {/* TODO: Shipment Number */}

            <p>Shipping Address:
                {shippingstreet}

            </p>

            <p>ORDER TOTAL: ${amounttotal} </p>

            {/* TODO: Product */}

            {/* TODO: PRoduct Image */}

            
        </div>
    )
}

export default OrderCards;

/* Server-Side retrieval of my order data: */
/* export async function getServerSideprops(context) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    
} */