import React, { useRef } from 'react';
import { CtaButton } from '../../utils';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import cabana from '../../../assets/images/cabana.jpg';

function Login() {

  const formRef = useRef();

  /* const loginHandler = async(event) => {

    try {
      event.PreventDefault();
      const response = await axios.post(`/api/users/login`, {username, password});


    } catch (error) {
      console.log(error);
    }
  }; */

  return (
    <section className='login-parent-container'>
{/* TODO: add in the img overlay*/}

      {/* <img className='login-bg-img' src={cabana} alt='A cabana along a beach'></img>
 */}
    {/* TODO: form needs an onSubmit event handler */}
      <form ref={formRef} className="login-form-parent-container">
        <h1 className='login-form-h1'>Sign in to Shop</h1>
        <h3 className='login-form-h3'>Please sign in to your account</h3>
        <div className='login-form-input-wrapper'> {/* TODO: Inputs need onChange events to capture entered value */}
          <input className="login-form-input-box" type="text" placeholder="Username" required/>

          <input className="login-form-input-box" type="text" placeholder="Password" required/>

          <CtaButton text={'Sign in'} />

        </div>

      </form>


    </section>
  );
};

export default Login;
