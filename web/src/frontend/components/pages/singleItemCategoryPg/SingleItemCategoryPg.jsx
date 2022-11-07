/* This page renders out products of a single subcategory: */
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectItems } from '../../../reduxslices/productSlice.js';
import { ProductCards } from '../../utils.js';

function SingleItemCategoryPg() {
	const items = useSelector(selectItems);

	const { subcategory } = useParams();

	/* Filters out a subcategory based on requestparams: */
	const filteredItems = items.filter(
		targettedSubcategory => targettedSubcategory.subcategory === subcategory
	);

	return (
		<div>
			{filteredItems &&
				filteredItems.map(productCard => {
					return (
						<ProductCards
							id={productCard.id}
							key={productCard.id}
							title={productCard.title}
							description={productCard.description}
							productid={productCard.productid}
							image={productCard.image}
							category_id={productCard.category_id}
							subcategory={productCard.subcategory}
							price={productCard.price}
							created_at={productCard.created_at}
							quantity={1}
						/>
					);
				})}
		</div>
	);
}

export default SingleItemCategoryPg;
