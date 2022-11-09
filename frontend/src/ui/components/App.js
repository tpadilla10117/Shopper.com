import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Routes, Route } from 'react-router-dom';
import {
	Header,
	Landing,
	About,
	Signin,
	MyAccountPg,
	SavedItemsPg,
	CheckoutPg,
	ProductsPg,
	OrderPg,
	SuccessPg,
	Footer,
	IndividualProductPg,
	Spinner,
	PrivateRoutes,
} from './utils.js';

import { useDispatch, useSelector } from 'react-redux';
import { getProducts, selectItems } from '../reduxslices/productSlice.js';
import { isLoading, setLoader } from '../reduxslices/loadingSlice.js';

import './App.scss';

function App() {
	
	const dispatch = useDispatch();
	const items = useSelector(selectItems);
	const loadStatus = useSelector(setLoader);

	useEffect(() => {
		if (items.length === 0 || null) {
			dispatch(isLoading(true));
			setTimeout(() => {
				dispatch(isLoading(false));
			}, 2000);
			dispatch(getProducts());
		} else {
			return;
		}
	}, [dispatch, items]);

	/* My Loading Spinner: */
	if (loadStatus) return <Spinner />;

	return (
		<main className='App'>
			<CSSTransition timeout={300}>
				<Header />
			</CSSTransition>

			<Routes>
				<Route path='/' element={<Landing />} />

				<Route path='/about' element={<About />} />

				<Route path='/signin' element={<Signin />} />

				<Route path='/shop/*' element={<ProductsPg />} />

			{/* Routing is unique based on params from ProductsLandingFeed.jsx: */}
				<Route
					path={`/shop/products/:subcategory/:title/:prodid`}
					element={<IndividualProductPg />}
				/>

			{/* Protected / Authenticated Routes: */}

				<Route element={<PrivateRoutes />}>
					<Route path='/orders/:userid' element={<OrderPg />} exact />
					<Route path='/my-account' element={<MyAccountPg />} />
					<Route
						path='/my-account/saved-items'
						element={<SavedItemsPg />}
					/>
				</Route>

				<Route path='/success' element={<SuccessPg />} />

				<Route path='/checkout' element={<CheckoutPg />} />
			</Routes>

			<Footer />
		</main>
	);
}

export default App;
