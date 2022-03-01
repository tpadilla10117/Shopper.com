import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Routes, Route } from 'react-router-dom';
import {
  Header, 
  Login,
  Landing,
  About,
  Cart,
  Signin,
  LandingLogin,
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
      </Routes>
      
      <Routes>
        <Route path='/about' element={<About />}/>
      </Routes>

      <Routes>
        <Route path='/cart' element={<Cart />} />
      </Routes>

      <Routes>
        <Route path='/signin' element={<Signin />}/>
      </Routes>


    </main>
  );
}

export default App;
