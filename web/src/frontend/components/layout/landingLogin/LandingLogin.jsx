/* TODO: This component handles the login functionality for users: */

import React from 'react';
import './LandingLogin.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
	handleModalVisibility,
	handleSignUpModalVisibility,
} from '../../../reduxslices/modalSlice.js';
import { Modal, SignupModal, Login, Signup } from '../../utils.js';

const LandingLogin = () => {
	const dispatch = useDispatch();

	const modalToggle = () => {
		dispatch(handleModalVisibility());
	};

	const signUpModalToggle = () => {
		dispatch(handleSignUpModalVisibility());
	};

	const signInHandler = () => {
		modalToggle();
	};

	const signUpHandler = () => {
		signUpModalToggle();
	};

	/* Toggler for Signin Modal: */
	const modalIsToggled = useSelector(state => state.modal.modalVisibility);

	/* Toggler for Signup Modal: */
	const signUpModalIsToggled = useSelector(
		state => state.modal.signUpModalVisibility
	);

	return (
		<section id='landing-login-parent-container'>
			<h1 className='landing-login-h1'>Welcome to Shop</h1>
			<h3 className='landing-login-h3'>Join Shop today.</h3>

			<button onClick={signUpHandler} className='mobile-signup-button'>
				Sign up with email
			</button>
			<p className='login-forgotpassword'>
				Already have an account?{' '}
				<button
					className='mobile-signin-button'
					onClick={signInHandler}
				>
					Sign in
				</button>
			</p>

			{/* The modal appears when clicking 'mobile-signin-button: */}

			{modalIsToggled && (
				<Modal>
					<Login />
				</Modal>
			)}

			{signUpModalIsToggled && (
				<SignupModal>
					<Signup />
				</SignupModal>
			)}
		</section>
	);
};

export default LandingLogin;
