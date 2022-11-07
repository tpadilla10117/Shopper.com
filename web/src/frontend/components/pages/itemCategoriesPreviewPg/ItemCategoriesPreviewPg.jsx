/* This component renders containers (ItemCollectionPreview) that hold <ProductCards/> organized by category: */
import React from 'react';
import { useSelector } from 'react-redux';
import { selectItems } from '../../../reduxslices/productSlice.js';
import { ItemCollectionPreview } from '../../utils.js';

function ItemCategoriesPreviewPg() {
	const items = useSelector(selectItems);

	/* This filters out unique categories based on the 'subcategory' property in each object: */
	function filterItemCategories(items) {
		let uniqueCategories = items
			.map(item => item.subcategory)
			.filter((value, index, self) => self.indexOf(value) === index);

		return uniqueCategories;
	}

	const itemCategories = filterItemCategories(items);

	return (
		<div>
			{items &&
				itemCategories.map((category, index) => {
					return (
						<ItemCollectionPreview key={index} title={category} />
					);
				})}
		</div>
	);
}

export default ItemCategoriesPreviewPg;
