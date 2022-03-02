/* TODO: This component handles the login functionality for users: */

    import React from 'react';
    import './LandingLogin.scss';
    import { useDispatch, useSelector} from 'react-redux';
    import { handleModalVisibility, handleSignUpModalVisibility } from '../../../reduxslices/modalSlice';
    import { Modal, Login } from '../../utils';

    /* function storeCurrentToken(token) {
        localStorage.setItem('token', JSON.stringify(token));
    }; */

    const LandingLogin = () => {
        const dispatch = useDispatch();

        const modalToggle = () => {
            dispatch(handleModalVisibility())
            /* console.log('clicked'); */
        };

        const signUpModalToggle = () => {
            dispatch(handleSignUpModalVisibility())
        };


        const signInHandler = () => {
            modalToggle();
            /* console.log("I clicked sign in!"); */
        };

        const signUpHandler = () => {
            signUpModalToggle();
        };

    /* Toggler for Signin Modal: */
        const modalIsToggled = useSelector(state => state.modal.modalVisibility);
        
    /* Toggler for Signup Modal: */
        const signUpModalIsToggled = useSelector(state => state.modal.signUpModalVisibility);

    /* const [ password, setPassword ] = useState(''); */
 

    return (
        <section id='landing-login-parent-container'>
            <h1 className='landing-login-h1'>Welcome to Shop</h1>
            <h3 className='landing-login-h3'>Join Shop today.</h3>
            
            <button 
            onClick={signUpHandler}
            className='mobile-signup-button'>Sign up with email</button>
            <p className='login-forgotpassword'>
                Already have an account? <button className='mobile-signin-button' onClick={signInHandler}>Sign in</button>
            </p>


        {/* TODO: Need to finish styling the modal to test */}
    {/* The modal appears when clicking 'mobile-signin-button: */}

        {modalIsToggled && 
            <Modal>
                <Login />
            </Modal>
            
        }

        {signUpModalIsToggled &&
            /* TODO: Need to make a Sign Up modal */
            <h1>Sign Up</h1>
        }

        </section>
    );
    };

    export default LandingLogin;