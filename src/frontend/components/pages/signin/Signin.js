/* The Pg that renders when on the /signin route: */
    import React from 'react';
    import { LandingLogin } from '../../utils';
    import './Signin.scss';
    
    const Signin = () => {

        return (
            <section className='signin-parent-container'>

                <LandingLogin />

            </section>
        )
    }

    export default Signin;