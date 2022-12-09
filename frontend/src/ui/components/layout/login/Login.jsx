import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CtaButton } from '../../utils.js';
import { useDispatch, useSelector } from 'react-redux';
import { login, reduxStateObject } from '../../../reduxslices/authSlice.js';
import { clearErrMessage } from '../../../reduxslices/authSlice.js';
import { userData, loginErrorMessage } from '../../../reduxslices/authSlice.js';
import { retrieveUsersSavedItems } from '../../../reduxslices/savedItemsSlice.js';

function Login() {
	const reduxObject = useSelector(reduxStateObject);
	const dispatch = useDispatch();
	const navigateHome = useNavigate();
	const nameRef = useRef();
	const pwordRef = useRef();
	const user = useSelector(userData);
	const errorMsg = useSelector(loginErrorMessage);
	

	useEffect(() => {
		dispatch(clearErrMessage());
	}, [dispatch]);

	/* My login handler to dispatch into global store: */
	const handleLogin = event => {
		event.preventDefault();
		const username = nameRef.current?.value;
		const password = pwordRef.current?.value;
		dispatch(login({ username, password }));
	};

	/* Page Redirect when a user successfully logs in, & retrieve items: */
	useEffect(() => {
		if (reduxObject.auth.isLoggedIn === true) {
			dispatch(retrieveUsersSavedItems(user.recoveredData.id));
			return navigateHome('/');
		}
	}, [reduxObject, navigateHome, dispatch, user]);

	return (
		<section className='login-parent-container'>
			<form
				className='login-form-parent-container'
				onSubmit={handleLogin}
			>
				<div className='login-form-heading-wrapper'>
					<h1 className='login-form-h1'>Sign in to Shop</h1>
					<h3 className='login-form-h3'>
						Please sign in to your account
					</h3>
				</div>
				<div className='login-form-input-wrapper'>
					<input
						id='login-form-input-box-username'
						className='login-form-input-box'
						type='text'
						placeholder='Username'
						required
						ref={nameRef}
					/>
					<label htmlFor='login-form-input-box-username'></label>

					<input
						id='login-form-input-box-password'
						className='login-form-input-box'
						type='password'
						placeholder='Password'
						required
						ref={pwordRef}
					/>
					<label htmlFor='login-form-input-box-password'></label>

					<CtaButton text={'Sign in'} myClass={'signin-button'} />
				</div>

				{/* {errorMsg && ( */}
					{/* <div> */}
						<div className='login-form-alert-wrapper' role='alert'>
							<p>{errorMsg || ''}</p>
						</div>
					{/* </div> */}
				{/* )} */}

			</form>
		</section>
	);
}

export default Login;
