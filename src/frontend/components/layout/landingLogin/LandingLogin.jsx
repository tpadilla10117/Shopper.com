/* TODO: This component handles the login functionality for users: */

    import React, { useEffect, useState } from 'react';
    import './LandingLogin.scss';
    import { useDispatch, useSelector} from 'react-redux';
    import { handleModalVisibility } from '../../../reduxslices/modalSlice';
    import { Modal } from '../../utils';
   
    import axios from 'axios';

    const BASE ='http://localhost:3000/api';

    function storeCurrentToken(token) {
        localStorage.setItem('token', JSON.stringify(token));
    };

    const LandingLogin = () => {
        const dispatch = useDispatch();

        const modalToggle = () => {
            dispatch(handleModalVisibility())
            console.log('clicked');
        };

        const modalIsToggled = useSelector(state => state.modal.modalVisibility);
        console.log("Is the modal toggled? : ", useSelector(state => state.modal.modalVisibility));

    /* const [ password, setPassword ] = useState(''); */
 

    return (
        <section id='landing-login-parent-container'>
            <h1 className='landing-login-h1'>Welcome to Shop</h1>
            <h3 className='landing-login-h3'>Join Shop today.</h3>
            
            <button className='mobile-signup-button'>Sign up with email</button>
            <p className='login-forgotpassword'>
                Already have an account? <button className='mobile-signin-button' onClick={modalToggle}>Sign in</button>
            </p>



    {/* The modal appears when clicking 'mobile-signin-button: */}

        {modalIsToggled && 
            <Modal />
        
        }


        </section>
    );
    };

    export default LandingLogin;