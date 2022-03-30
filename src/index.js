import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './frontend/components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './frontend/reduxglobalstore/Store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import reportWebVitals from './reportWebVitals';


/* Create a Stripe Promise: TODO: process.env not working for whatever reason */


/* const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY); */
const stripePromise = loadStripe("pk_test_51KepPXD7lX2ovvhcjTQAGgIsYzdaGEnKEYrKcbbfT4GXc29gwu6FrvlYZsdIEIDJLyFIlUBH3qxr0v6tWew3gN4a00mUeJLoOd")

/* console.log("Sample: ", process.env.stripe_publishable_key); */


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
      <ScrollToTop/>
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
