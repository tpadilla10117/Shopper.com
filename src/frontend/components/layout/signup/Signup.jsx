/* This component is for a Signup form: */
    import React, {useRef, useEffect} from 'react';
    import { CtaButton } from '../../utils';
    import { useDispatch, useSelector } from 'react-redux';
    import { register } from '../../../reduxslices/authSlice';
    import { clearMessage } from '../../../reduxslices/authmessageSlice';
    
    function Signup() {
        const usernameRef = useRef();
        const pwordRef = useRef();
        const firstnameRef = useRef();
        const lastnameRef = useRef();
        const emailRef = useRef();

        const dispatch = useDispatch();

    /* My register hanldler to dispatch into global store: */
        const handleRegister = (event) => {
            event.preventDefault();
            const username = usernameRef.current?.value;
            const password = pwordRef.current?.value;
            const firstname = firstnameRef.current?.value;
            const lastname = lastnameRef.current?.value;
            const email = emailRef.current?.value;
            const image = "";
            const isAdmin = false;
            const location = "";
            const active = true;

            dispatch(register( {
                username,
                password,
                firstname,
                lastname,
                email,
                image,
                isAdmin,
                location,
                active
            }))
        }

       /*  username, email, password, firstname, lastname, isAdmin, imgURL, location, active */
      return (
        <section className='signup-parent-container'>
            <form 
            onSubmit={handleRegister}
            className='signup-form-parent-container'>
                <h1 className='signup-form-h1'>Welcome to Shopper</h1>
                <h3 className='signup-form-h3'>It looks like you're new here, we need a bit more infor to create your new account</h3>
                <div className='signup-form-input-wrapper'>
                    <input className="signup-form-input-box" type="text" placeholder="Username" required ref={usernameRef}/>

                    <input className="signup-form-input-box" type="text" placeholder="First Name" required ref={firstnameRef}/>

                    <input className="signup-form-input-box" type="text" placeholder="Last Name" required ref={lastnameRef}/>

                    <input
                    className='signup-form-input-box'
                    type="text" placeholder='Email Address'
                    required
                    ref={emailRef}
                    />

                    <input className="signup-form-input-box" type="text" placeholder="Enter a Password" required ref={pwordRef}/>

                    <CtaButton text={'Continue'}
                    myClass={'signup-button'}
                    />

                </div>

            </form>

        </section>
      );
    };
    
    export default Signup;