import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectUsersSavedItems,
	deleteAUsersSavedItem,
} from '../../../reduxslices/savedItemsSlice.js';

import { userData } from '../../../reduxslices/authSlice.js';

import { Favorite } from '@material-ui/icons';

function SavedItemsPg() {
	const dispatch = useDispatch();
	const user = useSelector(userData);
	const usersSavedItems = useSelector(selectUsersSavedItems);
	const navigateProductRoute = useNavigate();

	/* To remove saved_products: */
	function removeSavedItemHandler(event, product_id) {
		event.preventDefault();
		event.stopPropagation();
		const thunkArguments = {
			user_id: user.recoveredData.id,
			product_id: product_id,
		};

		dispatch(deleteAUsersSavedItem(thunkArguments));
	}

	/* To route a user to the IndividualProductPage.jsx: */
	function routeToProductPage(event, item) {
		event.preventDefault();
		const { subcategory, title, productid } = item;
		navigateProductRoute(
			`/shop/products/${subcategory}/${title}/${productid}`
		);
	}

	/* Below I render saved products : */
	return (
		<section className='saveditemspg-parent-container'>
			<h1 className='saveditemspg-title'>Saved Items</h1>
			<div className='saveditemspg-subtitle-wrapper'>
				<p className='saveditemspg-subtitle'>
					Miss something? Use this page to easily keep track of any
					items you like or wish to save for later.
				</p>
			</div>

			<div className='saveditemspg-information-parent-container'>
				{usersSavedItems &&
					usersSavedItems.map(items => {
						return (
							<div
								id={items.id}
								key={items.id}
								className='saveditemspg-saveditem-wrapper'
								onClick={event =>
									routeToProductPage(event, items)
								}
							>
								<img
									src={items.image}
									alt=''
									className='saveditemspg-img'
								/>
								<div className='saveditemspg-icon-parent-container'>
									<Favorite
										className='saveditemspg-favoriteborderoutlined'
										onClick={event =>
											removeSavedItemHandler(
												event,
												items.product_id
											)
										}
									/>
								</div>

								<div className='saveditemspg-information'>
									<p className='saveditemspg-itemtitle'>
										{items.title}
									</p>

									<h5 className='saveditemspg-itemprice'>
										${items.price}
									</h5>
								</div>
							</div>
						);
					})}
			</div>
		</section>
	);
}

export default SavedItemsPg;
