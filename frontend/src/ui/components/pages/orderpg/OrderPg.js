/* This is the page to display a user's orders: */
import React, { useEffect } from 'react';
import { OrderCards } from '../../utils.js';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectUsersOrders,
	getAUsersOrders,
} from '../../../reduxslices/ordersSlice.js';
import { emptyUsersOrderItems } from '../../../reduxslices/ordersSlice.js';
import { userData } from '../../../reduxslices/authSlice.js';

function OrderPg() {
	/* Dispatch async request from the Thunk: */
	const dispatch = useDispatch();
	const user = useSelector(userData);
	const usersOrderItems = useSelector(selectUsersOrders);

	/* TODO: need to update the page when a new item is added */
	useEffect(() => {
		if (usersOrderItems.length === 0) {
			dispatch(getAUsersOrders(user.recoveredData.id));
			/* console.log('From the useEffect:', usersOrderItems); */
		};

		return;
	}, [dispatch, usersOrderItems, user]);

	return (
		<section className='orderpg-parent-wrapper'>
			<h1 className='orderpg-h1'>Orders & Returns</h1>

			<p className='orderpg-subheading'>
				Tracking. Details. Returns. View all of your order information
				here.
			</p>

			<div className='ordercards-parent-wrapper'>
				{usersOrderItems &&
					usersOrderItems.map(orderCard => {
						return (
							<OrderCards
								key={orderCard.id}
								orderNumber={orderCard.id}
								orderDate={orderCard.created_at}
								amounttotal={orderCard.amount_total}
								status={orderCard.status}
								userId={orderCard.user_id}
								currency={orderCard.currency}
								order_items={orderCard.order_items}

								/* TODO: Where will i get this info? */
								/*  shippingstreet={orderCard.shippingstreet}
                    shippingstreet2={orderCard.shippingstreet2}
                    shippingzip={orderCard.shippingzip}
                    shippingcity={orderCard.shippingcity}
                    shippingcountry={orderCard.shippingcountry}
                    shippingstate={orderCard.shippingstate} */
							/>
						);
					})}
			</div>
		</section>
	);
}

export default OrderPg;
