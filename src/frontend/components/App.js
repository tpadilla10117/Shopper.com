import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Routes, Route } from 'react-router-dom';
import {
  Header, 
  Login,
  Landing,
  Signin,
} from './utils';
import './App.scss';


function App() {
  return (
    <main className="App">
      <CSSTransition timeout={300}>
        <Header />
      </CSSTransition>
      
      {/* <Routes>
        <Route path='/' element={<Landing />}/>

        <Route path='/signin' element={<Signin />} />



      </Routes> */}
      {/* <Landing /> */}
    
      


    </main>
  );
}

export default App;
