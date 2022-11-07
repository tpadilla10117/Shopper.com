import React, { useState, useEffect } from 'react';
import { Add, Remove } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
	addToBasket,
	removeFromBasket,
	selectItems,
} from '../../../reduxslices/basketslice.js';
import { selectItems as productsFromSlice } from '../../../reduxslices/productSlice.js';
import { useParams } from 'react-router-dom';
import './IndividualProductCards.scss';

function IndividualProductCards({
	id,
	title,
	description,
	price,
	category,
	subcategory,
	productid,
	image,
}) {
	const dispatch = useDispatch();
	const totalItemsInBasket = useSelector(selectItems);

	const addItemToBasket = () => {
		const product = {
			id,
			title,
			price,
			description,
			category,
			image,
			subcategory,
			productid,
		};
		dispatch(addToBasket(product));
	};

	const removeItemFromBasket = () => {
		dispatch(removeFromBasket({ id }));
	};

	/* Keep track of how many individual products a user wants to add to the cart */
	/* by using the productid from the route: */

	const productItems = useSelector(productsFromSlice);

	const { prodid } = useParams();
	const productBasedOnRoute = productItems.find(
		product => product.productid === prodid
	);

	const [productCount, setProductCount] = useState(0);

	useEffect(() => {
		setProductCount(
			totalItemsInBasket.filter(
				x => x.productid === productBasedOnRoute.productid
			).length
		);
	}, [totalItemsInBasket, productBasedOnRoute]);

	return (
		<div className='individualProductCards-wrapper'>
			<figure className='individualProductCards-img-container'>
				<img src={image} alt='' />
			</figure>

			<div className='individualProductCards-info-container'>
				<h1 className='individualProductCards-info-title'>{title}</h1>

				<p className='individualProductCards-info-description'>
					{description}
				</p>
				<span className='individualProductCards-info-price'>
					${price}
				</span>

				<div className='individualProductCards-info-quantity-container'>
					<div className='individualProductCards-info-quantity-totals'>
						{/* TODO: These buttons add to the cart incorrectly */}
						<Remove
							onClick={removeItemFromBasket}
							className='individualProductCards-removebtn'
						/>

						<span className='individualProductCards-info-quantity'>
							{productCount}
						</span>

						<Add
							onClick={addItemToBasket}
							className='individualProductCards-addbtn'
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default IndividualProductCards;
