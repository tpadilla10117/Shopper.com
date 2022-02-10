import React from 'react';
import { CSSTransition } from 'react-transition-group';
import {Header} from './utils';
import './App.scss';


function App() {
  return (
    <div className="App">
      <CSSTransition timeout={300}>
        <Header />
      </CSSTransition>



    </div>
  );
}

export default App;
