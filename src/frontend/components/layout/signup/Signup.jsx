/* This component is for a Signup form: */
    import React, {useRef} from 'react';
    import { CtaButton } from '../../utils';
    import { useDispatch } from 'react-redux';
    import { register } from '../../../reduxslices/authSlice';
    
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
            const firstname = firstnameRef.current?.value;
            const lastname = lastnameRef.current?.value;
            const email = emailRef.current?.value;
            const password = pwordRef.current?.value;
            const image = "";
            const isAdmin = 'false';
            const location = "Place";
            const active = 'true';


            dispatch(register( {
                username,
                firstname,
                lastname,
                email,
                password,
                image,
                isAdmin,
                location,
                active
            }))
        }

      return (
        <section className='signup-parent-container'>
            <form 
                onSubmit={handleRegister}
                className='signup-form-parent-container'
            >
                <h1 
                    className='signup-form-h1'
                >Welcome to Shopper
                </h1>
                <h3 
                    className='signup-form-h3'
                >It looks like you're new here, we need a bit more info to create your new account
                </h3>
                <div className='signup-form-input-wrapper'>
                    <input 
                        id='signup-form-input-box-username'
                        className="signup-form-input-box" type="text" 
                        placeholder="Username" 
                        required 
                        ref={usernameRef}
                    />
                    <label htmlFor='signup-form-input-box-username'></label>

                    <input 
                        id='signup-form-input-box-firstname'
                        className="signup-form-input-box" type="text" 
                        placeholder="First Name" 
                        required 
                        ref={firstnameRef}
                    />
                    <label htmlFor='signup-form-input-box-firstname'></label>

                    <input 
                        id='signup-form-input-box-lastname'
                        className="signup-form-input-box" type="text" 
                        placeholder="Last Name" 
                        required 
                        ref={lastnameRef}
                    />
                    <label htmlFor='signup-form-input-box-lastname'></label>

                    <input
                        id='signup-form-input-box-email'
                        className='signup-form-input-box'
                        type="text" 
                        placeholder='Email Address'
                        required
                        ref={emailRef}
                    />
                    <label htmlFor='signup-form-input-box-email'></label>

                    <input 
                        id='signup-form-input-box-emailpassword'
                        className="signup-form-input-box" type="text" 
                        placeholder="Enter a Password" 
                        required 
                        ref={pwordRef}
                    />
                    <label htmlFor='signup-form-input-box-emailpassword'></label>

                    <CtaButton text={'Continue'}
                    myClass={'signup-button'}
                    />

                </div>

            </form>

        </section>
      );
    };
    
    export default Signup;