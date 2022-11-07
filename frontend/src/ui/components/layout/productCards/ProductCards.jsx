import React from 'react';
/* import { CtaButton } from '../../utils'; */
import CurrencyFormat from 'react-currency-format';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCartItemCount } from '../../../reduxslices/basketslice.js';
import { userData } from '../../../reduxslices/authSlice.js';
import { addASavedItem } from '../../../reduxslices/savedItemsSlice.js';
import {
	selectUsersSavedItems,
	deleteAUsersSavedItem,
} from '../../../reduxslices/savedItemsSlice.js';
import { Favorite } from '@material-ui/icons';

function ProductCards({
	id,
	title,
	description,
	productid,
	image,
	category_id,
	subcategory,
	price,
	quantity,
}) {
	const dispatch = useDispatch();
	const user = useSelector(userData);
	const usersSavedItems = useSelector(selectUsersSavedItems);
	let navigateProductRoute = useNavigate();

	const addItemToBasket = () => {
		const product = {
			id,
			title,
			description,
			productid,
			image,
			category_id,
			subcategory,
			price,
			quantity,
		};
		dispatch(addCartItemCount(product));
	};

	/* Navigates a user to a product page:  */
	function productNavigationHandler(event, productid) {
		event.preventDefault();
		navigateProductRoute(
			`/shop/products/${subcategory}/${title}/${productid}`
		);
	}

	/* Lets a user save a product for later: */
	function addItemToSavedProducts(event, product_id) {
		event.preventDefault();

		if (user === null || !user.token) {
			navigateProductRoute('/signin');
		} else {
			const productObject = {
				user_id: user.recoveredData.id,
				product_id: product_id,
			};
			dispatch(addASavedItem(productObject));
		}
	}

	/* To remove saved_products: */
	function removeSavedItemHandler(event, product_id) {
		event.preventDefault();

		const thunkArguments = {
			user_id: user.recoveredData.id,
			product_id: product_id,
		};
		dispatch(deleteAUsersSavedItem(thunkArguments));
	}

	function filterOutAUsersItemHelper(productid) {
		let saved = usersSavedItems.filter(
			item => item.product_id === productid
		);
		return saved;
	}

	/* TODO: Need to conditionally check the heart icon and save / remove */
	/* Allows a User to save an item / remove an item : */
	function savedItemToggler(event, productid) {
		event.preventDefault();
		event.stopPropagation();

		let filteredId = filterOutAUsersItemHelper(productid);

		if (filteredId.length === 0) {
			addItemToSavedProducts(event, productid);
		} else if (
			user.recoveredData.id &&
			filteredId[0].product_id === productid
		) {
			removeSavedItemHandler(event, productid);
		} else if (user === null || !user.token) {
			navigateProductRoute('/signin');
		}
	}

	return (
		<div
			className='productcard-parent-container'
			key={id}
			onClick={event => productNavigationHandler(event, productid)}
		>
			<figure className='productcard-img-wrapper'>
				<img src={image} className='productcard-img' alt={title} />
			</figure>

			<div className='productcard-icon-parent-container'>
				<Favorite
					className={`productcard-favoriteborderoutlined`}
					onClick={event => savedItemToggler(event, id)}
				/>
			</div>

			<div className='productcard-details-wrapper'>
				<h4 className='productcard-title'>{title}</h4>
				{/* <p className='productcard-description'>{description}</p> */}

				<div className='productcard-price-wrapper'>
					<CurrencyFormat
						value={price}
						displayType={'text'}
						thousandSeparator={true}
						prefix={'$'}
						className='productcard-price'
					/>
				</div>
			</div>

			{/* TODO: Dont delete this YET - need to test an add to cart via clicking a product card first*/}

			{/* <CtaButton className={'productcard-button'} text={"Add to Cart"} onClick={addItemToBasket}/> */}
		</div>
	);
}

export default ProductCards;
