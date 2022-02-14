/* TODO: This component handles the login functionality for users: */

    import React, { useEffect, useState } from 'react';
    import axios from 'axios';

    const BASE ='http://localhost:3000/api';

    function storeCurrentToken(token) {
        localStorage.setItem('token', JSON.stringify(token));
    };

    const Login = () => {

    /* const [ password, setPassword ] = useState(''); */
    

    return (
        <section id='login-parent-container'>
            
            <form className='login-form'>
                <input type='text' placeholder='Enter Your Username' /* value={} onChange={} *//>
                <input type='text' placeholder='Enter Your Password' /* value={} onChange={} *//>

                <button className='primary-btn'>Sign in</button>
                <p className='login-forgotpassword'>
                    <a href=''>Forgot Password?</a>
                </p>

                <button className='secondary-btn'>Create An Account</button>
            </form>
            
        </section>
    );
    };

    export default Login;