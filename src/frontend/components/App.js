import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  Header, 
  Login,
  Landing,
  About,
  Cart,
  Signin,
  LandingLogin,
  CheckoutPg,
  ProductsPg,
  OrderPg
} from './utils';
import './App.scss';


function App() {
  return (
    <main className="App">
      <CSSTransition timeout={300}>
        <Header />
      </CSSTransition>
      
      <Routes>
        <Route path='/' element={<Landing />}/>
      
        <Route path='/about' element={<About />}/>
      
        {/* <Route path='/cart' element={<Cart />} /> */}
        {/* <Route exact path='/cart'>
          <Navigate to='/cart' />
        </Route> */}
      
        <Route path='/signin' element={<Signin />}/>
      
        <Route path='/products' element={<ProductsPg/>}/>
      

{/* TODO: Need to setup in db prior to finishing */}
      
        <Route path='orders' element={<OrderPg />}/>
      

      
        <Route path='/checkout' element={<CheckoutPg/>}/>
      </Routes>


    </main>
  );
}

export default App;
