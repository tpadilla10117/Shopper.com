import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './ui/components/App.js';
import { BrowserRouter as Router } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './ui/reduxglobalstore/Store.js';
import { persistStore } from 'redux-persist';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import reportWebVitals from './reportWebVitals.js';

import { PersistGate } from 'redux-persist/lib/integration/react';

/* Create a Stripe Promise:*/

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

let persistor = persistStore(store);

/* Redux Logic: */
/*
  1) Passed reducers to Redux 'configureStore' function, which returns a 'store' object
  2) Pass 'store' object to the react-redux 'Provider' component, rendered on top of component tree
  3) -> any time I connect to Redux via react-redux connect, the store is available to my nested components

  */

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<ScrollToTop />
				<PersistGate Loading={null} persistor={persistor}>
					<Elements stripe={stripePromise}>
						<App />
					</Elements>
				</PersistGate>
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
