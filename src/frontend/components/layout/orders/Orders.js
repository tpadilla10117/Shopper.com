import React from 'react'

function Orders() {
  return (
    <section>
        <div>
            <div>
                <p>
                    ORDER PLACED
                </p>
            {/* TODO: Where I'll use moment library for timestamp on the order: */}
                <p>

                </p>
            </div>

            <div>
                <p>TOTAL</p>
            {/* TODO: Need to import the total of the order: */}
                <p>

                </p>
            </div>
        {/* TODO: Amount of items and order #: */}
            <p>__items</p>
            <p>Order # _</p>

        </div>
    </section>
  )
}

export default Orders;

/* Server-Side retrieval of my order data: */
/* export async function getServerSideprops(context) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    
} */