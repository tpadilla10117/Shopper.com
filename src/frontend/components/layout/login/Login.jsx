import React, { useRef, useEffect } from 'react';
import { CtaButton } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../reduxslices/authSlice';
import { clearMessage } from '../../../reduxslices/authmessageSlice';
import cabana from '../../../assets/images/cabana.jpg';

function Login() {
  
  const { message } = useSelector( (state) => state.message);

  const dispatch = useDispatch();
  const nameRef = useRef();
  const pwordRef = useRef();

  useEffect( () => {
    dispatch(clearMessage());
  }, [dispatch]);

/* My login handler to dispatch into global store: */
  const handleLogin = (event) => {
    event.preventDefault();
    const username = nameRef.current?.value;
    const password = pwordRef.current?.value;
    dispatch(login( { username, password }))
  };
  
  return (
    <section className='login-parent-container'>
{/* TODO: add in the img overlay*/}

      {/* <img className='login-bg-img' src={cabana} alt='A cabana along a beach'></img>
 */}
    {/* TODO: form needs an onSubmit event handler */}
      <form /* ref={formRef} */ className="login-form-parent-container" onSubmit={handleLogin}>
        <h1 className='login-form-h1'>Sign in to Shop</h1>
        <h3 className='login-form-h3'>Please sign in to your account</h3>
        <div className='login-form-input-wrapper'> {/* TODO: Inputs need onChange events to capture entered value */}
          <input className="login-form-input-box" type="text" placeholder="Username" required ref={nameRef}/>

          <input className="login-form-input-box" type="text" placeholder="Password" required ref={pwordRef}/>

          <CtaButton text={'Sign in'} myClass={'signin-button'} />
          {/* <CtaButton text={'Sign out'} myClass={"signout-button"} onClick={logOut}/> */}

        </div>
        
        {message && (
          <div>
            <div className='alert alert-danger' role='alert'>
              {message}
            </div>
          </div>
        )}

      </form>


    </section>
  );
};

export default Login;
