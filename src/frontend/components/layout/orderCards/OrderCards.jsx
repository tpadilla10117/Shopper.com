import React from 'react';

function OrderCards( { 
    orderDate, 
    amounttotal, 
    status,
    orderNumber
    } ) {
    
    return (
        <div className='ordercards-container'>

            <p>Order Placed On: {orderDate}</p>

            <p>Order Total: ${amounttotal} </p>

            <p>Status {status}</p>

            <p>Order Number {orderNumber}</p>

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