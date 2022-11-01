import React from 'react';

function OrderCards( { 
    orderDate, 
    amounttotal, 
    status,
    userId,
    shippingstreet

    } ) {
    console.log(orderDate)
    return (
        <div className='ordercards-container'>

            <p>Order Placed On: {orderDate}</p>

            <p>Order Total: ${amounttotal} </p>

            <p>Status</p>

            <p>Order Number</p>

            {/* TODO: Shipment Number */}

            {/* <p>Shipping Address:
                {shippingstreet}

            </p> */}


            {/* TODO: Product */}

            {/* TODO: PRoduct Image */}

            
        </div>
    )
}

export default OrderCards;