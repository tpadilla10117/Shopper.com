import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Routes, Route } from 'react-router-dom';
import {
  Header, 
  Landing,
  About,
  Signin,
  CheckoutPg,
  ProductsPg,
  OrderPg,
  SuccessPg,
  Footer,
  IndividualProductPg,
  Spinner
} from './utils';

import { useDispatch, useSelector } from 'react-redux';
import { getProducts, selectItems } from '../reduxslices/productSlice';
import { isLoading, setLoader } from '../reduxslices/loadingSlice';

import './App.scss';


function App() {

/* Server-Side render of my product data: */
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const loadStatus = useSelector(setLoader)

  useEffect(() => {

    if(items.length === 0 ) {
      dispatch(isLoading(true))
      setTimeout(() => {
        dispatch(isLoading(false))
      }, 2000);
      dispatch(getProducts());
      
    } else {
      return;
    }
  
  },[dispatch, items])

/* My Loading Spinner: */
  if(loadStatus) return <Spinner />

  return (
    <main className="App">
      <CSSTransition timeout={300}>
        <Header />
      </CSSTransition>
      
      <Routes>
        <Route path='/' element={<Landing />}/>
      
        <Route path='/about' element={<About />}/>
      
        <Route path='/signin' element={<Signin />}/>
      
        <Route path='/shop/*' element={<ProductsPg/>}/>
      
      {/* TODO: NEEDS TO BE DYNAMIC BASED ON UNIQUE subcategory and productid eg. hats/93813718290 */}

       {/*  <Route path={`/shop/products/:prodid`} 
            element={
              <IndividualProductPg/>
            } 
        /> */}
        <Route path={`/shop/products/:subcategory/:prodid`} 
            element={
              <IndividualProductPg/>
            } 
        />
         

{/* TODO: Need to setup in db prior to finishing */}
      
        <Route path='/orders' element={<OrderPg />}/>
      
        <Route path='/success' element={<SuccessPg />} />
      
        <Route path='/checkout' element={<CheckoutPg/>}/>
      </Routes>

      <Footer />


    </main>
  );
}

export default App;
