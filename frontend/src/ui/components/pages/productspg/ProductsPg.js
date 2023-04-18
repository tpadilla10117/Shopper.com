/* This page distinguishes renders between single product subcategories and all products: */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
/* import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProducts, selectItems, selectPage, selectLimit } from '../../../reduxslices/productSlice.js'; */
import { ItemCategoriesPreviewPg, SingleItemCategoryPg } from '../../utils.js';

const ProductsPg = () => {
	/* const dispatch = useDispatch();
	const items = useSelector(selectItems);
	console.log("Items from the frontend: ",items )
	const pageNumber = useSelector(selectPage);
	const limitNumber = useSelector(selectLimit);
	console.log("Page on the frontend: ", pageNumber);
	console.log("Limit on the frontend: ", limitNumber); */

	/* useEffect(() => {
		dispatch(getProducts({ page: pageNumber, limit: limitNumber }));
	  }, [dispatch, pageNumber, limitNumber]); */

	return (
		<section className='productspg-parent-container'>
			{/* <button onClick={() => dispatch(getProducts({ page: pageNumber + 1, limitNumber }))}>Next Page</button> */}
			<Routes>
				<Route index element={<ItemCategoriesPreviewPg />} />
				<Route
					path='products/:subcategory'
					element={<SingleItemCategoryPg />}
				/>
			</Routes>
		</section>
	);
};

export default ProductsPg;
