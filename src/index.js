import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './frontend/components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './frontend/reduxglobalstore/Store';
import reportWebVitals from './reportWebVitals';


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/* Redux Logic: */
  /* 
  1) Passed reducers to Redux 'configureStore' function, which returns a 'store' object
  2) Pass 'store' object to the react-reduc 'Provider' component, rendered on top of component tree
  3) -> any time I connect to Redux via react-redux connect, the store is available to my nested components
  
  */

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
      <ScrollToTop/>
          <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
