import React from 'react';
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
  IndividualProductPg
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
      
        <Route path='/signin' element={<Signin />}/>
      
        <Route path='/shop/*' element={<ProductsPg/>}/>
      
      {/* TODO: NEEDS TO BE DYNAMIC BASED ON UNIQUE productid eg. 93813718290 */}

        <Route path={`/shop/products/:prodid`} 
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
