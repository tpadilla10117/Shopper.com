import React from 'react';
import { useParams } from 'react-router-dom';
import { IndividualProductCards } from '../../utils.js';
import { useSelector } from 'react-redux';
import { selectItems } from '../../../reduxslices/productSlice.js';

function IndividualProductPg() {
	const productItems = useSelector(selectItems);

	/* useParams returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path> :*/
	const { prodid } = useParams();
	const productBasedOnRoute = productItems.find(
		product => product.productid === prodid
	);

	return (
		<section className='individualProductPg-parent-container'>
			<IndividualProductCards
				id={productBasedOnRoute.id}
				title={productBasedOnRoute.title}
				price={productBasedOnRoute.price}
				category_id={productBasedOnRoute.category_id}
				subcategory={productBasedOnRoute.subcategory}
				productid={productBasedOnRoute.productid}
				description={productBasedOnRoute.description}
				image={productBasedOnRoute.image}
				quantity={1}
			/>
		</section>
	);
}

export default IndividualProductPg;
