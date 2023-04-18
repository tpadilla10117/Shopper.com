import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Routes, Route, useLocation } from 'react-router-dom';
import {
	About,
	CheckoutPg,
	Footer,
	Footer2,
	Header,
	IndividualProductPg,
	Landing,
	MyAccountPg,
	OrderPg,
	PrivateRoutes,
	ProductsPg,
	SavedItemsPg,
	Signin,
	Spinner,
	SuccessPg,
} from './utils.js';

import { useDispatch, useSelector } from 'react-redux';
import { getProducts, selectItems, selectPage, selectLimit } from '../reduxslices/productSlice.js';
import { isLoading, setLoader } from '../reduxslices/loadingSlice.js';

import './App.scss';

function App() {
	const location = useLocation();
	const dispatch = useDispatch();
	const items = useSelector(selectItems);
	console.log("Items from the frontend: ",items )
	const loadStatus = useSelector(setLoader);
	const pageNumber = useSelector(selectPage);
	const limitNumber = useSelector(selectLimit);
	console.log("Page on the frontend: ", pageNumber);
	console.log("Limit on the frontend: ", limitNumber);

	useEffect(() => {
		if (items.length === 0 || null) {
			dispatch(isLoading(true));
			setTimeout(() => {
				dispatch(isLoading(false));
			}, 2000);
			dispatch(getProducts({ page: 1, limit: 5 }));

		} else {
			return;
		}
	}, [dispatch, items, pageNumber, limitNumber]);

/* TODO: need to debug this and make sure I re-fetch based on the route */

	/* useEffect(() => {
		switch (location.pathname) {
			case '/':
				dispatch(getProducts({ page: 1, limit: 5 }));
				break;
			case '/shop':
				dispatch(getProducts({ page: 2, limit: 5 }));
				break;
			default:
				break;
		}
		console.log("Here's the location: ", location.pathname)
	}, [dispatch, location.pathname]); */

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

			<Footer2 />
		</main>
	);
}

export default App;
