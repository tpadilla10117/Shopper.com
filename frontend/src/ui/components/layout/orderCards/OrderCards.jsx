import React from 'react';

function OrderCards({ orderDate, amounttotal, status, orderNumber }) {
	return (
		<div className='ordercards-container'>
			<div className='ordercards-ordertotals-container'>
				<p>Order Placed On: {orderDate}</p>
				<p>Order Total: ${amounttotal} </p>
			</div>

			<div className='ordercards-orderstatus-container'>
				<p>Status {status}</p>
				<p>Order Number {orderNumber}</p>
			</div>

			<div className='ordercards-orderdetails-container'>
				<button className='ordercards-orderdetails-btn' type='button'>
					VIEW ORDER DETAILS
				</button>
			</div>

			{/* TODO: Shipment Number */}

			{/* <p>Shipping Address:
                {shippingstreet}

            </p> */}

			{/* TODO: Product */}

			{/* TODO: PRoduct Image */}
		</div>
	);
}

export default OrderCards;
