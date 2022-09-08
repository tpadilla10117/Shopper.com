import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CtaButton } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { login, reduxStateObject } from '../../../reduxslices/authSlice';
import { clearMessage } from '../../../reduxslices/authmessageSlice';
import { userData } from '../../../reduxslices/authSlice';
import { 
  retrieveUsersSavedItems, 
} from '../../../reduxslices/savedItemsSlice';

function Login() {
  
  const { message } = useSelector( (state) => state.message);
  const reduxObject = useSelector(reduxStateObject);
  const dispatch = useDispatch();
  const navigateHome = useNavigate();
  const nameRef = useRef();
  const pwordRef = useRef();
  const user = useSelector(userData);

  useEffect( () => {
    dispatch(clearMessage());
  }, [dispatch]);

/* My login handler to dispatch into global store: */
  const handleLogin = (event) => {
    event.preventDefault();
    const username = nameRef.current?.value;
    const password = pwordRef.current?.value;
    dispatch(login( { username, password }));
  };

/* Page Redirect when a user successfully logs in, & retrieve items: */
  useEffect( () => {
    if(reduxObject.auth.isLoggedIn === true) {
      dispatch(retrieveUsersSavedItems(user.recoveredData.id))
      return navigateHome('/');
    } 
  }, [reduxObject, navigateHome, dispatch, user])
  
  return (
    <section className='login-parent-container'>    
      <form 
        className="login-form-parent-container" 
        onSubmit={handleLogin}
      >
        <h1 className='login-form-h1'>Sign in to Shop</h1>
        <h3 className='login-form-h3'>Please sign in to your account</h3>
        <div className='login-form-input-wrapper'> 

          <input 
            id='login-form-input-box-username'
            className="login-form-input-box" 
            type="text" 
            placeholder="Username" 
            required 
            ref={nameRef}
          />
          <label htmlFor='login-form-input-box-username'></label>

          <input 
            id='login-form-input-box-password'
            className="login-form-input-box" 
            type="text" 
            placeholder="Password" 
            required 
            ref={pwordRef}
          />
          <label htmlFor='login-form-input-box-password'></label>

          <CtaButton text={'Sign in'} myClass={'signin-button'} />

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
