import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './frontend/components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import reportWebVitals from './reportWebVitals';


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <ScrollToTop/>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
